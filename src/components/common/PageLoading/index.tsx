import React from 'react';
import './style.scss';

export interface PageLoadingProps {
  id?: string;
  show?: boolean;
}

const PageLoading: React.FC<PageLoadingProps> = ({
  id,
  show = false,
}: PageLoadingProps): JSX.Element => {
  return show ? (
    <div id={id} className="pageloading" aria-label="page-loading">
      <div className="cube1"></div>
      <div className="cube2"></div>
    </div>
  ) : (
    <></>
  );
};

export default PageLoading;
