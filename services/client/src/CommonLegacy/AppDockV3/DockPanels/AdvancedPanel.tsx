import '@Assets/Css/AppDockV3.css';

import { AppButtonV2 } from '@CommonLegacy/Components/Buttons/AppButtonV2';
import { useMasterAppList } from '@CommonLegacy/DefinitionsLegacy/AppListings';
import React from 'react';

import { PanelScrollButton } from '../Buttons/ScrollButton';

export const AdvancedDockPanel: React.FC = () => {
  const masterAppList = useMasterAppList();
  const enabledApps = masterAppList.filter(
    (app) => !app.disabled && app.id !== 'dashboard',
  );

  const [startIndex, setStartIndex] = React.useState<number>(0);
  const appsPerPage = 4;

  const handleNext = React.useCallback(() => {
    if (startIndex + appsPerPage < enabledApps.length) {
      setStartIndex((prev) => prev + 1);
    }
  }, [enabledApps.length, startIndex]);

  const handlePrevious = React.useCallback(() => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  }, [startIndex]);

  const visibleApps = enabledApps.slice(startIndex, startIndex + appsPerPage);
  return (
    <div
      data-testid="AppDock__AdvPanel_Wrapper"
      id="AdvPanelWrapper"
      style={{ display: 'flex', flexDirection: 'row', gap: '0.5em' }}
    >
      <PanelScrollButton
        onClick={handlePrevious}
        disabled={startIndex === 0}
        direction="backward"
      />
      {visibleApps.map((app) => (
        <AppButtonV2
          key={app.id}
          label={app.label}
          path={app.path}
          icon={app.icon}
          disabled={app.disabled ?? false}
        />
      ))}
      <PanelScrollButton
        onClick={handleNext}
        disabled={startIndex === enabledApps.length - 4}
        direction="forward"
      />
    </div>
  );
};
