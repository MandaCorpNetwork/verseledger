import { fetchCurrentUser } from '@Redux/Slices/Auth/Actions/fetchCurrentUser.action';
import { loginWithDiscord } from '@Redux/Slices/Auth/Actions/loginWithDiscord.action';
import { AuthUtil } from '@Utils/AuthUtil';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '@/Redux/hooks';

export const DiscordLoginUtility = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loginWithDiscord(searchParams.get('code') as string))
      .then((v) => {
        const { accessToken, refreshToken } = (
          v.payload as {
            data: { accessToken: { token: string }; refreshToken: { token: string } };
          }
        ).data;
        AuthUtil.setAccessToken(accessToken.token);
        AuthUtil.setRefreshToken(refreshToken.token);
        return dispatch(fetchCurrentUser());
      })
      .finally(() => {
        const newPath = localStorage.getItem('returnPath');
        localStorage.removeItem('returnPath');
        navigate(newPath ?? '/');
      });
  }, [dispatch, navigate, searchParams]);
  return <></>;
};
