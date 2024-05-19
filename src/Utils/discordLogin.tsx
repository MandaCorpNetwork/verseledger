import { AuthUtil } from '@Utils/AuthUtil';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { loginWithDiscord } from '@/Hooks/loginWithDiscord';
import { useAppDispatch } from '@/Redux/hooks';
import { fetchCurrentUser } from '@/Redux/Slices/Auth/Actions/fetchCurrentUser';

export const DiscordLoginUtility = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('logging in...');
    dispatch(loginWithDiscord(searchParams.get('code') as string)).then((v) => {
      const { accessToken, refreshToken } = (
        v.payload as { data: { accessToken: string; refreshToken: string } }
      ).data;
      AuthUtil.setAccessToken(accessToken);
      AuthUtil.setRefreshToken(refreshToken);
      dispatch(fetchCurrentUser()).then((user) =>
        console.log((user.payload as { data: unknown }).data),
      );
    });
  }, []);
  return <></>;
};
