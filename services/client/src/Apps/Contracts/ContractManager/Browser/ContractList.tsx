import { DataDisplayToggle } from '@Common/Components/Functional/Applcation/Buttons/DataDisplayToggle';
import { Box } from '@mui/material';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import { useMemo } from 'react';

/**
 * Contract Display for Contracts within The Contract Manager App
 * ___
 * TODO:
 * - Hook in the Data Display Toggle For DataDisplay View Variability (Using State For now)
 * - Create Two Seperate Views for the DataDisplay.
 */
export const ContractList: React.FC = () => {
  const themeExtend = useDynamicTheme();

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
      <DataDisplayToggle pageKey="contractManager-Browser" />
    </Box>
  );
};
