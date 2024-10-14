import { useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/auth.selectors';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import { URLUtil } from '@Utils/URLUtil';
import React, { PropsWithChildren } from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';
export const StompProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <StompSessionProvider
      url={URLUtil.messageBroker}
      connectHeaders={
        currentUser?.id != null
          ? {
              login: currentUser.id,
              passcode: AuthUtil.getAccessToken() as string,
              Authorization: AuthUtil.getAccessHeader()?.Authorization as string,
            }
          : { login: 'Anonymous', passcode: 'guest' }
      }
      reconnectDelay={1000}
      debug={Logger.info}
    >
      {children}
    </StompSessionProvider>
  );
};
