import React, { ReactNode } from 'react';

export interface Props {
  children?: ReactNode;
}

const Footer: React.FC<Props> = ({ children }: Props): JSX.Element => {
  return <footer>{children}</footer>;
};

export default Footer;
