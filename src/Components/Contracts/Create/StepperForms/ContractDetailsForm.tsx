import {
  Autocomplete,
  Box,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
// import ArchetypeDisplay from '@/Common/ArchetypeDisplayBox';

type ContractDetailsForm = {
  formData: {
    subTypeTag: string;
    briefing: string;
    title: string;
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

export const SubTypeBriefingForm: React.FC<ContractDetailsForm> = ({
  formData,
  onFormChange,
}) => {
  const flatOptions = options.flatMap((option) =>
    option.subTypes.map((subType) => ({
      label: subType.label,
      group: option.type,
    })),
  );

  // Pass subType selection to the formData state
  const handleSubTypeChange = (
    event: React.SyntheticEvent,
    newValue: { label: string; group: string }[],
  ) => {
    const selectedSubTypes = newValue.map((item) => item.label);
    onFormChange('subTypeTag', selectedSubTypes.join(', '));
  };

  const renderSelectedGroups = () => {
    const selectedLabels = formData.subTypeTag ? formData.subTypeTag.split(', ') : [];
    const selectedGroups = flatOptions
      .filter((option) => selectedLabels.includes(option.label))
      .map((option) => option.group);
    const uniqueGroups = Array.from(new Set(selectedGroups));

    return uniqueGroups.map((group, index) => (
      <Box
        key={index}
        sx={{
          borderLeft: '2px solid',
          borderRight: '2px solid',
          borderColor: 'primary.main',
          borderRadius: '5px',
          pl: '.5em',
          pr: '.5em',
          mb: '.5em',
          backgroundColor: 'rgba(33, 150, 243, .1)',
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: 'bold', color: 'text.secondary', textAlign: 'center' }}
        >
          {group}
        </Typography>
      </Box>
    ));
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
        flexDirection: 'row',
        minWidth: '400px',
      }}
    >
      <Box
        data-id="TypeDisplay_Container"
        sx={{
          width: '200px',
          borderTop: '2px solid',
          borderBottom: '2px solid',
          borderRadius: '10px',
          borderColor: 'secondary.main',
          display: 'flex',
          flexDirection: 'column',
          ml: '1em',
          mr: '1.5em',
          pt: '.5em',
          pb: '.5em',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ color: 'secondary.main', mb: '.5em' }}>
          Contract Types
        </Typography>
        <Box data-id="TypeDisplay_ScrollBox">{renderSelectedGroups()}</Box>
      </Box>
      <Box data-id="subTypeandBriefing-form">
        <Box>
          <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
            <FormLabel color="secondary" sx={{ fontWeight: 'bold' }}></FormLabel>
            <TextField
              label="Title"
              color="secondary"
              inputProps={{ maxLength: 32 }}
              sx={{ maxWidth: '250px' }}
            />
            <Autocomplete
              multiple
              limitTags={3}
              data-testid="CreateContract__Subtype-AutoComplete"
              options={flatOptions}
              groupBy={(option) => option.group}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="SubType" size="small" />
              )}
              onChange={(event, newValue) => {
                handleSubTypeChange(event, newValue);
              }}
              value={
                formData.subTypeTag
                  ? flatOptions.filter((option) =>
                      formData.subTypeTag.split(', ').includes(option.label),
                    )
                  : []
              }
              fullWidth
              sx={{ mt: 2, mb: '1em', maxWidth: '300px' }}
            />
            <TextField
              multiline={true}
              rows={4}
              onChange={handleBriefingChange}
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
