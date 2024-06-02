import {
  FleetIcon,
  LogisticsIcon,
  RRRIcon,
  SalvageIcon,
  SecurityIcon,
} from '@Common/Definitions/CustomIcons';
import { Explore, Factory, LocalHospital, VisibilityOff } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';

export type ArchetypeInfoProps = {
  option: string;
  testid: string;
};

export const POPUP_ARCHETYPE_INFO = 'archetypeInfo';

const archetypes = [
  {
    archetype: 'Logistics',
    archetypeIcon: <LogisticsIcon color="secondary" fontSize="large" />,
    description: 'This Archetype covers moving things about the Verse.',
    subTypes: [
      {
        label: 'Transport',
        value: 'Transport',
        description: 'Taxi Driver Gameplay.',
      },
      {
        label: 'Hauling',
        value: 'Hauling',
        description: 'Transporting cargo.',
      },
      {
        label: 'Manage',
        value: 'Manage',
        description: 'Managing Cargo operations in varying capacities.',
      },
    ],
  },
  {
    archetype: 'Medical',
    archetypeIcon: <LocalHospital color="secondary" fontSize="large" />,
    description: 'This Archetype covers Medical Gameplay.',
    subTypes: [
      {
        label: 'Trauma',
        value: 'Trauma',
        description: 'Rescue operations.',
      },
      {
        label: 'On-Call',
        value: 'On-Call',
        description: 'Stand-by mode for Medical Teams coming in to assist.',
      },
    ],
  },
  {
    archetype: 'Security',
    archetypeIcon: <SecurityIcon color="secondary" fontSize="large" />,
    description: 'This Archetype covers Combat Gameplay',
    subTypes: [
      {
        label: 'Escort',
        value: 'Escort',
        description: 'Security detail for protecting Assets in Transit.',
      },
      {
        label: 'Bounty',
        value: 'Bounty',
        description: 'Player Hunting.',
      },
      {
        label: 'Quick Reaction Force',
        value: 'QRF',
        description: 'Stand-by mode for Security Force coming in to assist.',
      },
      {
        label: 'Asset Protection',
        value: 'Asset-Protection',
        description: 'Security detail for protecting Stationary Assets',
      },
      {
        label: 'Attache',
        value: 'Attache',
        description: 'Assistance in Combat Operations.',
      },
    ],
  },
  {
    archetype: 'Salvage',
    archetypeIcon: <SalvageIcon color="secondary" fontSize="large" />,
    description: 'This Archetype covers Salvaging Gameplay.',
    subTypes: [
      {
        label: 'Collection',
        value: 'Collection',
        description: 'Assistance in collecting Salvage.',
      },
      {
        label: 'Procurement',
        value: 'Procurement',
        description: 'Assistance in Creating or Locating Salvage.',
      },
    ],
  },
  {
    archetype: 'Industry',
    archetypeIcon: <Factory color="secondary" fontSize="large" />,
    description: 'This Archetype covers Industry Gameplay.',
    subTypes: [
      {
        label: 'Mining',
        value: 'Mining',
        description: 'Assistance with the Mineral & Ore Collection Process',
      },
      {
        label: 'Refining',
        value: 'Refining',
        description: 'Assistance with the Refinement Process.',
      },
      {
        label: 'Manufacturing',
        value: 'Manufacturing',
        description: 'Assistance with the Item Creation Process.',
      },
      {
        label: 'Scouting',
        value: 'Scouting',
        description: 'Assistance with the procurement of Minerals & Ores.',
      },
    ],
  },
  {
    archetype: 'RRR',
    archetypeIcon: <RRRIcon color="secondary" fontSize="large" />,
    description: 'This Archetype covers ',
    subTypes: [
      {
        label: 'Refuel',
        value: 'Refuel',
        description: 'Refueling Assistance.',
      },
      {
        label: 'Rearm',
        value: 'Rearm',
        description: 'Weapon Ammunition Refilling.',
      },
      {
        label: 'Repair',
        value: 'Repair',
        description: 'Repair Services.',
      },
    ],
  },
  {
    archetype: 'Fleet',
    archetypeIcon: <FleetIcon color="secondary" fontSize="large" />,
    description: 'This Archetype covers ',
    subTypes: [
      {
        label: 'Crewman',
        value: 'Crewman',
        description: 'Crew for Large and/or Multiple Ships Gameplay.',
      },
      {
        label: 'Outsourcing',
        value: 'Outsourcing',
        description: 'Hiring Fleets for various Specialized Operations.',
      },
    ],
  },
  {
    archetype: 'Exploration',
    archetypeIcon: <Explore color="secondary" fontSize="large" />,
    description: 'This Archetype covers Information Gathering Gameplay.',
    subTypes: [
      {
        label: 'Locate',
        value: 'Locate',
        description: 'Finding the Location of the Objective(s).',
      },
      {
        label: 'Charting',
        value: 'Charting',
        description: 'Collecting data around a specified Ojective.',
      },
    ],
  },
  {
    archetype: 'Proxy',
    archetypeIcon: <VisibilityOff color="secondary" fontSize="large" />,
    description: 'This Archetype covers Redacted & Specialized Objectives.',
    subTypes: [
      {
        label: 'Middleman',
        value: 'Middleman',
        description: 'Go between Asset for a Specialized and/or Redacted Objective(s).',
      },
      {
        label: 'Redacted',
        value: 'Redacted',
        description: 'Direct Assistance in Redacted Objective(s).',
      },
    ],
  },
];

export const ArchetypeInfoPopup: React.FC<ArchetypeInfoProps> = ({ option, testid }) => {
  const archetype = archetypes.find((archetype) => archetype.archetype === option);

  if (!archetype) {
    return (
      <VLPopup
        name={POPUP_ARCHETYPE_INFO}
        title="Error"
        data-testid={`${testid}__ArchetypeInfoPopupContainer`}
      >
        <Typography>Unknown Archetype</Typography>
      </VLPopup>
    );
  }

  return (
    <VLPopup
      name={POPUP_ARCHETYPE_INFO}
      title={option}
      data-testid={`${testid}__ArchetypeInfoPopupContainer`}
    >
      <Box
        data-testid="ArchetypeInfo__Wrapper"
        sx={{
          borderTop: '2px solid',
          borderBottom: '2px solid',
          borderColor: 'secondary.main',
          borderRadius: '5px',
          padding: '1em',
        }}
      >
        <Box sx={{ justifyContent: 'center', display: 'flex', mb: '1em', mt: '.5em' }}>
          {archetype.archetypeIcon}
        </Box>
        <Box>
          <Typography align="center" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
            Description:
          </Typography>
          <Typography align="center" variant="body2" sx={{ mb: '1em' }}>
            {archetype.description}
          </Typography>
        </Box>
        <Box sx={{ justifyContent: 'center', display: 'flex' }}>
          <Divider sx={{ width: '50%', my: '1em' }} />
        </Box>
        <Typography
          align="center"
          sx={{ color: 'text.secondary', fontWeight: 'bold', fontSize: '1.2em' }}
        >
          SubTypes
        </Typography>
        {archetype.subTypes.map((subType) => (
          <Box
            key={subType.value}
            sx={{ my: '.5em', display: 'flex', alignItems: 'center' }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: 'text.secondary', mr: '.5em', fontWeight: 'bold' }}
            >
              {subType.label}
            </Typography>
            <Typography variant="subtitle2" sx={{ fontSize: '.8em' }}>
              {subType.description}
            </Typography>
          </Box>
        ))}
        <Typography
          variant="subtitle2"
          align="center"
          sx={{
            color: 'info.main',
            fontSize: '.75em',
            maxWidth: '70%',
            mx: 'auto',
            mt: '.5em',
          }}
        >
          Add SubType(s) from the Fleet Archetype with large ships & operations for better
          visability.
        </Typography>
      </Box>
    </VLPopup>
  );
};
