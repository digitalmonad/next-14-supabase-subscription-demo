import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const DashboardLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default DashboardLayout;
