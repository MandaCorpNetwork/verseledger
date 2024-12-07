import { useSoundEffect } from '@Audio/AudioManager';
import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { IOrganizationRank } from 'vl-shared/src/schemas/orgs/OrganizationSchema';

type RanksAndRolesProps = {
  ranks: IOrganizationRank[] | null;
};

export const RankAndRoles: React.FC<RanksAndRolesProps> = ({ ranks }) => {
  const [selectedRank, setSelectedRank] = React.useState<IOrganizationRank | null>(
    ranks && ranks.length > 0 ? ranks[0] : null,
  );
  const sound = useSoundEffect();
  const handleSelectRank = React.useCallback(
    (_e: React.ChangeEvent, value: string) => {
      if (selectedRank?.id === value) return sound.playSound('denied');
      const newSelection = ranks?.find((rank) => rank.id === value);
      if (newSelection) {
        setSelectedRank(newSelection);
      } else {
        sound.playSound('error');
        enqueueSnackbar('Rank not Found', { variant: 'error' });
      }
    },
    [ranks, selectedRank?.id, sound],
  );
  return (
    <div
      data-testid="OrgManager-PanelDisplay__Rank&Roles_Container"
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        gap: '2em',
      }}
    >
      <FeatureDisplay sx={{ flexGrow: 1, p: '0.5em' }}>
      <FeatureDisplay sx={{ flexGrow: 1, p: '0.5em' }}>
        <Typography variant="h4" align="center">
          Ranks
        </Typography>
        <div>
          <div>
            <Typography variant="h6">Add Rank</Typography>
            <ComponentContainer></ComponentContainer>
          </div>
          <div>
            <Typography variant="h6">Edit Ranks</Typography>
            <FormControl>
              <FormLabel color="secondary">Selected Rank</FormLabel>
              {ranks ? (
                <RadioGroup row value={selectedRank?.id} onChange={handleSelectRank}>
                  {ranks.map((rank) => (
                    <FormControlLabel
                      key={rank.id}
                      value={rank.id}
                      control={<Radio color="secondary" />}
                      label={rank.rank_name}
                    />
                  ))}
                </RadioGroup>
              ) : (
                'None'
              )}
            </FormControl>
            <ComponentContainer></ComponentContainer>
          </div>
        </div>
      </FeatureDisplay>
      <FeatureDisplay sx={{ flexGrow: 1, p: '0.5em' }}>
      </FeatureDisplay>
      <FeatureDisplay sx={{ flexGrow: 1, p: '0.5em' }}>
        <Typography variant="h4" align="center">
          Roles
        </Typography>
      </FeatureDisplay>
      </FeatureDisplay>
    </div>
  );
};
