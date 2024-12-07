import '@scalar/api-reference-react/style.css';

import { LoadingWheel } from '@CommonLegacy/LoadingObject/LoadingWheel';
import { Box } from '@mui/material';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import NetworkService from '@Services/NetworkService';
import { URLUtil } from '@Utils/URLUtil';
import React, { useEffect, useState } from 'react';

export const APIDocs: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [docs, setDocs] = useState<Record<string, any>>();
  useEffect(() => {
    NetworkService.GET(`${URLUtil.backendHost}/api-docs/swagger.json`).then(
      (response) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setDocs(response.data as Record<string, any>);
      },
    );
  }, []);
  return (
    <Box sx={{ bgcolor: '#FFF' }}>
      {docs ? (
        <ApiReferenceReact
          configuration={{
            spec: { content: docs },
            theme: 'purple',
            hideDarkModeToggle: true,
            hideTestRequestButton: true,
          }}
        />
      ) : (
        <LoadingWheel />
      )}
    </Box>
  );
};
