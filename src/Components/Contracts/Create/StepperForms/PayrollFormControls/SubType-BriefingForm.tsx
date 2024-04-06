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
  formData: {
    contractType: string;
    subType: string;
    briefing: string;
  };
  onFormChange: (field: string, value: string) => void;
};
// formData set by SubType&BriefingForm = subType, briefing
// Pulls contractType to determine which subType options to display

// SubType options Array
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
  formData,
  onFormChange,
}) => {
  // subType Options Display Controller
  const subTypeDisplay = options.find(
    (opt) => opt.type === formData.contractType,
  )?.subTypes;

  // Pass subType selection to the formData state
  const handleSubTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange('subType', event.target.value);
  };

  // Pass briefing to the formData state
  const handleBriefingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange('briefing', event.target.value);
  };

  return (
    <Box
      data-id="subType-briefing-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '400px',
      }}
    >
      <Box data-id="subTypeandBriefing-form">
        <FormControl sx={{ display: 'flex' }}>
          <FormLabel color="secondary" sx={{ fontWeight: 'bold' }}>
            SubType
          </FormLabel>
          <RadioGroup
            value={formData.subType}
            onChange={handleSubTypeChange}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              mb: '.5em',
            }}
          >
            {subTypeDisplay?.map((subType) => (
              <FormControlLabel
                key={subType.value}
                value={subType.value}
                label={subType.label}
                control={<Radio color="secondary" />}
                sx={{
                  color:
                    formData.subType === subType.value
                      ? 'secondary.main'
                      : 'text.secondary',
                }}
              />
            ))}
          </RadioGroup>
          <TextField
            multiline={true}
            rows={4}
            onChange={handleBriefingChange}
            label="Briefing"
            color="secondary"
            fullWidth
          />
        </FormControl>
      </Box>
    </Box>
  );
};
