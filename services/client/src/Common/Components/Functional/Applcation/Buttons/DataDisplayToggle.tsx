import { DATA_DISPLAY_KEY } from '@Common/Definitions/Dev/IUserSettings';
import { DataDisplays } from '@Common/Definitions/Settings/DataDisplay';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useUserSettings } from '@Utils/Hooks/useUserSettings';
import { Logger } from '@Utils/Logger';
import type React from 'react';
import { useCallback, useMemo } from 'react';

type DataDisplayToggleProps = {
  pageKey: string;
};

export const DataDisplayToggle: React.FC<DataDisplayToggleProps> = ({ pageKey }) => {
  const settings = useUserSettings();

  const position = useMemo(() => {
    const index = DataDisplays.indexOf(pageKey);
    if (index === -1) {
      Logger.warn(`PageKey "${pageKey}" not found in DataDisplays Listings`);
    }
    return index;
  }, [pageKey]);

  const currentSetting = useMemo(
    () => settings.getSetting(DATA_DISPLAY_KEY, position),
    [position, settings],
  );

  const handleToggle = useCallback(
    (_e: React.MouseEvent<HTMLElement>, value: 0 | 1) => {
      if (value !== null && value !== currentSetting) {
        settings.updateSession(DATA_DISPLAY_KEY, currentSetting, position, value);
      }
    },
    [currentSetting, position, settings],
  );

  return (
    <ToggleButtonGroup value={currentSetting} exclusive onChange={handleToggle}>
      <ToggleButton value={0}></ToggleButton>
      <ToggleButton value={1}></ToggleButton>
    </ToggleButtonGroup>
  );
};
