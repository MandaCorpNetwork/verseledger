import { Box, Button, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import type { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

// type DropZoneProps = {
//   stateSetter: React.Dispatch<React.SetStateAction>;
// }

export const DropZone: React.FC = () => {
  const [_destinations, setDestinations] = React.useState<IDestination[]>([]);
  const [dragging, setDragging] = React.useState<boolean>(false);

  const handleDrop = React.useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target?.result as string);
            setDestinations(json);
            enqueueSnackbar('Route Imported Successfully', { variant: 'success' });
          } catch (_error) {
            enqueueSnackbar('Invalid Route File', { variant: 'error' });
          }
        };
        reader.readAsText(file);
      } else {
        enqueueSnackbar('Please Upload a valid JSON File.', { variant: 'warning' });
      }
    }
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  return (
    <Box
      onDrop={() => handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      sx={{
        border: `2px dashed ${dragging ? '#1976d2' : '#cfd8dc'}`,
        borderRadius: '8px',
        padding: '40px',
        textAlign: 'center',
        transition: 'border-color 0.3s ease',
        marginBottom: '20px',
        backgroundColor: dragging ? '#e3f2fd' : '#ffffff',
      }}
    >
      <Typography variant="h6">
        Drag &apos;n&apos; drop a JSON file here, or click to select one
      </Typography>
      <input
        type="file"
        accept=".json"
        style={{ display: 'none' }} // Hide the input
        id="file-input"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              try {
                const json = JSON.parse(e.target?.result as string);
                setDestinations(json);
                alert('File imported successfully!');
              } catch (error) {
                console.error('Invalid JSON file', error);
                alert('Invalid JSON file. Please try again.');
              }
            };
            reader.readAsText(file);
          }
        }}
      />
      <label htmlFor="file-input">
        <Button variant="contained" color="primary" component="span">
          Select File
        </Button>
      </label>
    </Box>
  );
};
