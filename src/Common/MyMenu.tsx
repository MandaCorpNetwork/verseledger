import {
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React from 'react';
import { MyButton } from './MyButton';

type myMenuProps = {
  header: string;
  body: string;
  onSubmit?: () => unknown;
  buttonText: string;
};

export const MyMenu: React.FC<myMenuProps> = (props) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: '200px' }}>
      <CardContent>
        <Typography color={'primary.400'} gutterBottom variant="h5">
          {props.header}
        </Typography>
        <Typography variant="body2" color={'secondary'}>{props.body}</Typography>
      </CardContent>
      <CardActions>
        <MyButton text={props.buttonText} onClick={props.onSubmit} />
      </CardActions>
    </Card>
  );
};
