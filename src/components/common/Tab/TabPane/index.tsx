import React from 'react';

interface TabPaneProps {
  key: string | number;
  title: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function TabPane({ children }: TabPaneProps) {
  return <div>{children}</div>;
}
