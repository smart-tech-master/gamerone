import React, { useEffect, useState, useCallback } from 'react';

// components
import Button from '../../../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { ExperienceType, UserExperience } from '../../../interfaces';
import { selectSettingsExperience } from '../../../redux/settings/selectors';
import SettingsActions from 'redux/settings/actions';
import RequestStatusActions from '../../../redux/request-status/actions';
import { GET_EXPERIENCES_REQUEST } from '../../../redux/settings/types';
import Card from '../../../components/common/Card';
import * as ReferenceDataApi from 'api/referenceData';
import { Notify } from 'components/utility/Notify';
import { DropdownOptionType } from 'components/common/Dropdown';
import ListItem from 'components/common/ListItem';
import { GAME_PLACEHOLDER } from 'utils/constants';
import ExperienceForm from './ExperienceForm';
import { selectStatus } from 'redux/request-status/selectors';
import { LOAD_PAGE_REQUEST } from 'redux/profile/types';
import PageLoading from 'components/common/PageLoading';

export default function ExperienceSettings() {
  const experienceList = useSelector(selectSettingsExperience);
  const experiencesStatus = useSelector(selectStatus).get(
    LOAD_PAGE_REQUEST + '/experiences',
  );

  const dispatch = useDispatch();

  const [
    currentExperience,
    setCurrentExperience,
  ] = useState<UserExperience | null>(null);

  const [ExperienceTypeOptions, setExperienceTypeOptions] = useState<
    DropdownOptionType[]
  >([]);

  const [formVisibility, setFormVisibility] = useState(false);

  const handleCancelForm = useCallback(() => {
    setFormVisibility(false);
    setCurrentExperience(null);
  }, []);

  useEffect(() => {
    const fetchExperienceTypes = async () => {
      try {
        const experienceTypes = ((await ReferenceDataApi.experienceTypes()) as unknown) as ExperienceType[];

        setExperienceTypeOptions(
          experienceTypes.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        );
      } catch (err) {
        Notify.warning('Experience type is missing');
      }
    };
    fetchExperienceTypes();
  }, []);

  useEffect(() => {
    dispatch(SettingsActions.getExperiences());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      dispatch(RequestStatusActions.cleanStatus(GET_EXPERIENCES_REQUEST));
    };
  }, [dispatch]);

  const onExperienceEdit = (experience: UserExperience | null) => {
    setCurrentExperience(experience);
    setFormVisibility(true);
  };

  return (
    <>
      <Card>
        <div className="card__content">
          <h4>Experiences</h4>

          <div className="py-20">
            <Button type="button" onClick={() => onExperienceEdit(null)}>
              Add
            </Button>
          </div>

          <div>
            {experiencesStatus?.isFetching && <PageLoading show={true} />}
            {experienceList.map((experience) => (
              <ListItem
                key={experience.id}
                title={experience.title}
                image={
                  currentExperience?.game?.cover
                    ? currentExperience?.game?.cover
                    : GAME_PLACEHOLDER
                }
                onClick={() => onExperienceEdit(experience)}
              />
            ))}
          </div>

          <ExperienceForm
            experience={currentExperience as UserExperience}
            show={formVisibility}
            onCancel={handleCancelForm}
            experienceTypeOptions={ExperienceTypeOptions}
          />
        </div>
      </Card>
    </>
  );
}
