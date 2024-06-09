import { LocationChip } from '@Common/Components/App/LocationChip';
import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import {
  FleetIcon,
  LogisticsIcon,
  RRRIcon,
  SalvageIcon,
  SecurityIcon,
} from '@Common/Definitions/CustomIcons';
import {
  Explore,
  Factory,
  HelpOutline,
  LocalHospital,
  VisibilityOff,
} from '@mui/icons-material';
import { Box, Chip, Divider, InputAdornment, TextField, Typography } from '@mui/material';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { POPUP_PAY_STRUCTURES } from '@Popups/Info/PayStructures';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

const options = [
  {
    archetype: 'Logistics',
    archetypeIcon: <LogisticsIcon color="secondary" />,
    subTypes: [
      {
        label: 'Transport',
        value: 'Transport',
      },
      {
        label: 'Hauling',
        value: 'Hauling',
      },
      {
        label: 'Manage',
        value: 'Manage',
      },
    ],
  },
  {
    archetype: 'Medical',
    archetypeIcon: <LocalHospital color="secondary" />,
    subTypes: [
      {
        label: 'Trauma',
        value: 'Trauma',
      },
      {
        label: 'On-Call',
        value: 'On-Call',
      },
    ],
  },
  {
    archetype: 'Security',
    archetypeIcon: <SecurityIcon color="secondary" />,
    subTypes: [
      {
        label: 'Escort',
        value: 'Escort',
      },
      {
        label: 'Bounty',
        value: 'Bounty',
      },
      {
        label: 'Quick Reaction Force',
        value: 'QRF',
      },
      {
        label: 'Asset Protection',
        value: 'Asset-Protection',
      },
      {
        label: 'Attache',
        value: 'Attache',
      },
    ],
  },
  {
    archetype: 'Salvage',
    archetypeIcon: <SalvageIcon color="secondary" />,
    subTypes: [
      {
        label: 'Collection',
        value: 'Collection',
      },
      {
        label: 'Procurement',
        value: 'Procurement',
      },
    ],
  },
  {
    archetype: 'Industry',
    archetypeIcon: <Factory color="secondary" />,
    subTypes: [
      {
        label: 'Mining',
        value: 'Mining',
      },
      {
        label: 'Refining',
        value: 'Refining',
      },
      {
        label: 'Manufacturing',
        value: 'Manufacturing',
      },
      {
        label: 'Scouting',
        value: 'Scouting',
      },
    ],
  },
  {
    archetype: 'RRR',
    archetypeIcon: <RRRIcon color="secondary" />,
    subTypes: [
      {
        label: 'Refuel',
        value: 'Refuel',
      },
      {
        label: 'Rearm',
        value: 'Rearm',
      },
      {
        label: 'Repair',
        value: 'Repair',
      },
    ],
  },
  {
    archetype: 'Fleet',
    archetypeIcon: <FleetIcon color="secondary" />,
    subTypes: [
      {
        label: 'Crewman',
        value: 'Crewman',
      },
      {
        label: 'Outsourcing',
        value: 'Outsourcing',
      },
    ],
  },
  {
    archetype: 'Exploration',
    archetypeIcon: <Explore color="secondary" />,
    subTypes: [
      {
        label: 'Locate',
        value: 'Locate',
      },
      {
        label: 'Charting',
        value: 'Charting',
      },
    ],
  },
  {
    archetype: 'Proxy',
    archetypeIcon: <VisibilityOff color="secondary" />,
    subTypes: [
      {
        label: 'Middleman',
        value: 'Middleman',
      },
      {
        label: 'Redacted',
        value: 'Redacted',
      },
    ],
  },
];

export const POPUP_SUBMIT_CONTRACT_BID = 'submitContractBid';

export type ContractBidProps = {
  contract: IContract;
};

export const SubmitContractBid: React.FC<ContractBidProps> = ({ contract }) => {
  const dispatch = useAppDispatch();

  const archetypeObj = options.find((option) =>
    option.subTypes.some((subType) => subType.label === contract.subtype),
  );

  const handleArchetypeOpen = () => {
    dispatch(openPopup(POPUP_ARCHETYPE_INFO, { option: archetypeObj?.archetype }));
  };

  const handlePayStructurePopup = () => {
    dispatch(openPopup(POPUP_PAY_STRUCTURES));
  };

  const statusChipColor = React.useCallback(() => {
    if (contract.status == 'BIDDING') {
      return 'secondary';
    } else if (contract.status == 'STARTED') {
      return 'info';
    } else if (contract.status == 'COMPLETE') {
      return 'success';
    } else if (contract.status == 'CANCELED') {
      return 'error';
    } else {
      return 'primary';
    }
  }, [contract.status]);

  const statusColor = statusChipColor();

  return (
    <VLPopup
      name={POPUP_SUBMIT_CONTRACT_BID}
      title="Submit Bid"
      submitText="Submit Bid"
      onSubmit={() => {}}
      data-testid="ContractBid"
    >
      <Box data-testid="ContractBid__Wrapper">
        <Box data-testid="ContractBid-UserDisplay__Wrapper">
          <UserDisplay userid={contract.owner_id} />
        </Box>
        <Box
          data-testid="ContractBid-ContractDetails__Wrapper"
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Typography
            data-testid="ContractBid-ContractDetails__Title"
            sx={{ fontSize: '1.2em', fontWeight: 'bold', color: 'secondary.main' }}
          >
            Contract Details
          </Typography>
          <Box
            data-testid="ContractBid-ContractDetails__TopContainer"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <Box
              data-testid="ContractBid-ContractDetails__ContractTypeWrapper"
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                data-testid="ContractBid-ContractDetails__ContractTypeTitle"
                align="center"
                variant="body2"
                sx={{ fontWeight: 'bold', color: 'text.secondary' }}
              >
                Contract Type
              </Typography>
              <Box
                data-testid="ContractBid-ContractDetails-ContractType__SubtypeChipWrapper"
                sx={{ mx: 'auto', mt: '.2em' }}
              >
                <Chip
                  data-testid="ContractBid-ContractDetails-ContractType__SubtypeChip"
                  label={contract.subtype}
                  icon={archetypeObj ? archetypeObj.archetypeIcon : undefined}
                  variant="outlined"
                  size="small"
                  color="secondary"
                  onClick={handleArchetypeOpen}
                />
              </Box>
            </Box>
            <Box
              data-testid="ContractBid-ContractDetails__ContractStatusWrapper"
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <Typography
                data-testid="ContractBid-ContractDetails__ContractStatusTitle"
                align="center"
                variant="body2"
                sx={{ fontWeight: 'bold', color: 'text.secondary' }}
              >
                Contract Status
              </Typography>
              <Box
                data-testid="ContractBid-ContractDetails-ContractStatus__ChipWrapper"
                sx={{ mx: 'auto', mt: '.2em' }}
              >
                <Chip
                  data-testid="ContractBid-ContractDetails-ContractStatus__StatusChip"
                  label={
                    contract.status.charAt(0) + contract.status.slice(1).toLowerCase()
                  }
                  color={statusColor}
                  size="small"
                />
              </Box>
            </Box>
          </Box>
          <Box
            data-testid="ContractBid-ContractDetails__BriefingWrapper"
            sx={{ display: 'flex', flexDirection: 'column', mt: '.5em', px: '1em' }}
          >
            <Typography
              data-testid="ContractBid-ContractDetails__BriefingTitle"
              align="left"
              variant="body2"
              sx={{ fontWeight: 'bold', color: 'text.secondary' }}
            >
              {contract.title}
            </Typography>
            <Box
              data-testid="ContractBid-ContractDetails-Briefing__ContentWrapper"
              sx={{
                display: 'flex',
                flexDirection: 'inherit',
                maxHeight: '150px',
                overflow: 'auto',
                p: '.5em',
                '&::-webkit-scrollbar': {
                  width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgb(8, 29, 68)',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '20px',
                  background: 'rgb(121, 192, 244, .5)',
                },
              }}
            >
              <Typography
                data-testid="ContractBid-ContractDetails-Briefing__Content"
                variant="body2"
                sx={{
                  fontSize: '.82em',
                }}
              >
                {contract.briefing}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider
          data-testid="ContractBid-StaticVsDynamic__Divider"
          sx={{ my: '1em', width: '75%', mx: 'auto' }}
        />
        {contract.isBargaining ? (
          <Box
            data-testid="ContractBid-ContractorInfo__StaticWrapper"
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Typography
              data-testid="ContractBid-ContractorInfo-Static__Title"
              sx={{
                display: 'inline-flex',
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: 'secondary.main',
                alignItems: 'center',
              }}
            >
              Contractor Info&nbsp;
              <Typography
                data-testid="ContractBid-ContractorInfo-Static__NegotiateStatus"
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  color: 'info.main',
                  ml: '.5em',
                }}
              >
                Non-Negotiable
              </Typography>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography>Contractor Pay</Typography>
                <Box>
                  <TextField
                    size="small"
                    label="Pay Structure"
                    value={contract.payStructure}
                    color="secondary"
                    margin="dense"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" onClick={handlePayStructurePopup}>
                          <HelpOutline color="secondary" fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mr: '.5em',
                    }}
                  />
                  <TextField
                    size="small"
                    label="Default Pay"
                    value={contract.defaultPay}
                    color="secondary"
                    margin="dense"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography color="secondary">¤</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography>Contractors</Typography>
                <Typography>
                  Max Contractors: <Typography>{contract.contractorLimit}</Typography>
                </Typography>
                <Typography>
                  Active Contractors: <Typography>X</Typography>
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography>Locations</Typography>
              <Box
                data-testid="ContractDisplay-Locations__LocationsListWrapper"
                sx={{
                  mb: '.5em',
                  width: '100%',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Box
                    data-testid="ContractDisplay-Locations__StartLocationWrapper"
                    sx={{
                      backgroundColor: 'rgba(14,49,141,.25)',
                      borderRadius: '10px',
                      mx: '.5em',
                      p: '.2em',
                    }}
                  >
                    <Typography
                      data-testid="ContractDisplay-Locations-StartLocation__Title"
                      variant="body2"
                      align="center"
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      Start Location
                    </Typography>
                    <LocationChip locationId="Start" />
                  </Box>
                  <Box
                    data-testid="ContractDisplay-Locations__EndLocationWrapper"
                    sx={{
                      backgroundColor: 'rgba(14,49,141,.25)',
                      borderRadius: '10px',
                      mt: '.5em',
                      mx: '.5em',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      data-testid="ContractDisplay-Locations-StartLocation__Title"
                      variant="body2"
                      align="center"
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      End Location
                    </Typography>
                    <LocationChip locationId="End" />
                  </Box>
                </Box>
                <Box
                  data-testid="ContractDisplay-Locations__OtherLocationsWrapper"
                  sx={{
                    backgroundColor: 'rgba(14,49,141,.25)',
                    borderRadius: '10px',
                    mt: '.5em',
                    mx: '.5em',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    data-testid="ContractDisplay-Locations-StartLocation__Title"
                    variant="body2"
                    align="center"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    Other Locations
                  </Typography>
                  <LocationChip locationId="Other" />
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </VLPopup>
  );
};
