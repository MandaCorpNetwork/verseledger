import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Chip, Tab, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import { PlayerDisplay } from '@/Components/Global/PlayerDisplay';
import { ContractLocationCard } from '@/Components/Personal/Contracts/ContractLocationCard';
import { ContractorsManager } from '@/Components/Personal/Contracts/ContractorsManager';
import { FleetAllocation } from '@/Components/Personal/Contracts/FleetAllocation';
import { PayrollPanel } from '@/Components/Personal/Contracts/PayrollPanel';

type ContractDataFieldProps = {
  label: string;
  value: string;
};
const ContractDataField: React.FC<ContractDataFieldProps> = ({ label, value }) => {
  return (
    <>
      <TextField
        label={label}
        value={value}
        size="small"
        InputProps={{
          readOnly: true,
        }}
        inputProps={{
          style: {
            textAlign: 'center',
          },
        }}
      />
    </>
  );
};

export const ContractManager: React.FC<unknown> = () => {
  const [contractManagerTab, setContractManagerTab] = useState<string>('payroll');

  const handleContractManageView = (event: React.SyntheticEvent, newValue: string) => {
    setContractManagerTab(newValue);
  };
  return (
    <Box
      data-id="ContractManagerContent"
      sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}
    >
      <Box
        data-id="TopBox"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '25%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          data-id="OwnerProfileBox"
          sx={{
            padding: '.5em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '35%',
            bgcolor: 'background.default',
          }}
        >
          <PlayerDisplay />
        </Box>
        <Box
          data-id="ContractHeaderBox"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '55%',
          }}
        >
          <Typography data-id="ContractTitle" variant="h4">
            Title
          </Typography>
          <ContractDataField label="Contract Type" value="Type | Subtype" />
          <Box>
            <Chip data-id="ContractStatus" label="Status" color="primary" size="medium" />
          </Box>
        </Box>
        <Box
          data-id="ContractPayDisplay"
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <ContractDataField label="PayStructure" value="PayStructure" />
          <ContractDataField label="Pay" value="Pay Estimate" />
        </Box>
        <Box
          data-id="ContractTimeDisplay"
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <ContractDataField label="Start" value="Start Date" />
          <ContractDataField label="Remaining" value="End Date" />
        </Box>
      </Box>
      <Box
        data-id="MidBox"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '25%',
        }}
      >
        <Box
          data-id="LocationDisplay"
          sx={{
            width: '45%',
            display: 'flex',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '5px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgb(8, 29, 68)',
              borderRadius: '15px',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '15px',
              background: 'rgb(121, 192, 244, .5)',
            },
          }}
        >
          <ContractLocationCard />
          <ContractLocationCard />
          <ContractLocationCard />
          <ContractLocationCard />
          <ContractLocationCard />
          <ContractLocationCard />
        </Box>
        <Box
          data-id="ContractBriefing"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '65%',
            alignItems: 'center',
          }}
        >
          <Typography data-id="ContractBriefingTitle" variant="h5">
            Briefing
          </Typography>
          <Typography
            data-id="ContractBriefingContent"
            variant="body1"
            sx={{ textWrap: 'wrap', whiteSpace: 'normal', wordBreak: 'break-all' }}
          >
            aslkgdnjrdalkrjngkqanjglpnjagrlnjaldkrjnglainjrglkanjlvkrjnakldfnjvalkdnjflkajndvlkanjdvlknavlkdnjvdlksajnvdlksanjvdlknjalkdvfnjajlkdvnjlakjdnvlkj
          </Typography>
        </Box>
      </Box>
      <Box
        data-id="ContractControls"
        sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '50%' }}
      >
        <Box sx={{ width: '80%' }}>
          <TabContext value={contractManagerTab}>
            <TabList onChange={handleContractManageView}>
              <Tab label="Contractors" value="contractors" />
              <Tab label="Fleet Allocation" value="fleet" />
              <Tab label="Payroll" value="payroll" />
            </TabList>
            <TabPanel
              value="contractors"
              sx={{
                overflow: 'auto',
                height: '100%',
                '&::-webkit-scrollbar': {
                  width: '5px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgb(8, 29, 68)',
                  borderRadius: '15px',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '15px',
                  background: 'rgb(121, 192, 244, .5)',
                },
              }}
            >
              <ContractorsManager />
            </TabPanel>
            <TabPanel
              value="fleet"
              sx={{
                overflow: 'auto',
                height: '100%',
                '&::-webkit-scrollbar': {
                  width: '5px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgb(8, 29, 68)',
                  borderRadius: '15px',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '15px',
                  background: 'rgb(121, 192, 244, .5)',
                },
              }}
            >
              <FleetAllocation />
            </TabPanel>
            <TabPanel value="payroll" sx={{ height: '100%' }}>
              <PayrollPanel />
            </TabPanel>
          </TabContext>
        </Box>
        <Box data-id="ContractController" sx={{ width: '20%' }}>
          <Button>Start Contract</Button>
          <Button>Complete Contract</Button>
          <Button>Edit Contract</Button>
          <Button>Cancel Contract</Button>
        </Box>
      </Box>
    </Box>
  );
};
