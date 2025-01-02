import { Button, Typography, useTheme } from '@mui/material';
import { UPDATE_POPUP } from '@Popups/Update/Update';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import type React from 'react';
import { useCallback } from 'react';

/**
 * A Component to Test UI Elements in DevMode on the [SandboxPage](http://localhost:3000/sandbox)
 *
 * The File is in the GitIgnore so all changes are purely local
 */
export const SandboxContent: React.FC<unknown> = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const handleClick = useCallback(() => {
    dispatch(openPopup(UPDATE_POPUP));
  }, [dispatch]);
  return (
    <>
      <Typography align="center">
        Use{' '}
        <span
          style={{
            fontStyle: 'italic',
            fontSize: '0.8em',
            fontWeight: 'bold',
            color: theme.palette.text.secondary,
          }}
        >
          /src/Common/Components/Wrappers/SandboxContent.tsx
        </span>{' '}
        for testing & developing new UI and Styles
      </Typography>
      <div>
        <Button color="secondary" variant="contained" onClick={handleClick}>
          Open Popup
        </Button>
      </div>
    </>
  );
};
