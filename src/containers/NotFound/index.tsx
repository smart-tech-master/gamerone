import React from 'react';

export interface Props {
  username: string;
}

const NotFound: React.FC<Props> = ({ username }: Props): JSX.Element => {
  return (
    <>
      <h1>{username} is not found</h1>
    </>
  );
};

export default NotFound;
