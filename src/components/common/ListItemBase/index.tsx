import React, { ReactNode } from 'react';
import './style.scss';

interface ListItemBaseProps {
  onClick?: (e?: any) => void;
  appendRight?: ReactNode;
  children?: ReactNode;
}

const ListItemBase: React.FC<ListItemBaseProps> = ({
  onClick,
  appendRight,
  children,
}: ListItemBaseProps): JSX.Element => {
  return (
    <div
      className={
        'list-item list-item--clickable' +
        (appendRight ? ' has-append-right' : '')
      }
      onClick={onClick}
    >
      {appendRight && (
        <div className="list-item__append-right">{appendRight}</div>
      )}
      {children}
    </div>
  );
};

export default ListItemBase;
