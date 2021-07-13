import React, { ReactNode } from 'react';
import ListItemBase from '../ListItemBase';
import Badge from '../Badge';
import Image from '../Image';

interface ListItemProps {
  title: string;
  description?: string;
  image: string;
  onClick?: (e?: any) => void;
  appendRight?: ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  description,
  image,
  onClick,
  appendRight,
}: ListItemProps): JSX.Element => {
  return (
    <ListItemBase onClick={onClick} appendRight={appendRight}>
      <Badge>
        <Image
          src={'/' + image}
          alt={title}
          title={title}
          width={64}
          height={64}
        />
      </Badge>
      <div className="list-item__content">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
    </ListItemBase>
  );
};

export default ListItem;
