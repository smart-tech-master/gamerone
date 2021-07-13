import React, { ReactNode } from 'react';
import './style.scss';

export interface BadgeProps {
  children?: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  ...props
}: BadgeProps): JSX.Element => {
  return (
    <div className="badge badge--avatar" {...props}>
      {children}
    </div>
  );
};

export default Badge;
