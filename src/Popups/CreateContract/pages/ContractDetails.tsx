import { Autocomplete, Box, FormControl, FormLabel, TextField } from '@mui/material';
import React from 'react';

const options = [
  {
    archetype: 'Logistics',
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
    subTypes: [
      {
        label: 'Exploration',
        value: 'Exploration',
      },
    ],
  },
  {
    archetype: 'Proxy',
    subTypes: [
      {
        label: 'Middleman',
        value: 'Middleman',
      },
      {
        label: 'Other',
        value: 'Other',
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
  formData: IContract;
  setFormData: React.Dispatch<React.SetStateAction<IContract>>;
}> = (props) => {
  const { formData, setFormData } = props;
  return (
    <Box
      data-testid="subType-briefing-container"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        minWidth: '400px',
      }}
    >
      <Box data-testid="subTypeandBriefing-form">
        <Box>
          <FormControl sx={{ display: 'flex', alignItems: 'left', width: '100%' }}>
            <FormLabel color="secondary" sx={{ fontWeight: 'bold' }}></FormLabel>
            <TextField
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
              groupBy={(option) => optionsMap[option].group}
              getOptionLabel={(option) => optionsMap[option].label}
              renderInput={(params) => (
                <TextField {...params} label="SubType" size="small" />
              )}
              onChange={(_e, newValue) => {
                setFormData({ ...formData, subtype: newValue ?? '' });
              }}
              fullWidth
              sx={{ mt: 2, mb: '1em', maxWidth: '300px' }}
            />
            <TextField
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
              sx={{
                width: '300px',
              }}
            />
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};
