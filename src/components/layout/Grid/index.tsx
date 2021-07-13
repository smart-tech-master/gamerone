import React, { ReactNode } from 'react';
import cn from 'classnames';
import './style.scss';

export interface GridProps {
  startPos?: number;
  onProfile?: boolean;
  children: ReactNode;
}

const Grid: React.FC<GridProps> = ({
  startPos = 0,
  onProfile = false,
  children,
}: GridProps): JSX.Element => {
  const classes = cn('grid', {
    [`grid__profile`]: onProfile,
  });

  const spacerCard = <div className={`grid__spacer-${startPos}`}></div>;

  return (
    <div className={classes}>
      {startPos > 0 && spacerCard}
      {children}
    </div>
  );
};

export default Grid;
