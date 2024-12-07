import { DigiBox } from '@CommonLegacy/Components/Boxes/DigiBox';
import DigiDisplay from '@CommonLegacy/Components/Boxes/DigiDisplay';
import { GlassDisplay } from '@CommonLegacy/Components/Boxes/GlassDisplay';
import { Typography } from '@mui/material';
import React from 'react';

export const OrgDetails: React.FC = () => {
  return (
    <GlassDisplay
      data-testid="OrgPage__Details_Wrapper"
      sx={{
        maxWidth: '600px',
        p: '0.5em',
        justifyContent: 'space-around',
        gap: '0.5em',
      }}
    >
      <DigiBox data-testid="OrgPage-Details__Description_Wrapper" sx={{ p: '0 0.2em' }}>
        <Typography
          data-testid="OrgPage-Details__Description"
          variant="body2"
          sx={{ maxWidth: '90%', alignSelf: 'center' }}
        >
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula
          eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Donec qu
        </Typography>
      </DigiBox>
      <DigiBox
        data-testid="OrgPage-Details__Info_Wrapper"
        sx={{ flexDirection: 'row', py: '0.5em', justifyContent: 'space-around' }}
      >
        <DigiDisplay
          data-testid="OrgPage-Details-Info__Archetype_Wrapper"
          sx={{ px: '0.5em', justifyContent: 'flex-start' }}
        >
          <Typography
            data-testid="OrgPage-Details-Info__Archetype_Header"
            variant="subtitle2"
            sx={{ cursor: 'default' }}
          >
            Archetype
          </Typography>
        </DigiDisplay>
        <DigiDisplay
          data-testid="OrgPage-Details-Info__Activities_Wrapper"
          sx={{ px: '0.5em', justifyContent: 'flex-start' }}
        >
          <Typography
            data-testid="OrgPage-Details-Info__Activities_Header"
            variant="subtitle2"
            sx={{ cursor: 'default' }}
          >
            Activities
          </Typography>
        </DigiDisplay>
        <DigiDisplay
          data-testid="OrgPage-Details-Info__Options_Wrapper"
          sx={{ px: '0.5em' }}
        >
          <Typography
            data-testid="OrgPage-Details-Info__Options"
            variant="caption"
            sx={{ cursor: 'default' }}
          >
            Commitment:
          </Typography>
          <Typography
            data-testid="OrgPage-Details-Info__Options"
            variant="caption"
            sx={{ cursor: 'default' }}
          >
            Language:
          </Typography>
          <Typography
            data-testid="OrgPage-Details-Info__Options"
            variant="caption"
            sx={{ cursor: 'default' }}
          >
            Recruiting:
          </Typography>
        </DigiDisplay>
      </DigiBox>
    </GlassDisplay>
  );
};
