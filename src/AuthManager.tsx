import { useAppDispatch } from '@Redux/hooks';
import { updateTokens } from '@Redux/Slices/Auth/Actions/updateTokens';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import { useCallback, useEffect } from 'react';

export const AuthManager: React.FC = () => {
  const dispatch = useAppDispatch();
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
  }, []);
  useEffect(() => {
    checkKeys();
    const interval = setInterval(checkKeys, 1000 * 60);
    return () => clearInterval(interval);
  }, []);
  return <></>;
};
