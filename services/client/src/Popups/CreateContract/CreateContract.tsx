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
import { POPUP_YOU_SURE } from '@Popups/VerifyPopup/YouSure';
import { useAppDispatch } from '@Redux/hooks';
import { postContractInvite } from '@Redux/Slices/Contracts/actions/post/postContractInvite';
import { postNewContract } from '@Redux/Slices/Contracts/actions/post/postNewContract';
import { closePopup, openPopup } from '@Redux/Slices/Popups/popups.actions';
import { Logger } from '@Utils/Logger';
import { enqueueSnackbar } from 'notistack';
import React, { useCallback, useState } from 'react';
import { IContract, ICreateContractBody } from 'vl-shared/src/schemas/ContractSchema';

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
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState<Partial<ICreateContractBody>>({
    Locations: [],
    isEmergency: false,
    payStructure: 'FLATRATE',
    contractorLimit: 1,
    isBonusPay: false,
    isBargaining: false,
    subtype: null,
  } as unknown as ICreateContractBody);
  const [invites, setInvites] = React.useState<User[]>([]);

  const onSubmit = useCallback(() => {
    if (page >= 4) {
      Logger.info(`Contract Data Passed To Action: ${JSON.stringify(formData)}`);
      if (formData.subtype === undefined || formData.subtype === null) {
        Logger.error('Contract Creator missing Subtype');
        return;
      }
      dispatch(closePopup(POPUP_CREATE_CONTRACT));
      dispatch(postNewContract(formData as ICreateContractBody)).then((res) => {
        if ((res.payload as { __type: string }).__type === 'Contract') {
          invites.forEach((invite) => {
            dispatch(
              postContractInvite({
                contractId: (res.payload as IContract).id,
                userId: invite.id,
              }),
            );
          });
          enqueueSnackbar('Contract Created', {
            variant: 'success',
          });
        } else {
          enqueueSnackbar('Contract Creation Failed', {
            variant: 'error',
          });
        }
      });
    }
    setPage(Math.min(page + 1, steps.length));
  }, [page, formData, invites]);

  const onCancel = useCallback(() => {
    if (page == 0)
      return dispatch(
        openPopup(POPUP_YOU_SURE, {
          title: 'Cancel Contract Creation',
          subjectText: 'Contract Creation',
          bodyText: 'Any progress will be lost',
          onAccept: () => dispatch(closePopup(POPUP_CREATE_CONTRACT)),
          clickaway: true,
          testid: 'CreateContractPopup_Cancel',
        }),
      );
    setPage(Math.max(page - 1, 0));
  }, [page]);

  const isSubmitEnabled = React.useMemo(() => {
    Logger.info(formData);
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
        return formData.Locations != null && formData.Locations?.length != 0;
      case 3:
        return formData.contractorLimit != null && formData.contractorLimit != 0;
      case 4:
        return (
          formData.payStructure != null &&
          formData.defaultPay != null &&
          formData.defaultPay != 0 &&
          formData.defaultPay != undefined
        );
    }
    return false;
  }, [formData, page]);

  return (
    <VLPopup
      minWidth="800px"
      data-testid="form"
      state={page}
      onClose={() => {
        dispatch(
          openPopup(POPUP_YOU_SURE, {
            title: 'Cancel Contract Creation',
            subjectText: 'Contract Creation',
            bodyText: 'Any progress will be lost',
            onAccept: () => dispatch(closePopup(POPUP_CREATE_CONTRACT)),
            clickaway: true,
            testid: 'CreateContractPopup_Cancel',
          }),
        );
        return false;
      }}
      name={POPUP_CREATE_CONTRACT}
      title="Create Contract"
      onCancel={onCancel}
      cancelText={page <= 0 ? 'Cancel' : 'Back'}
      onSubmit={onSubmit}
      submitDisabled={!isSubmitEnabled}
      submitText={page >= 4 ? 'Submit' : 'Next'}
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
        {page === 3 && (
          <Contractors
            formData={formData}
            setFormData={setFormData}
            invites={invites}
            setInvites={setInvites}
          />
        )}
        {page === 4 && <Payroll formData={formData} setFormData={setFormData} />}
      </Box>
    </VLPopup>
  );
};
