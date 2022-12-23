import { Button } from '@mui/material';
import React from 'react';

type myButtonProps = {
  text: string;
  onClick?: () => unknown;
};

export const MyButton: React.FC<myButtonProps> = (props) => {
  return <Button onClick={props.onClick}>{props.text} </Button>;
};
