import { DataDisplayToggle } from '@Common/Components/Functional/Applcation/Buttons/DataDisplayToggle';
import { Box } from '@mui/material';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import { useCallback, useMemo, useState } from 'react';

/**
 * Contract Display for Contracts within The Contract Manager App
 * ___
 * TODO:
 * - Create Two Seperate Views for the DataDisplay.
 * - Upon Dynamic Local Settings Setup, move Toggle to SearchTools Container
 */
export const ContractList: React.FC = () => {
  const themeExtend = useDynamicTheme();

  /** Temporary State for DataDisplay
   * Waiting for Local DB with UserSettings
   */
  const [listView, setListView] = useState<0 | 1>(0);

  /** Temporary Handler to switch DataDisplay */
  const handleListView = useCallback((value: 0 | 1) => {
    setListView(value);
  }, []);

  const layout = useMemo(() => {
    const container = themeExtend.layout('ContractManager.ContractListContainer');

    return { container };
  }, [themeExtend]);

  return (
    <Box
      data-testid="ContractManager-Browser__ContractList_Container"
      aria-label="Contract Selection List"
      id="ContractManager_ContractList_Container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        alignItems: 'center',
        flexGrow: 1,
        position: 'relative',
        mb: '1em',
        ...layout.container,
      }}
    >
      <DataDisplayToggle
        view={listView}
        onChange={handleListView}
        sx={{
          alignSelf: 'flex-start',
        }}
      />
    </Box>
  );
};
