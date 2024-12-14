import { Collapse, type CollapseProps } from '@mui/material';
import React, { type PropsWithChildren } from 'react';

/** Collapse Component used to Wrap Children Components on Higher Animation Settings */
type CollapseWrapperProps = PropsWithChildren<CollapseProps>;
const CollapseWrapperComponent: React.FC<CollapseWrapperProps> = ({
  children,
  ...props
}) => {
  return <Collapse {...props}>{children}</Collapse>;
};

export const CollapseWrapper = React.memo(CollapseWrapperComponent);
