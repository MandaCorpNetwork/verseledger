import { AccessTime, Group, Payments, Subtitles } from '@mui/icons-material';
import { Box, StepConnector, stepConnectorClasses, styled } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { useState } from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

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
  const [formData, setFormData] = useState<Partial<IContract>>({
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
  });
  return (
    <VLPopup
      data-testid="form"
      state={page}
      onClose={() => {}}
      name={POPUP_EDIT_CONTRACT}
      title="Edit Contract"
    >
      <Box>Test</Box>
    </VLPopup>
  );
};
