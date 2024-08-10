import { Box, Button, Popover, TextField, Typography } from '@mui/material';
import React from 'react';

type NeedsPopoverProps = {
  type: string;
  onAdd: (title: string, description: string) => void;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
};

export const NeedsPopover: React.FC<NeedsPopoverProps> = ({
  type,
  onAdd,
  anchorEl,
  open,
  onClose,
}) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleAddClick = () => {
    onAdd(title, description);
    onClose();
  };
  return (
    <Popover open={open} anchorEl={anchorEl} onClose={onClose}>
      <Box>
        <Typography>{`Add ${type} Need`}</Typography>
        <TextField
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: '1em' }}
        />
        <TextField
          size="small"
          value={description}
          multiline
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: '1em' }}
        />
        <Button variant="contained" onClick={handleAddClick}>
          Add
        </Button>
      </Box>
    </Popover>
  );
};
