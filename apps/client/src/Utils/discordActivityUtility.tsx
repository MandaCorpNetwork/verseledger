import { DiscordSDK } from '@discord/embedded-app-sdk';
import { useAppDispatch } from '@Redux/hooks';
import { fetchCurrentUser } from '@Redux/Slices/Auth/Actions/fetchCurrentUser.action';
import { loginWithDiscord } from '@Redux/Slices/Auth/Actions/loginWithDiscord.action';
import { fetchUserFlags } from '@Redux/Slices/Flags/Actions/fetchFlags.action';
import { AuthUtil } from '@Utils/AuthUtil';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const DiscordActivityUtility = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const setupSDK = async () => {
      console.log('SETTING UP THE DISCORD SDK');
      const discordSdk = new DiscordSDK('1160393986440179823');

      await discordSdk.ready();

      await discordSdk.commands.encourageHardwareAcceleration();

      console.log('DISCORD SDK READY');
      const { code } = await discordSdk.commands.authorize({
        client_id: '1160393986440179823',
        response_type: 'code',
        state: '',
        prompt: 'none',
        scope: ['openid' as 'email'],
      });
      dispatch(loginWithDiscord(code))
        .then((v) => {
          const { accessToken, refreshToken } = (
            v.payload as {
              data: { accessToken: { token: string }; refreshToken: { token: string } };
            }
          ).data;
          AuthUtil.setAccessToken(accessToken.token);
          AuthUtil.setRefreshToken(refreshToken.token);
          dispatch(fetchCurrentUser());
          dispatch(fetchUserFlags());
        })
        .finally(() => {
          const newPath = localStorage.getItem('returnPath');
          localStorage.removeItem('returnPath');
          navigate(newPath ?? '/');
        });
    };
    // Instantiate the SDK
    setupSDK();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
