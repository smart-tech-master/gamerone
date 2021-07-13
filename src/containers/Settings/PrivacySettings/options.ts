import { NameVisibilityEnum, PostVisibilityEnum } from 'interfaces';
import { SelectOption } from 'components/common/Form/Input';

const capFLetter = (value: string) => {
  return value[0].toUpperCase() + value.slice(1);
};

export const NAME_VISIBILITY_OPTIONS: SelectOption[] = [
  {
    value: NameVisibilityEnum.Private,
    label: capFLetter(NameVisibilityEnum.Private),
    description: 'No one can see',
  },
  {
    value: NameVisibilityEnum.Public,
    label: capFLetter(NameVisibilityEnum.Public),
    description: 'Everyone can see',
  },
  {
    value: NameVisibilityEnum.Followers,
    label: capFLetter(NameVisibilityEnum.Followers),
    description: 'Only followers can see',
  },
  {
    value: NameVisibilityEnum.Friends,
    label: capFLetter(NameVisibilityEnum.Friends),
    description: 'Only mutual follows can see',
  },
  {
    value: NameVisibilityEnum.Squad,
    label: capFLetter(NameVisibilityEnum.Squad),
    description: 'Only certain people I added to squad can see',
  },
];

export const POST_VISIBILITY_OPTIONS: SelectOption[] = [
  {
    value: PostVisibilityEnum.Private,
    label: capFLetter(PostVisibilityEnum.Private),
    description: 'No one can see',
  },
  {
    value: PostVisibilityEnum.Public,
    label: capFLetter(PostVisibilityEnum.Public),
    description: 'Everyone can see',
  },
  {
    value: PostVisibilityEnum.Followers,
    label: capFLetter(PostVisibilityEnum.Followers),
    description: 'Only followers can see',
  },
  {
    value: PostVisibilityEnum.Friends,
    label: capFLetter(PostVisibilityEnum.Friends),
    description: 'Only mutual follows can see',
  },
  {
    value: PostVisibilityEnum.Squad,
    label: capFLetter(PostVisibilityEnum.Squad),
    description: 'Only certain people I added to squad can see',
  },
];
