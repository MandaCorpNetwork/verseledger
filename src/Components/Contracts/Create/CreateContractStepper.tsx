import {
  AccessTime,
  Close,
  Gamepad,
  Group,
  NavigateBefore,
  NavigateNext,
  Payments,
  Rocket,
  SatelliteAlt,
  Send,
  Subtitles,
  Title,
} from '@mui/icons-material';
import {
  Box,
  Step,
  StepButton,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import { ContractorsForm } from './ContractorsForrm';
import { ContractTypeForm } from './StepperForms/ContractTypeForm';
import { FleetForm } from './StepperForms/FleetForm';
import { LocationsForm } from './StepperForms/LocationsForm';
import { PayrollForm } from './StepperForms/PayrollForm';
import { SubTypeBriefingForm } from './StepperForms/SubType-BriefingForm';
import { TimeInfoForm } from './StepperForms/TimeInfoForm';
import { TitleForm } from './StepperForms/TitleForm';

type CreateContractStepperProps = {
  passClose: () => void;
  passSubmit: () => void;
};

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient( 95deg,rgb(24,252,252) 0%,rgb(121,192,244) 50%,rgb(6,86,145) 100%)`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient( 95deg,rgb(24,252,252) 0%,rgb(121,192,244) 50%,rgb(6,86,145) 100%)`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#065691',
    backgroundImage:
      'linear-gradient( 136deg, rgb(6,86,145) 0%, rgb(8,29,68) 50%, rgb(0,1,19) 100%)',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
  backgroundColor: '#065691',
  backgroundImage:
    'linear-gradient( 136deg, rgb(6,86,145) 0%, rgb(8,29,68) 50%, rgb(0,1,19) 100%)',
  zIndex: 1,
  color: '#79C0F4',
  width: 45,
  height: 45,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '.1em',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(24,252,252) 0%, rgb(121,192,244) 50%, rgb(6,86,145) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    color: '#d3fafe',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(24,252,252) 0%, rgb(121,192,244) 50%, rgb(6,86,145) 100%)',
    color: '#d3fafe',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <Gamepad />,
    2: <Subtitles />,
    3: <AccessTime />,
    4: <SatelliteAlt />,
    5: <Rocket />,
    6: <Group />,
    7: <Payments />,
    8: <Title />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const createSteps = [
  'Contract Type',
  'SubType & Briefing',
  'Time Information',
  'Locations',
  'Fleet',
  'Contractors',
  'Payroll',
  'Title',
];

const CancleCreateIcon: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Close />
      <Typography>Cancel</Typography>
    </Box>
  );
};

const NextIcon: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography sx={{}}>Next</Typography>
      <NavigateNext />
    </Box>
  );
};

type BackIconProps = {
  isDisabled: boolean;
};

const BackIcon: React.FC<BackIconProps> = ({ isDisabled }) => {
  const textColor = isDisabled ? 'text.disabled' : 'text.primary';
  const iconColor = isDisabled ? 'disabled' : 'inherit';

  return (
    <Box sx={{ display: 'flex' }}>
      <NavigateBefore color={iconColor} />
      <Typography sx={{ color: `${textColor}` }}>Back</Typography>
    </Box>
  );
};

const SubmitIcon: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography>Submit</Typography>
      <Send />
    </Box>
  );
};

export const CreateContractStepper: React.FC<CreateContractStepperProps> = ({
  passClose,
  passSubmit,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isLastStep = activeStep === createSteps.length - 1;

  const [selectedType, setSelectedType] = React.useState('');

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const getStepComponent = (step: number) => {
    switch (step) {
      case 0:
        return <ContractTypeForm typeSelect={handleTypeSelect} />;
      case 1:
        return <SubTypeBriefingForm selectedType={selectedType} />;
      case 2:
        return <TimeInfoForm />;
      case 3:
        return <LocationsForm />;
      case 4:
        return <FleetForm />;
      case 5:
        return <ContractorsForm />;
      case 6:
        return <PayrollForm />;
      case 7:
        return <TitleForm />;
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {createSteps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mb: '1em' }}>{getStepComponent(activeStep)}</Box>
      <Box sx={{ display: 'flex', mt: '1em' }}>
        <StepButton onClick={passClose} icon={<CancleCreateIcon />} />
        <StepButton
          onClick={handleBack}
          disabled={activeStep === 0}
          icon={<BackIcon isDisabled={activeStep === 0} />}
        />
        {!isLastStep ? (
          <StepButton onClick={handleNext} icon={<NextIcon />} />
        ) : (
          <StepButton onClick={passSubmit} icon={<SubmitIcon />} />
        )}
      </Box>
    </Box>
  );
};
