import { LoadingWheel } from '@Common/LoadingObject/LoadingWheel';
import { LoadingButton } from '@mui/lab';

type FormLoadingButtonProps = {
  label: string;
  size?: 'small' | 'medium' | 'large';
  loading: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export const FormLoadingButton: React.FC<FormLoadingButtonProps> = (props) => {
  const { label, size = 'medium', loading, onClick, disabled } = props;
  return (
    <LoadingButton
      size={size}
      variant="outlined"
      loading={loading}
      onClick={onClick}
      loadingPosition="center"
      loadingIndicator={<LoadingWheel logoSize={20} wheelSize={35} />}
      color="secondary"
      disabled={disabled}
    >
      {label}
    </LoadingButton>
  );
};
