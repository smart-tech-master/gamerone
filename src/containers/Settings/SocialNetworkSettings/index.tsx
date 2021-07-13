import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import Input from 'components/common/Form/Input';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import Image from 'components/common/Image';

import { SocialNetwork, SocialNetworkUser } from 'interfaces';
import SettingsActions from 'redux/settings/actions';
import { selectSettingsSocialNetworks } from 'redux/settings/selectors';
import { selectUpdateSocialStatus } from 'redux/request-status/selectors';

import { AVATAR_PLACEHOLDER } from 'utils/constants';

interface SocialNetworkFormProps {
  networks: SocialNetwork[];
}
const SocialNetworkForm: React.FC<SocialNetworkFormProps> = ({
  networks,
}: SocialNetworkFormProps): JSX.Element => {
  const updateSocialStatus = useSelector(selectUpdateSocialStatus);

  const dispatch = useDispatch();

  const { register, handleSubmit, errors, reset, formState } = useForm();
  const { dirty } = formState;

  useEffect(() => {
    dispatch(SettingsActions.getSocial());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (networks.length) {
      const formData = {};
      networks.map((network) => {
        formData[network.id] = network.value;
        return formData;
      });
      reset(formData);
    }
  }, [networks, reset]);

  const inputs = networks.map((network: SocialNetwork) => (
    <Input
      key={network.id}
      name={network.id.toString()}
      id={network.id.toString()}
      placeholder={network.name}
      inputRef={register({ minLength: 3, maxLength: 100 })}
      error={errors[network.id.toString()]}
      maxLength={100}
      appendLeft={
        <span
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '2rem',
            height: '2.5rem',
            fontSize: '1.25rem',
            opacity: 0.5,
          }}
        >
          <Image
            src={network.image ? '/' + network.image : AVATAR_PLACEHOLDER}
            alt={network.name || 'Social Network'}
            width={28}
            height={28}
          />
        </span>
      }
    />
  ));

  const onSubmit = async (data: Record<string, any>) => {
    const temp = Object.keys(data).map((item: string) => {
      if (!data[item]) {
        dispatch(SettingsActions.deleteSocial(Number(item)));
      }
      const Social = { socialNetworkId: Number(item), url: data[item] };
      return Social as SocialNetworkUser;
    });
    const filtered = temp.filter((item) => {
      return item.url;
    });
    dispatch(SettingsActions.updateSocial(filtered));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card__content">
        <div className="social--wrapper">{inputs}</div>
      </div>
      <div className="card__actions">
        <Button
          scheme={ButtonSchemeEnum.PRIMARY}
          submitting={updateSocialStatus?.isFetching}
          disabled={!dirty || updateSocialStatus?.isFetching}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default function SocialNetworkSettings() {
  const socialsList = useSelector(selectSettingsSocialNetworks);
  return <SocialNetworkForm networks={socialsList} />;
}
