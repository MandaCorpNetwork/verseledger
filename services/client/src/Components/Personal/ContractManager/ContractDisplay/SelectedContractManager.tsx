import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { DigiDisplay } from '@Common/Components/Boxes/DigiDisplay';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { ContractStatusChip } from '@Common/Components/Chips/ContractStatusChip';
import { SubtypeChip } from '@Common/Components/Chips/SubtypeChip';
import { ContractorList } from '@Common/Components/Contracts/ContractorList';
import { PayDisplay } from '@Common/Components/Custom/DigiField/PayDisplay';
import { PayStructure } from '@Common/Components/Custom/DigiField/PayStructure';
import { SmallTabHolo, SmallTabsHolo } from '@Common/Components/Tabs/SmallTabsHolo';
import TabListHolo from '@Common/Components/Tabs/TabListHolo';
import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { Link, OpenInFull } from '@mui/icons-material';
import { Box, IconButton, Tab, Tooltip, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';
import { selectContract } from '@Redux/Slices/Contracts/selectors/contractSelectors';
import { URLUtil } from '@Utils/URLUtil';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';
import { ILocationWithContractLocation } from 'vl-shared/src/schemas/LocationSchema';

import { useSoundEffect } from '@/AudioManager';
import {
  BiddingTimePanel,
  ContractDurationPanel,
} from '@/Components/Contracts/Ledger/Details/TimePanel';

import { ContractController } from './tools/ContractController';
import { LocationsDisplay } from './tools/LocationsDisplay';

type SelectedContractManagerProps = {
  contractId: string | null;
  deselectContract: () => void;
};

export const SelectedContractManager: React.FC<SelectedContractManagerProps> = ({
  contractId,
  deselectContract,
}) => {
  const navigate = useNavigate();

  const handleCopyURL = React.useCallback((url: string) => {
    const prefix = URLUtil.frontendHost;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(`${prefix}${url}`)
        .then(() => {
          playSound('clickMain');
          enqueueSnackbar('Copied Contract to Clipboard', { variant: 'success' });
        })
        .catch((err) => {
          playSound('error');
          enqueueSnackbar(`Failed to Copy Contract: ${err}`, { variant: 'error' });
        });
    } else {
      playSound('denied');
      enqueueSnackbar('Clipboard API not supported', { variant: 'warning' });
    }
  }, []);

  const handleCopyURLCallback = React.useCallback(
    (contractId: string) => () => handleCopyURL(`/ledger/contracts/${contractId}`),
    [handleCopyURL],
  );

  const handleContractPageNav = React.useCallback(
    (contractId: string) => {
      playSound('navigate');
      navigate(`/ledger/contracts/${contractId}`);
    },
    [navigate],
  );

  const handleContractPageNavCallback = React.useCallback(
    (contractId: string) => () => handleContractPageNav(contractId),
    [handleContractPageNav],
  );

  const { playSound } = useSoundEffect();
  const [contractManagerTab, setContractManagerTab] = useState<string>('contractors');
  const [archetype, setArchetype] = React.useState<string | null>(null);
  const [timeTab, setTimeTab] = React.useState<string>('bid');

  const options = contractArchetypes('secondary.main', 'large');

  const contract = useAppSelector((root) => selectContract(root, contractId as string));
  const currentUser = useAppSelector(selectCurrentUser);

  React.useEffect(() => {
    const selectedArchetype = options.find((option) =>
      option.subTypes.some((subtype) => subtype.value === contract.subtype),
    );
    if (selectedArchetype) {
      setArchetype(selectedArchetype?.archetype);
    } else {
      setArchetype(null);
    }
  }, [contract.subtype]);

  const handleContractManageView = (_event: React.SyntheticEvent, newValue: string) => {
    playSound('clickMain');
    setContractManagerTab(newValue);
  };

  const renderContractManagerTab = React.useCallback(
    (panel: string) => {
      switch (panel) {
        case 'contractors':
          return <ContractorList contract={contract} />;
        case 'ships':
          return;
        default:
          return;
      }
    },
    [contractManagerTab, contract],
  );

  const handleTimeTab = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      playSound('clickMain');
      setTimeTab(value);
    },
    [timeTab],
  );

  const timePanel = React.useCallback(
    (panel: string) => {
      switch (panel) {
        case 'bid':
          return <BiddingTimePanel contract={contract} />;
        case 'duration':
          return <ContractDurationPanel contract={contract} />;
        default:
          return;
      }
    },
    [timeTab, contract],
  );

  const contractLocations = React.useCallback(() => {
    if (!contract.Locations) {
      return [] as ILocationWithContractLocation[];
    }
    const validLocations = contract.Locations.filter(
      (loc) => loc.ContractLocation !== undefined,
    );
    return validLocations as ILocationWithContractLocation[];
  }, [contract]);

  const isContractOwned = React.useMemo(() => {
    if (contract.owner_id === currentUser?.id) {
      return true;
    } else {
      return false;
    }
  }, [currentUser, contract.owner_id, contractId]);

  const userBid = React.useMemo(() => {
    if (isContractOwned) {
      return null;
    }
    return contract.Bids?.find((bid) => bid.user_id === currentUser?.id) ?? null;
  }, [contract.Bids, currentUser, isContractOwned]);

  return (
    <Box
      data-testid="SelectedContractManagerWrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        p: { md: '.5em', lg: '1em' },
      }}
    >
      <DigiBox
        data-testid="SelectedContract__OverviewInfoContainer"
        sx={{
          width: '100%',
          padding: '1em',
          mb: '.5em',
          height: 'auto',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <DigiDisplay
            data-testid="SelectedContract-OverviewInfo__HeaderWrapper"
            sx={{
              flexDirection: 'row',
              px: '1em',
              py: '.2em',
              alignItems: 'strech',
              justifyContent: 'space-between',
              flexGrow: 1,
            }}
          >
            <Typography
              data-testid="SelectedContract__ContractTitle"
              variant="h4"
              noWrap
              sx={{
                fontWeight: 'bold',
                maxWidth: '100%',
                cursor: 'default',
                textShadow: '0 0 10px rgba(14,252,252,0.5)',
              }}
            >
              {contract.title}
            </Typography>
            <Box
              data-testid="SelectedContract-OverviewInfo-Header__ContractTypeContainer"
              sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
              <Tooltip title={archetype}>
                {options.find((option) => option.archetype === archetype)
                  ?.archetypeIcon ?? <Typography>???</Typography>}
              </Tooltip>
            </Box>
          </DigiDisplay>
          <IconButton size="small" onClick={handleCopyURLCallback(contract.id)}>
            <Link fontSize="medium" />
          </IconButton>
          <IconButton size="small" onClick={handleContractPageNavCallback(contract.id)}>
            <OpenInFull fontSize="medium" />
          </IconButton>
        </Box>
        <Box
          data-testid="SelectedContract-OverviewInfo__BottomWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            mt: '.5em',
            justifyContent: 'space-around',
          }}
        >
          <Box
            data-testid="SelectedContract-OverviewInfo-Bottom__Status&SubtypeWrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'space-around',
              justifyContent: 'space-around',
            }}
          >
            <DigiDisplay
              data-testid="SelectedContract-OverviewInfo-Bottom__StatusChipWrapper"
              sx={{
                width: '100%',
                p: '.2em',
              }}
            >
              <Typography
                variant="body2"
                sx={{ mb: 'auto', fontWeight: 'bold', cursor: 'default' }}
              >
                Status
              </Typography>
              <ContractStatusChip status={contract.status} />
            </DigiDisplay>
            <DigiDisplay
              data-testid="SelectedContract-OverviewInfo-Bottom__SubtypeChipWrapper"
              sx={{
                width: '100%',
                p: '.2em',
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 'bold', mb: 'auto', cursor: 'default' }}
              >
                Contract Subtypes
              </Typography>
              <SubtypeChip
                data-testid="ContractManager__SelectedContract"
                subtype={contract.subtype}
                size="medium"
              />
            </DigiDisplay>
          </Box>
          <DigiDisplay
            data-testid="SelectedContract-OverviewInfo-Bottom__DetailsContainer"
            sx={{ py: '.2em', px: '1em', gap: '.2em', alignItems: 'space-between' }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold', cursor: 'default' }}>
              Pay Defaults
            </Typography>
            <PayStructure payStructure={contract.payStructure} width="100%" />
            <PayDisplay
              label="Default Pay"
              pay={contract.defaultPay}
              structure={(contract.payStructure as ContractPayStructure) ?? undefined}
              sx={{
                minWidth: '120px',
              }}
            />
          </DigiDisplay>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '.5em',
            }}
          >
            <ControlPanelBox
              sx={{
                display: 'block',
                px: '.5em',
              }}
            >
              <SmallTabsHolo
                variant="fullWidth"
                value={timeTab}
                onChange={handleTimeTab}
                textColor="secondary"
                indicatorColor="secondary"
              >
                <SmallTabHolo label="Bidding" value="bid" />
                <SmallTabHolo label="Duration" value="duration" />
              </SmallTabsHolo>
            </ControlPanelBox>
            <GlassDisplay
              sx={{
                p: '.5em',
              }}
            >
              {timePanel(timeTab)}
            </GlassDisplay>
          </Box>
          <UserDisplay userid={contract.owner_id} />
        </Box>
      </DigiBox>
      <Box
        data-testid="SelectedContract__BottomBoxWrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          p: '.5em',
          justifyContent: 'space-between',
          maxHeight: '70%',
        }}
      >
        <Box
          data-testid="SelectedContract-Bottom__LeftBoxWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '48%',
            height: '100%',
            gap: '.5em',
          }}
        >
          <TabListHolo
            data-testid="SelectedContract-ContractManagement__TabList"
            value={contractManagerTab}
            onChange={handleContractManageView}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            sx={{
              px: '1em',
              py: '.2em',
            }}
          >
            <Tab label="Contractors" value="contractors" />
            <Tab disabled label="Ships" value="ships" />
            <Tab disabled label="Payroll" value="payroll" />
          </TabListHolo>
          <Box sx={{ maxHeight: '85%' }}>
            {renderContractManagerTab(contractManagerTab)}
          </Box>
        </Box>
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
          {contract.Locations && <LocationsDisplay locations={contractLocations()} />}
          <DigiBox
            data-testid="SelectedContract__BriefingWrapper"
            sx={{
              width: '80%',
              p: '.5em',
              mb: '1em',
            }}
          >
            <DigiDisplay data-testid="SelectedContract-Briefing__BriefingTitle">
              <Typography variant="body2" sx={{ fontWeight: 'bold', cursor: 'default' }}>
                Briefing
              </Typography>
            </DigiDisplay>
            <DigiDisplay
              data-testid="SelectedContract-Briefing__ContentWrapper"
              sx={{
                mx: '10%',
                mt: '.5em',
                maxHeight: '150px',
                p: '.5em',
                overflow: 'auto',
              }}
            >
              <Typography
                data-testid="SelectedContract-Briefing__ContentText"
                variant="paragraph"
                sx={{
                  pl: '.5em',
                  fontSize: '.85em',
                  color: 'text.primary',
                }}
              >
                {contract.briefing}
              </Typography>
            </DigiDisplay>
          </DigiBox>
          <ControlPanelBox
            data-testid="SelectedContract__ControllerContainer"
            sx={{
              mt: 'auto',
              width: '100%',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{ fontWeight: 'bold', color: 'text.secondary', cursor: 'default' }}
            >
              Contract Controller
            </Typography>
            <ContractController
              contract={contract}
              userBid={userBid}
              isOwned={isContractOwned}
              deselectContract={deselectContract}
            />
          </ControlPanelBox>
        </Box>
      </Box>
    </Box>
  );
};
