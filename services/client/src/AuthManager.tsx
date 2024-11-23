import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { updateTokens } from '@Redux/Slices/Auth/Actions/updateTokens.action';
import { selectCurrentUser } from '@Redux/Slices/Auth/auth.selectors';
import { contractActions } from '@Redux/Slices/Contracts/contracts.reducer';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { useSubscription } from 'react-stomp-hooks';
import { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';
import { IDonation } from 'vl-shared/src/schemas/DonationSchema';

export const AuthManager: React.FC = () => {
  const dispatch = useAppDispatch();

  useSubscription('/topic/newContract', (message) => {
    const contract = JSON.parse(message.body) as IContract;
    dispatch(contractActions.insert(contract));
    enqueueSnackbar({
      variant: 'info',
      message: `New ${contract.subtype} Contract "${contract.title}"`,
    });
  });
  const currentUser = useAppSelector(selectCurrentUser);

  useSubscription(`/topic/notifications/${currentUser?.id ?? 'global'}`, (message) => {
    const contract = JSON.parse(message.body);
    enqueueSnackbar({
      variant: 'info',
      message: `message: ${contract}`,
    });
  });

  useSubscription('/topic/donation', (message) => {
    const donation = JSON.parse(message.body) as IDonation;
    enqueueSnackbar({
      variant: 'success',
      message: `Thank you ${donation.display_name} for donating ${(donation.cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} to the team!`,
      autoHideDuration: 10_000,
      action: (key) => {
        return (
          <IconButton onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        );
      },
    });
  });

  const checkKeys = useCallback(() => {
    Logger.info('Checking Keys...');
    const accessToken = AuthUtil.getAccessToken();
    const refreshToken = AuthUtil.getRefreshToken();
    if (!AuthUtil.isRefreshToken(refreshToken)) return; // Nothing can be done without a refresh token

    if (!AuthUtil.isValidToken(accessToken)) {
      dispatch(updateTokens());
      return;
    }
    const accessTokenContents = AuthUtil.getAccessTokenContents()!;
    if (accessTokenContents.exp * 1000 - Date.now() <= 1000 * 60 * 20) {
      dispatch(updateTokens());
    }
  }, [dispatch]);

  useEffect(() => {
    checkKeys();
    const interval = setInterval(checkKeys, 1000 * 60);
    return () => clearInterval(interval);
  }, [dispatch, checkKeys]);

  return <></>;
};
