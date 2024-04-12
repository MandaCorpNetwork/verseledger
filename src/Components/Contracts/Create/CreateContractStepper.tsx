import {
  AccessTime,
  ArrowBackIos,
  ArrowForwardIos,
  Cancel,
  Group,
  Payments,
  SatelliteAlt,
  Send,
  Subtitles,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
} from '@mui/material';
import { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import { ContractorsForm } from './ContractorsForm';
import { SubTypeBriefingForm } from './StepperForms/ContractDetailsForm';
//import { FleetForm } from './StepperForms/FleetForm';
import { LocationsForm } from './StepperForms/LocationsForm';
import { PayrollForm } from './StepperForms/PayrollForm';
import { TimeInfoForm } from './StepperForms/TimeInfoForm';

type CreateContractStepperProps = {
  passClose: () => void;
  passSubmit: () => void;
};

// Stepper Component Line Styling
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

// Stepper Component Icon Styling
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

// Stepper Component Icon Controller
function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <Subtitles />,
    2: <AccessTime />,
    3: <SatelliteAlt />,
    4: <Group />,
    5: <Payments />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

// Create Contract Form Pages
const createSteps = [
  'Contract Details',
  'Time Information',
  'Locations',
  'Contractors',
  'Payroll',
];

export const CreateContractStepper: React.FC<CreateContractStepperProps> = ({
  passClose,
  passSubmit,
}) => {
  const [contractData, setContractData] = React.useState({
    subtypeTag: [],
    briefing: '',
    bidEnd: null,
    startDate: null,
    endDate: null,
    emergency: false,
    locations: [],
    minRating: 0,
    maxContractors: null,
    contractorInvitees: [],
    allowBiddingAfterDeadline: false,
    bonusPay: false,
    allowBargaining: false,
    payrollStructure: '',
    payAmount: 0,
    contractTitle: '',
  });
  // Create Contract Form Data State

  const handleContractDataChange = (
    field: keyof typeof contractData,
    value: boolean | string | number | Date | Array,
  ) => {
    setContractData((prev) => ({ ...prev, [field]: value }));
  };
  // Handle Form Simple Data Change

  const [activeStep, setActiveStep] = React.useState(0);
  // Check Current Step

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  // Next Step Controller

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  // Back Step Controller

  const isLastStep = activeStep === createSteps.length - 1;
  // Check if the stepper is at the last step for the submit button

  // Create Contract Stepper Switch
  const getStepComponent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <SubTypeBriefingForm
            formData={contractData}
            onFormChange={handleContractDataChange}
          />
        );
      case 1:
        return (
          <TimeInfoForm formData={contractData} onFormChange={handleContractDataChange} />
        );
      case 2:
        return (
          <LocationsForm
            formData={contractData}
            onFormChange={handleContractDataChange}
          />
        );
      case 3:
        return (
          <ContractorsForm
            formData={contractData}
            onFormChange={handleContractDataChange}
          />
        );
      case 4:
        return (
          <PayrollForm formData={contractData} onFormChange={handleContractDataChange} />
        );
    }
  };

  return (
    <Box
      data-testid="CreateContractForm__Container"
      sx={{
        width: '100%',
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stepper
        data-id="CreateContractStepper"
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        sx={{
          mb: 'auto',
        }}
      >
        {createSteps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        data-id="CreateContractStepContainer"
        sx={{
          mb: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '2px solid',
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          borderRadius: '6px',
          padding: '1em',
          bgcolor: 'rgba(0, 1, 19, .25)',
        }}
      >
        {getStepComponent(activeStep)}
      </Box>
      <Box sx={{ display: 'flex', mt: '1em', width: '100%' }}>
        <Button
          data-testid="CreateContract-Cancel_Button"
          variant="contained"
          onClick={passClose}
          endIcon={<Cancel />}
          sx={{
            mr: 'auto',
            borderLeft: '3px solid',
            borderRight: '3px solid',
            borderColor: 'secondary.main',
            borderRadius: '5px',
          }}
        >
          Cancel
        </Button>
        <Button
          data-testid="CreateContract-Back_Button"
          variant="contained"
          onClick={handleBack}
          startIcon={<ArrowBackIos />}
          disabled={activeStep === 0}
          sx={{
            mr: '1em',
            borderLeft: '3px solid',
            borderRight: '3px solid',
            borderColor: 'secondary.main',
            borderRadius: '5px',
          }}
        >
          Back
        </Button>
        {!isLastStep ? (
          <Button
            data-testid="CreateContract-Next_Button"
            variant="contained"
            onClick={handleNext}
            endIcon={<ArrowForwardIos />}
            sx={{
              borderLeft: '3px solid',
              borderRight: '3px solid',
              borderColor: 'secondary.main',
              borderRadius: '5px',
            }}
          >
            Next
          </Button>
        ) : (
          <Button
            data-testid=""
            variant="contained"
            onClick={passSubmit}
            endIcon={<Send />}
            sx={{
              borderLeft: '3px solid',
              borderRight: '3px solid',
              borderColor: 'secondary.main',
              borderRadius: '5px',
            }}
          >
            Submit
          </Button>
        )}
      </Box>
    </Box>
  );
};
