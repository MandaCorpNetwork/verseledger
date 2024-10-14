import { AccessTime, Group, Payments, Subtitles } from '@mui/icons-material';
import {
  Box,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  styled,
} from '@mui/material';
import { ContractDetails } from '@Popups/Contracts/CreateContract/pages/ContractDetails';
import { Contractors } from '@Popups/Contracts/CreateContract/pages/Contractors';
import { Payroll } from '@Popups/Contracts/CreateContract/pages/Payroll';
import { TimeInformation } from '@Popups/Contracts/CreateContract/pages/TimeInformation';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { POPUP_YOU_SURE } from '@Popups/VerifyPopup/YouSure';
import { useAppDispatch } from '@Redux/hooks';
import { updateContract } from '@Redux/Slices/Contracts/actions/patch/updateContract.action';
import { postContractInvite } from '@Redux/Slices/Contracts/actions/post/postContractInvite.action';
import { closePopup, openPopup } from '@Redux/Slices/Popups/popups.actions';
import { Logger } from '@Utils/Logger';
import { enqueueSnackbar } from 'notistack';
import React, { useCallback, useState } from 'react';
import { IContract, ICreateContractBody } from 'vl-shared/src/schemas/ContractSchema';

export const POPUP_EDIT_CONTRACT = 'contracts_edit';

const steps = [
  { label: 'Contract Details', icon: <Subtitles /> },
  { label: 'Time Information', icon: <AccessTime /> },
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

export type EditContractPopupProps = {
  contract: IContract;
};

export const EditContractPopup: React.FC<EditContractPopupProps> = ({ contract }) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState<Partial<ICreateContractBody>>({
    title: contract.title,
    subtype: contract.subtype,
    briefing: contract.briefing,
    bidDate: contract.bidDate,
    startDate: contract.startDate,
    endDate: contract.endDate,
    isEmergency: contract.isEmergency,
    ratingLimit: contract.ratingLimit,
    contractorLimit: contract.contractorLimit,
    payStructure: contract.payStructure,
    isBargaining: contract.isBargaining,
    isBonusPay: contract.isBonusPay,
    defaultPay: contract.defaultPay,
    status: contract.status,
  });

  const handleClose = useCallback(() => {
    dispatch(
      openPopup(POPUP_YOU_SURE, {
        title: 'Cancel Contract Editing',
        subjectText: 'Contract Editing',
        bodyText: 'Any progress will be lost',
        onAccept: () => dispatch(closePopup(POPUP_EDIT_CONTRACT)),
        clickAway: true,
        testid: 'EditContractPopup',
      }),
    );
  }, [dispatch]);

  const [invites, setInvites] = useState<User[]>([]);

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
        return formData.contractorLimit != null && formData.contractorLimit != 0;
      case 3:
        return (
          formData.payStructure != null &&
          formData.defaultPay != null &&
          formData.defaultPay != 0 &&
          formData.defaultPay != undefined
        );
    }
    return false;
  }, [formData, page]);

  const onSubmit = React.useCallback(() => {
    if (page >= 3) {
      Logger.info(`Contract Data Passed To Action: ${JSON.stringify(formData)}`);
      if (formData.subtype === undefined || formData.subtype === null) {
        Logger.error('Contract Missing Subtype');
        return;
      }
      dispatch(closePopup(POPUP_EDIT_CONTRACT));
      dispatch(
        updateContract({
          contractId: contract.id,
          contractRaw: formData as Partial<IContract>,
        }),
      ).then((res) => {
        if ((res.payload as { __type: string }).__type === 'Contract') {
          invites.forEach((invite) => {
            dispatch(postContractInvite({ contractId: contract.id, userId: invite.id }));
          });
          enqueueSnackbar('Contract Updated', { variant: 'success' });
        } else {
          enqueueSnackbar('Contract Update Failed', { variant: 'error' });
        }
      });
    }
    setPage(Math.min(page + 1, steps.length));
  }, [page, formData, dispatch, contract.id, invites]);

  const onCancel = React.useCallback(() => {
    if (page == 0) {
      return handleClose();
    }
    setPage(Math.max(page - 1, 0));
  }, [handleClose, page]);
  return (
    <VLPopup
      minWidth="800px"
      data-testid="form"
      state={page}
      onClose={handleClose}
      name={POPUP_EDIT_CONTRACT}
      title="Edit Contract"
      onCancel={onCancel}
      cancelText={page <= 0 ? 'Cancel' : 'Back'}
      onSubmit={onSubmit}
      submitText={page >= 3 ? 'Submit' : 'Next'}
      submitDisabled={!isSubmitEnabled}
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
        {page === 2 && (
          <Contractors
            formData={formData}
            setFormData={setFormData}
            invites={invites}
            setInvites={setInvites}
          />
        )}
        {page === 3 && <Payroll formData={formData} setFormData={setFormData} />}
      </Box>
    </VLPopup>
  );
};
