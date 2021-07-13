import React from 'react';
import './style.scss';

export interface PageProps {
  children?: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <section>
      <div className="page-wrapper">{children}</div>
    </section>
  );
}
