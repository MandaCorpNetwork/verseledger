import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchUserData } from '@/Hooks/fetchUserData';
import { loginWithDiscord } from '@/Hooks/loginWithDiscord';
import { useAppDispatch } from '@/Redux/hooks';

export const DiscordLoginUtility = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('logging in...');
    dispatch(loginWithDiscord(searchParams.get('code') as string)).then((v) => {
      const { accessToken } = (
        v.payload as { data: { accessToken: string; refreshToken: string } }
      ).data;
      dispatch(fetchUserData(accessToken)).then((user) =>
        console.log((user.payload as { data: unknown }).data),
      );
    });
  }, []);
  return <></>;
};
