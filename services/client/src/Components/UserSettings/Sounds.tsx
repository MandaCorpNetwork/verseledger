import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { soundEffectPacks } from '@Common/Definitions/SoundEffectOptions';
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import { updateUserSettings } from '@Redux/Slices/Auth/Actions/updateUserSettings';
import { Logger } from '@Utils/Logger';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { IUpdateUserSettingsCMD } from 'vl-shared/src/schemas/UserSettings';

import { useSoundEffect } from '@/AudioManager';

export const SoundSettings: React.FC = () => {
  const { playSound, switchSoundPack, currentSoundPack } = useSoundEffect();
  const dispatch = useAppDispatch();

  const getCurrentPackname = (currentSoundPack: SoundPack) => {
    const currentSoundPackStr = JSON.stringify(currentSoundPack);
    const packName = Object.keys(soundEffectPacks).find((key) => {
      const packStr = JSON.stringify(
        soundEffectPacks[key as keyof typeof soundEffectPacks].pack,
      );
      return currentSoundPackStr === packStr;
    });

    return packName
      ? soundEffectPacks[packName as keyof typeof soundEffectPacks].name
      : 'Custom';
  };

  const currentSoundPackName = getCurrentPackname(currentSoundPack);

  const handleSoundPackChange = (event: SelectChangeEvent<string>) => {
    const packName = event.target.value;
    Logger.info('Selected pack name:', packName);
    const packKey = Object.keys(soundEffectPacks).find(
      (key) => soundEffectPacks[key as keyof typeof soundEffectPacks].name === packName,
    );

    Logger.info('Selected pack key:', packKey);

    if (packKey) {
      const updatePayload: IUpdateUserSettingsCMD = {
        soundPack: packKey,
      };
      dispatch(updateUserSettings(updatePayload));
      switchSoundPack(packKey as keyof typeof soundEffectPacks);
      playSound('success');
      enqueueSnackbar('Sound pack changed.', { variant: 'success' });
    } else {
      playSound('error');
      enqueueSnackbar('Invalid sound pack selected.', { variant: 'error' });
    }
  };
  return (
    <GlassBox
      data-testid="SoundSettings__Container"
      sx={{ minHeight: '100%', minWidth: '100%', p: '2em' }}
    >
      <Typography
        data-testid="SoundSettings__Title"
        variant="h5"
        sx={{ fontWeight: 'bold', textShadow: '0 0 7px rgba(24,252,252,.8)' }}
      >
        Sound Settings
      </Typography>
      <Box
        data-testid="SoundSettings__Settings_Wrapper"
        sx={{ display: 'flex', m: '5%' }}
      >
        <DigiBox
          data-testid="SoundSettings-Settings__SoundEffects_Container"
          sx={{ p: '.5em', minWidth: '250px' }}
        >
          <Typography
            data-testid="SoundSettings-Settings-SoundEffects__Title"
            variant="overline"
            sx={{ color: 'text.secondary' }}
          >
            Sound Effects
          </Typography>
          <Divider />
          <Box
            data-testid="SoundSettings-Settings-SoundEffects__List_Wrapper"
            sx={{
              p: '.5em',
              my: '.5em',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <FormControl>
              <InputLabel color="secondary">Sound Pack</InputLabel>
              <Select
                size="small"
                color="secondary"
                label="Sound Pack"
                autoWidth
                value={currentSoundPackName}
                onChange={handleSoundPackChange}
              >
                {Object.keys(soundEffectPacks).map((key) => (
                  <MenuItem
                    key={key}
                    value={soundEffectPacks[key as keyof typeof soundEffectPacks].name}
                  >
                    {soundEffectPacks[key as keyof typeof soundEffectPacks].name}
                  </MenuItem>
                ))}
                <MenuItem value={'Custom'} disabled>
                  Custom
                </MenuItem>
              </Select>
            </FormControl>
            {/* Custom Sounds
            <DigiDisplay>
              <FormControl>
                <InputLabel color="secondary">Close Sound</InputLabel>
                <Select
                  size="small"
                  color="secondary"
                  label="Sound Pack"
                  autoWidth
                ></Select>
              </FormControl>
            </DigiDisplay> */}
          </Box>
        </DigiBox>
      </Box>
    </GlassBox>
  );
};
