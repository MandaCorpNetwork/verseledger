import { useSoundEffect } from '@Audio/AudioManager';
import FeatureContainer from '@Common/Components/Core/Boxes/FeatureContainer';
import { LoadingWheel } from '@CommonLegacy/LoadingObject/LoadingWheel';
import { DoubleArrow } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectOrg } from '@Redux/Slices/Orgs/orgs.selectors';
import React from 'react';
import { useNavigate, useParams } from 'react-router';

import { OrgDetails } from './Details';
import { OrgEventsBox } from './Events/EventsBox';
import { MemberListBox } from './MemberListBox';
import { OrgNamePlate } from './NamePlate';

export const OrgPage: React.FC = () => {
  const { selectedOrgId } = useParams();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const sound = useSoundEffect();

  const org = useAppSelector((state) =>
    selectedOrgId ? selectOrg(state, selectedOrgId) : undefined,
  );

  React.useEffect(() => {
    if (!selectedOrgId) {
      setError(true);
      setLoading(false);
      return;
    }
    if (!org) {
      setLoading(true);
    } else {
      setLoading(false);
      setError(false);
    }
  }, [setLoading, selectedOrgId, org, setError]);

  const handleReturn = React.useCallback(() => {
    sound.playSound('close');
    navigate(-1);
  }, [sound, navigate]);

  return (
    <FeatureContainer data-testid="OrgPage__Container">
      <div data-testid="OrgPage__ReturnButton_Wrapper" style={{ marginBottom: '0.5em' }}>
        <Button
          variant="contained"
          size="small"
          onClick={handleReturn}
          color="warning"
          startIcon={<DoubleArrow sx={{ transform: 'rotate(180deg)' }} />}
        >
          Return
        </Button>
      </div>
      {loading && (
        <div style={{ width: '600px' }}>
          <LoadingWheel />
        </div>
      )}
      {error && <Typography>An Error has Occurred</Typography>}
      {!loading && !error && org && (
        <>
          <Box
            data-testid="OrgPage__Top_Wrapper"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: '1em',
              alignItems: 'space-between',
            }}
          >
            <OrgNamePlate organization={org} />
            <OrgDetails />
          </Box>
          <Box
            data-testid="OrgPage__Bottom_Wrapper"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: '1em',
              alignItems: 'space-between',
              flexGrow: 1,
              my: '2em',
            }}
          >
            <MemberListBox />
            <OrgEventsBox />
          </Box>
        </>
      )}
    </FeatureContainer>
  );
};
