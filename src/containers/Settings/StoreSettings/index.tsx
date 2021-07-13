import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from 'components/common/Avatar';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import Input from 'components/common/Form/Input';
import ListItemProfile from 'components/common/ListItem';

import { ProductRequest, Product } from 'interfaces';
import SettingsActions from 'redux/settings/actions';
import {
  selectDeleteStoreStatus,
  selectCreateStoreStatus,
  selectUpdateStoreStatus,
} from 'redux/request-status/selectors';
import { selectSettingsProducts } from 'redux/settings/selectors';

import './style.scss';

function StoreForm() {
  const productList = useSelector(selectSettingsProducts);

  const createStatus = useSelector(selectCreateStoreStatus);
  const updateStatus = useSelector(selectUpdateStoreStatus);
  const deleteStatus = useSelector(selectDeleteStoreStatus);

  const [isAdded, setIsAdded] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(
    undefined,
  );
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState,
    setValue,
    errors,
    reset,
  } = useForm();
  const { dirty } = formState;

  useEffect(() => {
    register({ name: 'productImage' }, { required: true });
  }, [register]);

  useEffect(() => {
    if (currentProduct) {
      setUploadedAvatar(currentProduct.image);
      const formData = {
        productName: currentProduct?.name,
        productUrl: currentProduct?.link,
        productImage: currentProduct?.image,
      };
      reset(formData);
    } else {
      const formData = {
        productName: '',
        productUrl: '',
        productImage: '',
      };
      reset(formData);
    }
  }, [currentProduct, reset]);

  // dropzone for store image upload
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      setValue('productImage', acceptedFiles);
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      setUploadedAvatar(files[0].preview);
    },
  });

  // on cancel: close the edit form
  const onCancelStore = () => {
    setIsAdded(false);
    setUploadedAvatar(null);
    setCurrentProduct(undefined);
  };

  // on form submit
  const onSubmit = async (
    data: Record<string, any>,
    id: number | undefined,
  ) => {
    if (!uploadedAvatar) return;

    const blob = await fetch(uploadedAvatar).then((r: any) => r.blob());

    if (id) {
      // update a product
      dispatch(
        SettingsActions.updateProduct(
          {
            name: data.productName,
            link: data.productUrl,
            image: blob,
          } as ProductRequest,
          id,
        ),
      );
    } else {
      // create a product
      dispatch(
        SettingsActions.createProduct({
          name: data.productName,
          link: data.productUrl,
          image: blob,
        } as ProductRequest),
      );
    }
  };

  // after successful form submit or delete a product, hide the form
  useEffect(() => {
    if (
      (!createStatus?.isFetching && !createStatus?.isError) ||
      (!updateStatus?.isFetching && !updateStatus?.isError) ||
      (!deleteStatus?.isFetching && !deleteStatus?.isError)
    ) {
      onCancelStore();
    }
  }, [createStatus, updateStatus, deleteStatus]);

  // on delete: remove selected product
  const onDeleteStore = () => {
    if (!currentProduct) return;
    dispatch(SettingsActions.deleteProduct(currentProduct.id));
  };

  return (
    <div className="split-screen">
      <div className="list">
        {productList.length === 0 ? (
          <div role="alert">You have no products.</div>
        ) : productList ? (
          productList.map((product: Product) => (
            <ListItemProfile
              key={product.id}
              title={product.name}
              image={product.image}
              onClick={() => setCurrentProduct(product)}
            />
          ))
        ) : null}
        <Button
          onClick={() => setIsAdded(true)}
          scheme={ButtonSchemeEnum.PRIMARY}
          disabled={productList.length >= 5}
        >
          Add
        </Button>
      </div>

      {isAdded || currentProduct ? (
        <form
          onSubmit={handleSubmit((e) => onSubmit(e, currentProduct?.id))}
          style={{ display: 'flex', flexDirection: 'column', flex: '1' }}
        >
          <div className="split-screen__content">
            <div>
              <div
                {...getRootProps({
                  className: 'pointer',
                })}
              >
                <input
                  name="productImage"
                  {...getInputProps()}
                  aria-label="file-upload"
                />
                <Avatar
                  src={uploadedAvatar}
                  alt={currentProduct?.name || 'store name'}
                  size={'xl'}
                  className="avatar-upload"
                />
              </div>

              {errors['productImage'] && (
                <div aria-label="error-message">Store image is required</div>
              )}
            </div>
            <Input
              name="productName"
              label="Headline"
              inputRef={register({ required: true, minLength: 3 })}
              error={errors['productName']}
            />
            <Input
              name="productUrl"
              label="Product Link"
              inputRef={register({ required: true, minLength: 3 })}
              error={errors['productUrl']}
            />
          </div>
          <div className="split-screen__actions">
            <Button
              type="button"
              disabled={isAdded}
              onClick={onDeleteStore}
              submitting={deleteStatus?.isFetching}
            >
              Delete
            </Button>
            <Button type="button" onClick={onCancelStore}>
              Cancel
            </Button>
            <Button
              scheme={ButtonSchemeEnum.PRIMARY}
              disabled={!dirty}
              submitting={createStatus?.isFetching || updateStatus?.isFetching}
            >
              {currentProduct ? 'Save' : 'Save'}
            </Button>
            {deleteStatus?.isError && (
              <div aria-label="error-message">
                onDelete: Something went wrong. Please try again
              </div>
            )}
            {createStatus?.isError && (
              <div aria-label="error-message">
                onSave: Something went wrong. Please try again
              </div>
            )}
          </div>
        </form>
      ) : null}
    </div>
  );
}

export default function StoreSettings() {
  return <StoreForm />;
}
