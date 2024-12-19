import { DATA_DISPLAY_KEY } from '@Common/Definitions/Dev/IUserSettings';
import { useAppSelector } from '@Redux/hooks';
import { selectUserSettings } from '@Redux/Slices/Auth/auth.selectors';
import { readBit, setBit } from '@Utils/Functions/Dev/BitUtils';
import { readSetting, saveSettings } from '@Utils/Functions/Dev/SettingsUtils';
import { useCallback, useMemo } from 'react';

export const useUserSettings = () => {
  const serverSettings = useAppSelector(selectUserSettings);

  const updateSession = useCallback(
    (key: string, current: number, position: number, value: 0 | 1) => {
      const update = setBit(current, position, value);
      saveSettings(key, update, true);
    },
    [],
  );

  const dataDisplay = useMemo(() => {
    const session = readSetting(DATA_DISPLAY_KEY, 'session');
    const server = serverSettings?.dataDisplay;
    if (!session) {
      if (server) {
        saveSettings(DATA_DISPLAY_KEY, Number.parseInt(server), true);
        return Number.parseInt(server);
      }
    }
  }, [serverSettings?.dataDisplay]);

  const getSetting = useCallback(
    (key: string, position: number) => {
      const setting = (() => {
        switch (key) {
          case 'dataDisplay':
            return dataDisplay;
          default:
            return;
        }
      })();
      if (!setting) {
        return 0;
      }
      return readBit(setting, position);
    },
    [dataDisplay],
  );

  return { updateSession, dataDisplay, getSetting };
};
