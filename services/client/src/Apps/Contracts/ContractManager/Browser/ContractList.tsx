import { DataDisplayToggle } from '@Common/Components/Functional/Applcation/Buttons/DataDisplayToggle';
import { Box } from '@mui/material';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import { useMemo } from 'react';

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
