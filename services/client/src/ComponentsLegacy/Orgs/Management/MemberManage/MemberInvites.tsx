import { useSoundEffect } from '@Audio/AudioManager';
import { DigiBox } from '@CommonLegacy/Components/Boxes/DigiBox';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { UserChip } from '@CommonLegacy/Components/Chips/UserChip';
import { DoubleArrow } from '@mui/icons-material';
import { Button, Collapse, IconButton, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/auth.selectors';
import React from 'react';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

export const MemberInvites: React.FC = () => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const sound = useSoundEffect();
  const currentUser = useAppSelector(selectCurrentUser);
  const handleExpand = React.useCallback(() => {
    setExpanded((prev) => {
      if (prev) {
        sound.playSound('close');
      } else {
        sound.playSound('open');
      }
      return !prev;
    });
  }, [sound, setExpanded]);
  return (
    <FeatureDisplay
      data-testid="OrgManager-PanelDisplay-MemberManagement-Pending__Invites_Wrapper"
      sx={{ p: '0.5em 1em' }}
    >
      <div
        data-testid="OrgManager-PanelDisplay-MemberManagement-Pending-Invites__Title_Wrapper"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          data-testid="OrgManager-PanelDisplay-MemberManagement-Pending-Invites__Title"
          variant="h6"
          sx={{
            color: 'text.disabled',
          }}
        >
          Invites
        </Typography>
        <IconButton
          data-testid="OrgManager-PanelDisplay-MemberManagement-Pending-Invites__Expand_Button"
          onClick={handleExpand}
        >
          <DoubleArrow
            fontSize="medium"
            sx={{
              transform: `rotate(${expanded ? '-90' : '90'}deg) scale(0.9)`,
              opacity: '0.4',
              filter:
                'drop-shadow(0 0 0 rgba(14,255,255,0.4)) drop-shadow(0 0 5px rgba(14,255,255,0.6)) drop-shadow(0 0 10px rgba(14,255,255,0.5))',
              transition: 'opacity 0.3s ease-in-out, transform 0.2s ease-in-out',
              '&:hover': {
                transform: `rotate(${expanded ? '-90' : '90'}deg) scale(1)`,
                opacity: '1',
              },
            }}
          />
        </IconButton>
      </div>
      <Collapse in={expanded}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
          <Button color="success" variant="outlined" size="small" disabled>
            Invite User
          </Button>
          <DigiBox sx={{ p: '0.5em' }}>
            <div style={{ display: 'flex', gap: '0.5em' }}>
              <UserChip user={currentUser as IUser} size="medium" />
              <Button color="warning" size="small" disabled>
                Cancel Invite
              </Button>
            </div>
          </DigiBox>
        </div>
      </Collapse>
    </FeatureDisplay>
  );
};
