import React, { forwardRef } from 'react';
import { ButtonBase } from '@mui/material';

export default function RippleTouch(OriginalComponent) {
  return (props) => {
    const Wrapper =!props.component ? ButtonBase : forwardRef((ButtonBaseProps, ref) => <ButtonBase component={props.component} {...ButtonBaseProps} ref={ref} />);
    return <OriginalComponent {...props} component={Wrapper} />;
  }
};