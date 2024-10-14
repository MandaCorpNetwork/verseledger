import { fetchCurrentUser } from '@Redux/Slices/Auth/Actions/fetchCurrentUser.action';
import { loginWithGoogle } from '@Redux/Slices/Auth/Actions/loginWithGoogle.action';
import { AuthUtil } from '@Utils/AuthUtil';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '@/Redux/hooks';

export const GoogleLoginUtility = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loginWithGoogle(searchParams.get('code') as string))
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
