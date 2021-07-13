import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import Checkbox from 'components/common/Form/Checkbox';

import { LayoutSettings } from 'interfaces';
import ProfileActions from 'redux/profile/actions';
import { selectSetLayoutStatus } from 'redux/request-status/selectors';
import { selectLayoutSettings } from 'redux/settings/selectors';

import { VISIBLE_CARDS as visibilityOptions } from './constant';
import './style.scss';

function CardsVisibilityForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { dirty } = formState;

  const profileLayout = useSelector(selectLayoutSettings);
  const setStatus = useSelector(selectSetLayoutStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profileLayout?.visibility) {
      reset(profileLayout?.visibility);
    } else {
      reset();
    }
  }, [profileLayout, reset]);

  const onSubmit = (data: Record<string, any>) => {
    const layoutSettings: LayoutSettings = {
      settings: profileLayout?.settings,
      visibility: data,
    };
    dispatch(ProfileActions.setCurrentProfileLayout(layoutSettings));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="profile__cards--visibility">
        {visibilityOptions.map((card) => (
          <Checkbox
            key={card.key}
            name={card.name}
            label={card.label}
            inputRef={register}
          />
        ))}
      </div>
      <div>
        <Button
          disabled={!dirty}
          scheme={ButtonSchemeEnum.PRIMARY}
          submitting={setStatus?.isFetching}
        >
          Save
        </Button>
      </div>
    </form>
  );
}

export default React.memo(CardsVisibilityForm);
