import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

type SubTypeBriefingFormProps = {
  selectedType: string;
};

const options = [
  {
    type: 'Logistics',
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
    type: 'Medical',
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
    type: 'Security',
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
    type: 'Salvage',
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
    type: 'Industry',
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
    type: 'RRR',
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
    type: 'Fleet',
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
    type: 'Exploration',
    subTypes: [
      {
        label: 'Exploration',
        value: 'Exploration',
      },
    ],
  },
  {
    type: 'Proxy',
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

export const SubTypeBriefingForm: React.FC<SubTypeBriefingFormProps> = ({
  selectedType,
}) => {
  const subTypeDisplay = options.find((opt) => opt.type === selectedType)?.subTypes;

  return (
    <Box>
      <FormLabel>SubType & Briefing</FormLabel>
      <Box>
        <FormControl>
          <FormLabel>SubType</FormLabel>
          <RadioGroup>
            {subTypeDisplay?.map((subType) => (
              <FormControlLabel
                key={subType.value}
                value={subType.value}
                label={subType.label}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <FormLabel>Briefing</FormLabel>
        <TextField multiline={true} rows={5} />
      </Box>
    </Box>
  );
};
