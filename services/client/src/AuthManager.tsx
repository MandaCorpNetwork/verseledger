import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { updateTokens } from '@Redux/Slices/Auth/Actions/updateTokens';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';
import { actions } from '@Redux/Slices/Contracts/contracts.reducer';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { useSubscription } from 'react-stomp-hooks';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

export const AuthManager: React.FC = () => {
  const dispatch = useAppDispatch();

  useSubscription('/topic/newContract', (message) => {
    const contract = JSON.parse(message.body) as IContract;
    dispatch(actions.insert(contract));
    enqueueSnackbar({
      variant: 'info',
      message: `New ${contract.subtype} Contract "${contract.title}"`,
    });
  });
  const currentUser = useAppSelector(selectCurrentUser);

  useSubscription(`/topic/notifications-${currentUser?.id ?? 'global'}`, (message) => {
    const contract = JSON.parse(message.body);
    enqueueSnackbar({
      variant: 'info',
      message: `message: ${contract}`,
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
