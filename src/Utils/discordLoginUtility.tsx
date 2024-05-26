import { loginWithDiscord } from '@Redux/Slices/Auth/Actions/loginWithDiscord';
import { AuthUtil } from '@Utils/AuthUtil';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '@/Redux/hooks';
import { fetchCurrentUser } from '@/Redux/Slices/Auth/Actions/fetchCurrentUser';

export const DiscordLoginUtility = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log('logging in...');
    dispatch(loginWithDiscord(searchParams.get('code') as string))
      .then((v) => {
        const { accessToken, refreshToken } = (
          v.payload as { data: { accessToken: string; refreshToken: string } }
        ).data;
        AuthUtil.setAccessToken(accessToken);
        AuthUtil.setRefreshToken(refreshToken);
        return dispatch(fetchCurrentUser()).then((user) =>
          console.log((user.payload as { data: unknown }).data),
        );
      })
      .finally(() => {
        const newPath = localStorage.getItem('returnPath');
        localStorage.removeItem('returnPath');
        navigate(newPath ?? '/');
      });
  }, []);
  return <></>;
};
