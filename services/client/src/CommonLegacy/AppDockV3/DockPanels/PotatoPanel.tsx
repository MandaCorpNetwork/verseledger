import AppButtonV2 from '@CommonLegacy/Components/Buttons/AppButtonV2';
import { useMasterAppList } from '@CommonLegacy/DefinitionsLegacy/AppListings';

export const PotatoDockPanel: React.FC = () => {
  const masterAppList = useMasterAppList();
  const enabledApps = masterAppList.filter(
    (app) => !app.disabled && app.id !== 'dashboard',
  );
  return (
    <div
      data-testid="AppDock__NormalPanel_Wrapper"
      style={{ display: 'flex', flexDirection: 'row', gap: '0.5em' }}
    >
      {enabledApps.map((app) => (
        <AppButtonV2
          key={app.id}
          label={app.label}
          path={app.path}
          icon={app.icon}
          disabled={app.disabled ?? false}
        />
      ))}
    </div>
  );
};
