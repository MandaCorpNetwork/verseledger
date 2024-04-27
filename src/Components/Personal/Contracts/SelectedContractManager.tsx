import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Chip, Tab, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import { QueryNames } from '@/Common/Filters/QueryNames';
import { UserDisplay } from '@/Common/PlayerDisplay';
import { ContractLocationCard } from '@/Components/Personal/Contracts/ContractLocationCard';
import { ContractorsManager } from '@/Components/Personal/Contracts/ContractorsManager';
import { useAppSelector } from '@/Redux/hooks';
import { pickContract } from '@/Redux/Slices/Contracts/contractSelectors';
import { useURLQuery } from '@/Utils/Hooks/useURLQuery';
import { SalvageIcon, SecurityIcon } from '@/Common/definitions/CustomIcons';
import { LocationChip } from '@/Common/LocationChip';

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
        margin="dense"
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

export const SelectedContractManager: React.FC<unknown> = () => {
  //const [filters] = useURLQuery();
  // const selectedContract = useAppSelector((root) =>
  //   pickContract(root, Number(filters.get(QueryNames.SelectedContract))),
  // );

  const [contractManagerTab, setContractManagerTab] = useState<string>('contractors');

  const handleContractManageView = (event: React.SyntheticEvent, newValue: string) => {
    setContractManagerTab(newValue);
  };
  return (
    <Box
      data-testid="SelectedContractManagerWrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        p: '1em',
      }}
    >
      <Box
        data-testid="SelectedContract__TopBoxWrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '30%',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: '.5em',
          mb: '1em',
        }}
      >
        <Box
          data-testid="SelectedContract__PlayerDisplayContainer"
          sx={{
            padding: '.5em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '30%',
          }}
        >
          <UserDisplay userId={null} />
        </Box>
        <Box
          data-testid="SelectedContract__OverviewInfoContainer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '70%',
            padding: '1em',
            borderTop: '2px solid',
            borderBottom: '2px solid',
            borderRadius: '5px',
            borderColor: 'primary.main',
          }}
        >
          <Box
            data-testid="SelectedContract-OverviewInfo__HeaderWrapper"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              borderRadius: '20px',
              backgroundColor: 'rgba(14,49,141,.25)',
              px: '1em',
              justifyContent: 'center',
              py: '.2em',
            }}
          >
            <Box
              data-testid="SelectedContract-OverviewInfo-Header__TitleWrapper"
              sx={{ display: 'flex', flexDirection: 'row', mr: 'auto' }}
            >
              <Typography data-testid="SelectedContract__ContractTitle" variant="h4">
                Title
              </Typography>
            </Box>
            <Box data-testid="SelectedContract-OverviewInfo-Header__ContractTypeContainer">
              <SecurityIcon fontSize="large" color="secondary" />
              <SalvageIcon fontSize="large" color="secondary" />
            </Box>
          </Box>
          <Box
            data-testid="SelectedContract-OverviewInfo__BottomWrapper"
            sx={{ display: 'flex', flexDirection: 'row', width: '100%', mt: '.5em' }}
          >
            <Box
              data-testid="SelectedContract-OverviewInfo-Bottom__StatusChipWrapper"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '25%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                backgroundColor: 'rgba(14,49,141,.25)',
              }}
            >
              <Typography sx={{ mb: 'auto' }}>Status</Typography>
              <Chip
                data-testid="SelectedContract-OverviewInfo-Bottom-Status__StatusChip"
                label="Status"
                color="secondary"
                sx={{
                  p: '1em',
                  mb: 'auto',
                  fontWeight: 'bold',
                }}
              />
            </Box>
            <Box
              data-testid="SelectedContract-OverviewInfo-Bottom__DetailsContainer"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                ml: 'auto',
                mr: '.5em',
                backgroundColor: 'rgba(14,49,141,.25)',
                borderRadius: '10px',
                alignItems: 'center',
              }}
            >
              <Typography>Details</Typography>
              <Box
                data-testid="SelectedContract-OverviewInfo-Bottom__DetailsWrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '.5em',
                  mb: '.2em',
                }}
              >
                <Box
                  data-testid="SelectedContract-OverviewInfo-Bottom__PayInfoWrapper"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '35%',
                    ml: 'auto',
                  }}
                >
                  <ContractDataField label="PayStructure" value="PayStructure" />
                  <ContractDataField label="Pay" value="Pay Estimate" />
                </Box>
                <Box
                  data-testid="SelectedContract-OverviewInfo-Bottom__TimeInfoWrapper"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '35%',
                    mr: 'auto',
                  }}
                >
                  <ContractDataField label="Start" value="Start Date" />
                  <ContractDataField label="Remaining" value="End Date" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        data-testid="SelectedContract__BottomBoxWrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '55%',
          p: '.5em',
        }}
      >
        <Box
          data-testid="SelectedContract-Bottom__LeftBoxWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '45%',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Box
            data-testid="SelectedContract__LocationsContainer"
            sx={{
              width: '80%',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'primary.main',
              display: 'flex',
              flexDirection: 'column',
              p: '.5em',
              mb: '1em',
            }}
          >
            <Typography
              data-testid="SelectedContract-Locations__TitleText"
              sx={{
                backgroundColor: 'rgba(14,49,141,.25)',
                borderRadius: '10px',
                pl: '1em',
              }}
            >
              Locations
            </Typography>
            <Box
              data-testid="SelectedContract-Locations__StartandEndWrapper"
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                gap: '.5em',
                my: '.5em',
              }}
            >
              <Box
                data-testid="SelectedContract-Locations__StartLocationWrapper"
                sx={{
                  width: '40%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  ml: 'auto',
                  pb: '.3em',
                  backgroundColor: 'rgba(14,49,141,.25)',
                  borderRadius: '10px',
                }}
              >
                <Typography>Start Location</Typography>
                <LocationChip />
              </Box>
              <Box
                data-testid="SelectedContract-Locations__EndLocationWrapper"
                sx={{
                  width: '40%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mr: 'auto',
                  pb: '.3em',
                  backgroundColor: 'rgba(14,49,141,.25)',
                  borderRadius: '10px',
                }}
              >
                <Typography>End Location</Typography>
                <LocationChip />
              </Box>
            </Box>
            <Box
              data-testid="SelectedContract-Locations_OtherLocationsContainer"
              sx={{
                width: '82%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(14,49,141,.25)',
                borderRadius: '10px',
                pb: '.3em',
                mx: 'auto',
              }}
            >
              <Typography>Other Locations</Typography>
              <Box
                data-testid="SelectedContract-Locations__OtherLocationsWrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <LocationChip />
              </Box>
            </Box>
          </Box>
          <Box
            data-testid="SelectedContract__BriefingWrapper"
            sx={{
              width: '80%',
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'primary.main',
              display: 'flex',
              flexDirection: 'column',
              p: '.5em',
              mb: '1em',
            }}
          >
            <Typography
              data-testid="SelectedContract-Briefing__BriefingTitle"
              sx={{
                backgroundColor: 'rgba(14,49,141,.25)',
                borderRadius: '10px',
                pl: '1em',
              }}
            >
              Briefing
            </Typography>
            <Box
              data-testid="SelectedContract-Briefing__ContentWrapper"
              sx={{
                mx: '10%',
                mt: '.5em',
                backgroundColor: 'rgba(14,49,141,.25)',
                borderRadius: '10px',
                p: '.5em',
                maxHeight: '100px',
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgb(8, 29, 68)',
                  borderRadius: '20px',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '20px',
                  background: 'rgb(121, 192, 244, .5)',
                },
              }}
            >
              <Typography
                data-testid="SelectedContract-Briefing__ContentText"
                variant="body2"
                sx={{
                  textWrap: 'wrap',
                  whiteSpace: 'normal',
                  wordBreak: 'break-all',
                }}
              >
                aslkgdnjrdalkrjngkqanjglpnjagrlnjaldkrjnglainjrglkanjlvkrjnakldfnjvalkdnjflkajndvlkanjdvlknavlkdnjvdlksajnvdlksanjvdlknjalkdvfnjajlkdvnjlakjdnvlkjsfghsdfghdkskjnlsk;nfgksnfdk;lnkgjksjnfgnjskl;fnjgk;dlsjngfl;kjnsdlkgfnjsdkjnfglksjn
              </Typography>
            </Box>
          </Box>
          <Box
            data-testid="SelectedContract__ControllerWrapper"
            sx={{
              mt: 'auto',
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              gap: '.5em',
            }}
          >
            <Box
              data-testid="SelectedContract-Controller__ProcessButtonWrapper"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '40%',
                gap: '.5em',
                ml: 'auto',
              }}
            >
              <Button
                data-testid="SelectedContract-Controller-Process__StartContractButton"
                variant="outlined"
                color="secondary"
                size="medium"
                fullWidth
              >
                Start Contract
              </Button>
              <Button
                data-testid="SelectedContract-Controller-Process__CompleteContract"
                variant="outlined"
                color="success"
                size="medium"
                fullWidth
              >
                Complete Contract
              </Button>
            </Box>
            <Box
              data-testid="SelectedContract-Controller__EditButtonWrapper"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '40%',
                gap: '.5em',
                mr: 'auto',
              }}
            >
              <Button
                data-testid="SelectedContract-Controller-Edit__EditContractButton"
                variant="outlined"
                color="info"
                size="medium"
                fullWidth
              >
                Edit Contract
              </Button>
              <Button
                data-testid="SelectedContract-Controller-Edit__CancelContractButton"
                variant="outlined"
                color="error"
                size="medium"
                fullWidth
              >
                Cancel Contract
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          data-testid="SelectedContract-Bottom__RightBoxWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '45%',
            height: '100%',
            ml: 'auto',
            mr: 'auto',
          }}
        >
          <Box
            data-testid="SelectedContract__ContractManagementContainer"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
            }}
          >
            <Box
              data-testid="SelectedContract-ContractManagement__TabWrapper"
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <TabContext value={contractManagerTab}>
                <TabList
                  data-testid="SelectedContract-ContractManagement__TabList"
                  onChange={handleContractManageView}
                  indicatorColor="secondary"
                  textColor="secondary"
                  variant="fullWidth"
                >
                  <Tab label="Contractors" value="contractors" />
                  <Tab disabled label="Payroll" value="payroll" />
                  <Tab disabled label="Ships" value="ships" />
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
              </TabContext>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
