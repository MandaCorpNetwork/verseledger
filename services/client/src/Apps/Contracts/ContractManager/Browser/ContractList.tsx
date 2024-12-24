import { DataDisplayToggle } from '@Common/Components/Functional/Applcation/Buttons/DataDisplayToggle';
import { TableView } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import { useCallback, useMemo, useRef, useState } from 'react';

import { CardView } from './CardView';
import { ContractManagerDataAnchor } from './DataAnchor';

/**
 * Contract Display for Contracts within The Contract Manager App
 * ___
 * TODO:
 * - Create Two Seperate Views for the DataDisplay.
 * - Upon Dynamic Local Settings Setup, move Toggle to SearchTools Container
 */
export const ContractList: React.FC = () => {
  const themeExtend = useDynamicTheme();
  const ref = useRef<HTMLDivElement>(null);

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
      ref={ref}
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
        disabled={1}
        sx={{
          alignSelf: 'flex-start',
        }}
      />
      {listView === 0 && <CardView scrollRef={ref} />}
      {listView === 1 && <TableView />}
      <ContractManagerDataAnchor />
    </Box>
  );
};
