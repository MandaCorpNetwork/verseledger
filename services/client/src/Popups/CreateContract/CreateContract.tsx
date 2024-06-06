import {
  AccessTime,
  Group,
  Payments,
  SatelliteAlt,
  Subtitles,
} from '@mui/icons-material';
import { Box, Step, StepConnector, StepLabel, Stepper } from '@mui/material';
import { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import React, { useCallback, useState } from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { ContractDetails } from './pages/ContractDetails';
import { Contractors } from './pages/Contractors';
import { Locations } from './pages/Locations';
import { Payroll } from './pages/Payroll';
import { TimeInformation } from './pages/TimeInformation';

//import { FleetForm } from './StepperForms/FleetForm';

export const POPUP_CREATE_CONTRACT = 'contracts_create';

const steps = [
  { label: 'Contract Details', icon: <Subtitles /> },
  { label: 'Time Information', icon: <AccessTime /> },
  { label: 'Locations', icon: <SatelliteAlt /> },
  { label: 'Contractors', icon: <Group /> },
  { label: 'Payroll', icon: <Payments /> },
];

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
export const CreateContractPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(3);
  const onSubmit = useCallback(() => {
    if (page >= 4) dispatch(closePopup(POPUP_CREATE_CONTRACT));
    setPage(Math.min(page + 1, steps.length));
  }, [page]);
  const onCancel = useCallback(() => {
    setPage(Math.max(page - 1, 0));
  }, [page]);
  const [formData, setFormData] = useState<IContract>({
    locations: [] as string[],
  } as IContract);
  const isSubmitEnabled = React.useMemo(() => {
    console.log(formData);
    switch (page) {
      default:
      case 0:
        return (
          formData.title != null &&
          formData.title.trim() != '' &&
          formData.briefing != null &&
          formData.briefing.trim() != '' &&
          formData.subtype != null &&
          formData.subtype.trim() != ''
        );
      case 1:
        return true;
      case 2:
        return formData.locations != null && formData.locations.length != 0;
      case 3:
        return true;
      case 4:
    }
    return false;
  }, [formData, page]);
  return (
    <VLPopup
      minWidth="800px"
      data-testid="form"
      state={page}
      name={POPUP_CREATE_CONTRACT}
      title="Create Contract"
      onCancel={onCancel}
      cancelText="Back"
      cancelDisabled={page <= 0}
      onSubmit={onSubmit}
      submitDisabled={!isSubmitEnabled}
      submitText={page >= 4 ? 'Send' : 'Next'}
    >
      <Box data-testid="ContractForm__Container-Stepper">
        <Stepper activeStep={page} connector={<ColorlibConnector />} alternativeLabel>
          {steps.map((step) => {
            return (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={(props) => (
                    <ColorlibStepIconRoot
                      ownerState={{ completed: props.completed, active: props.active }}
                      className={props.className}
                    >
                      {step.icon}
                    </ColorlibStepIconRoot>
                  )}
                >
                  {step.label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {page === 0 && <ContractDetails formData={formData} setFormData={setFormData} />}
        {page === 1 && <TimeInformation formData={formData} setFormData={setFormData} />}
        {page === 2 && <Locations formData={formData} setFormData={setFormData} />}
        {page === 3 && <Contractors formData={formData} setFormData={setFormData} />}
        {page === 4 && <Payroll formData={formData} setFormData={setFormData} />}
      </Box>
    </VLPopup>
  );
};
