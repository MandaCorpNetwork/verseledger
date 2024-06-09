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
  ArrowLeft,
  ArrowRight,
  Explore,
  Factory,
  HelpOutline,
  LocalHospital,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { POPUP_PAY_STRUCTURES } from '@Popups/Info/PayStructures';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { postContractBid } from '@Redux/Slices/Contracts/actions/postContractBid';
import { closePopup, openPopup } from '@Redux/Slices/Popups/popups.actions';
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
  const [negotiateForm] = React.useState<Array<unknown> | null>(null);
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

  const handleSubmitBid = React.useCallback(() => {
    if (negotiateForm == null) {
      dispatch(postContractBid(contract.id));
    }
    dispatch(closePopup(POPUP_SUBMIT_CONTRACT_BID));
    return;
  }, []);

  return (
    <VLPopup
      name={POPUP_SUBMIT_CONTRACT_BID}
      title="Submit Bid"
      submitText="Submit Bid"
      onSubmit={handleSubmitBid}
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
            <Box
              data-testid="ContractBid-ContractorInfo-Static__TopContainer"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <Box
                data-testid="ContractBid-ContractorInfo-Static__PayWrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  data-testid="ContractBid-ContractorInfo-Static__PayTitle"
                  variant="body2"
                  align="center"
                  sx={{ fontWeight: 'bold', color: 'text.secondary' }}
                >
                  Contractor Pay
                </Typography>
                <Box
                  data-testid="ContractBid-ContractorInfo-Static__PayStructureWrapper"
                  sx={{
                    mx: 'auto',
                  }}
                >
                  <TextField
                    data-testid="ContractBid-ContractorInfo-Static__PayStructure"
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
                      maxWidth: '130px',
                    }}
                  />
                </Box>
                <Box data-testid="ContractBid-ContractorInfo-Static__DefaultPayWrapper">
                  <TextField
                    data-testid="ContractBid-ContractorInfo-Static__DefaultPay"
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
                    sx={{
                      maxWidth: '130px',
                    }}
                  />
                </Box>
              </Box>
              <Box
                data-testid="ContractBid-ContractorInfo-Static__ContractorsWrapper"
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <Typography
                  data-testid="ContractBid-ContractorInfo-Static-Contractors__Title"
                  variant="body2"
                  align="center"
                  sx={{ fontWeight: 'bold', color: 'text.secondary' }}
                >
                  Contractors
                </Typography>
                <Typography
                  data-testid="ContractBid-ContractorInfo-Static-Contractors__MaxContractors__Title"
                  variant="body2"
                  align="center"
                  sx={{
                    display: 'inline-flex',
                    fontWeight: 'bold',
                    fontSize: '.80em',
                    color: 'text.secondary',
                    alignItems: 'center',
                    mt: '.5em',
                  }}
                >
                  Max Contractors:&nbsp;
                  <Typography
                    data-testid="ContractBid-ContractorInfo-Static-Contractors__MaxContractors__Count"
                    variant="body2"
                    sx={{
                      fontWeight: 'bold',
                      color: 'secondary.main',
                    }}
                  >
                    {contract.contractorLimit}
                  </Typography>
                </Typography>
                <Typography
                  data-testid="ContractBid-ContractorInfo-Static-Contractors__ActiveContractors__Title"
                  variant="body2"
                  align="center"
                  sx={{
                    display: 'inline-flex',
                    fontWeight: 'bold',
                    fontSize: '.80em',
                    color: 'text.secondary',
                    alignItems: 'center',
                    mt: '.5em',
                  }}
                >
                  Active Contractors:&nbsp;
                  <Typography
                    data-testid="ContractBid-ContractorInfo-Static-Contractors__ActiveContractors__Count"
                    variant="body2"
                    sx={{
                      fontWeight: 'bold',
                      color: 'secondary.main',
                    }}
                  >
                    X
                  </Typography>
                </Typography>
              </Box>
            </Box>
            <Box
              data-testid="ContractBid-ContractorInfo-Static__LocationsWrapper"
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <Typography
                data-testid="ContractBid-ContractorInfo-Static-Locations__Title"
                variant="body2"
                align="center"
                sx={{ fontWeight: 'bold', color: 'text.secondary' }}
              >
                Locations
              </Typography>
              <Box
                data-testid="ContractBid-ContractorInfo-Static-Locations__ListWrapper"
                sx={{
                  mt: '.5em',
                  width: '100%',
                }}
              >
                <Box
                  data-testid="ContractBid-ContractorInfo-Static-Locations__TopContainer"
                  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
                >
                  <Box
                    data-testid="ContractBid-ContractorInfo-Static-Locations__StartWrapper"
                    sx={{
                      backgroundColor: 'rgba(14,49,141,.25)',
                      borderRadius: '10px',
                      mx: '.5em',
                      p: '.2em',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      data-testid="ContractBid-ContractorInfo-Static-Locations-Start__Title"
                      variant="body2"
                      align="center"
                      sx={{
                        color: 'text.secondary',
                      }}
                    >
                      Start Location
                    </Typography>
                    <Box
                      data-testid="ContractBid-ContractorInfo-Static-Locations-Start__ChipWrapper"
                      sx={{ mx: 'auto' }}
                    >
                      <LocationChip locationId="Start" />
                    </Box>
                  </Box>
                  <Box
                    data-testid="ContractBid-ContractorInfo-Static-Locations__EndWrapper"
                    sx={{
                      backgroundColor: 'rgba(14,49,141,.25)',
                      borderRadius: '10px',
                      p: '.2em',
                      mx: '.5em',
                      justifyContent: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      data-testid="ContractBid-ContractorInfo-Static-Locations-End__Title"
                      variant="body2"
                      align="center"
                      sx={{
                        color: 'text.secondary',
                      }}
                    >
                      End Location
                    </Typography>
                    <Box
                      data-testid="ContractBid-ContractorInfo-Static-Locations-End__ChipWrapper"
                      sx={{ mx: 'auto' }}
                    >
                      <LocationChip locationId="End" />
                    </Box>
                  </Box>
                </Box>
                <Box
                  data-testid="ContractBid-ContractorInfo-Static-Locations__OtherContainer"
                  sx={{
                    mt: '.5em',
                    mx: '.5em',
                  }}
                >
                  <Box
                    data-testid="ContractBid-ContractorInfo-Static-Locations-Other__Wrapper"
                    sx={{
                      backgroundColor: 'rgba(14,49,141,.25)',
                      borderRadius: '10px',
                      justifyContent: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      maxWidth: '75%',
                      mx: 'auto',
                      p: '.2em',
                    }}
                  >
                    <Typography
                      data-testid="ContractBid-ContractorInfo-Static-Other__Title"
                      variant="body2"
                      align="center"
                      sx={{
                        color: 'text.secondary',
                        mb: '.2em',
                      }}
                    >
                      Other Locations
                    </Typography>
                    <Box
                      data-testid="ContractBid-ContractorInfo-Static-Other__ListWrapper"
                      sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}
                    >
                      <IconButton
                        data-testid="ContractBid-ContractorInfo-Static-Locations-List__BackButton"
                        size="small"
                        sx={{
                          ml: '1em',
                        }}
                      >
                        <ArrowLeft />
                      </IconButton>
                      <Box
                        data-testid="ContractBid-ContractorInfo-Static-Other__ChipWrapper"
                        sx={{ mx: 'auto', display: 'inline-flex', alignItems: 'center' }}
                      >
                        <Typography
                          data-testid="ContractBid-ContractorInfo-Static-Other__Index"
                          variant="body2"
                          sx={{ color: 'text.secondary' }}
                        >
                          X.&nbsp;
                        </Typography>
                        <LocationChip locationId="Other" />
                      </Box>
                      <IconButton
                        data-testid="ContractBid-ContractorInfo-Static-Locations-List__ForwardButton"
                        size="small"
                        sx={{
                          mr: '1em',
                        }}
                      >
                        <ArrowRight />
                      </IconButton>
                    </Box>
                  </Box>
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
