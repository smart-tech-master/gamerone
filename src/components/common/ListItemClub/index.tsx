import React, { ReactNode } from 'react';
import ListItem from '../ListItem';
import { Club } from 'interfaces';

interface ListItemClubProps {
  club: Club;
  onClick?: (e?: any) => void;
  appendRight?: ReactNode;
}

const ListItemClub: React.FC<ListItemClubProps> = ({
  club,
  onClick,
  appendRight,
}: ListItemClubProps): JSX.Element => {
  return (
    <ListItem
      title={club.name}
      image={''} // todo: club image
      onClick={onClick}
      appendRight={appendRight}
    />
  );
};

export default ListItemClub;
