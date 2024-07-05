import {
  FleetIcon,
  LogisticsIcon,
  RRRIcon,
  SalvageIcon,
  SecurityIcon,
} from '@Common/Definitions/CustomIcons';
import { Explore, Factory, LocalHospital, VisibilityOff } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Chip,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';
import { ICreateContractBody } from 'vl-shared/src/schemas/ContractSchema';
import { IContractSubType } from 'vl-shared/src/schemas/ContractSubTypeSchema';

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
const optionsMap: Record<string, { label: string; group: string }> = {};
const flatOptions = options.flatMap((option) =>
  option.subTypes.map((subType) => {
    optionsMap[subType.value] = { group: option.archetype, label: subType.label };
    return subType.value;
  }),
);
export const ContractDetails: React.FC<{
  formData: ICreateContractBody;
  setFormData: React.Dispatch<React.SetStateAction<ICreateContractBody>>;
}> = (props) => {
  const dispatch = useAppDispatch();
  const { formData, setFormData } = props;
  const [archetype, setArchetype] = React.useState<string | null>(null);

  React.useEffect(() => {
    const selectedOption = options.find((option) =>
      option.subTypes.some((subType) => subType.value === formData.subtype),
    );
    if (selectedOption) {
      setArchetype(selectedOption.archetype);
    } else {
      setArchetype(null);
    }
  }, [formData.subtype]);

  const handleArchetypeOpen = () => {
    dispatch(openPopup(POPUP_ARCHETYPE_INFO, { option: archetype }));
  };

  return (
    <Box
      data-testid="subType-briefing-container"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        minWidth: '400px',
        mt: '1em',
      }}
    >
      <Box data-testid="subTypeandBriefing-form">
        <Box>
          <FormControl sx={{ display: 'flex', alignItems: 'left', width: '100%' }}>
            <FormLabel color="secondary" sx={{ fontWeight: 'bold' }}></FormLabel>
            <TextField
              data-testid="CreateContract__Title"
              label="Title"
              color="secondary"
              inputProps={{ maxLength: 32 }}
              fullWidth
              onChange={(e) => setFormData({ ...formData, title: e.currentTarget.value })}
              value={formData.title ?? ''}
              sx={{ maxWidth: '300px' }}
            />
            <Autocomplete
              data-testid="CreateContract__Subtype-AutoComplete"
              options={flatOptions}
              value={formData.subtype}
              groupBy={(option) => optionsMap[option].group}
              getOptionLabel={(option) => optionsMap[option].label}
              renderInput={(params) => (
                <TextField {...params} label="SubType" size="small" />
              )}
              onChange={(_e, newValue) => {
                setFormData({
                  ...formData,
                  subtype: (newValue as IContractSubType) ?? '',
                });
              }}
              fullWidth
              sx={{ mt: 2, mb: '1em', maxWidth: '300px' }}
            />
            <TextField
              data-testid="CreateContract__Briefing"
              multiline={true}
              rows={4}
              onChange={(e) =>
                setFormData({ ...formData, briefing: e.currentTarget.value })
              }
              value={formData.briefing}
              label="Briefing"
              color="secondary"
              fullWidth
              size="small"
              inputProps={{
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
              sx={{
                width: '300px',
              }}
            />
          </FormControl>
        </Box>
      </Box>
      <Box
        data-testid="Archetype__DisplayContainer"
        sx={{
          alignItems: 'center',
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          ml: '1em',
          maxHeight: '100%',
        }}
      >
        <Box
          data-testid="Archetype__DisplayWrapper"
          sx={{
            borderTop: '2px solid',
            borderBottom: '2px solid',
            borderRadius: '5px',
            borderColor: 'secondary.main',
            py: '.5em',
            px: '1em',
          }}
        >
          <Typography sx={{ fontWeight: 'bold', color: 'text.secondary', mb: '.5em' }}>
            Contract Archetype
          </Typography>
          <Box
            data-testid="Archetype__ChipWrapper"
            sx={{
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: '5px',
              p: '.5em',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: '.5em',
            }}
          >
            {!archetype && <Typography>Select SubType</Typography>}
            {archetype && (
              <Chip
                icon={
                  options.find((option) => option.archetype === archetype)?.archetypeIcon
                }
                label={archetype}
                variant="outlined"
                color="secondary"
                onClick={handleArchetypeOpen}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
