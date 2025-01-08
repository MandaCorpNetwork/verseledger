import { useSoundEffect } from '@Audio/AudioManager';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { useAppDispatch } from '@Redux/hooks';
import { markAllRead } from '@Redux/Slices/Notifications/actions/markAllRead.action';
import { markRead } from '@Redux/Slices/Notifications/actions/patchMarkRead.action';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';
import { useNavigate } from 'react-router';
import type { INotificationDisplay } from 'vl-shared/src/schemas/NotificationSchema';

function useNotification() {
  const sound = useSoundEffect();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMarkRead = React.useCallback(
    (notifyId: string) => {
      sound.playSound('close');
      dispatch(markRead(notifyId));
    },
    [sound, dispatch],
  );

  const handleViewNotification = React.useCallback(
    (notif: INotificationDisplay) => {
      handleMarkRead(notif.id);
      if (notif.action?.type === 'link') {
        navigate(notif.action.link as string);
      } else if (notif.action?.type === 'popup') {
        switch (notif.action.popup) {
          case '$VERIFY':
            sound.playSound('open');
            dispatch(openPopup(POPUP_PLAYER_CARD, { userid: notif.user_id }));
            break;
          default:
            break;
        }
      }
    },
    [handleMarkRead, sound, dispatch, navigate],
  );

  const handleMarkAllRead = React.useCallback(() => {
    sound.playSound('close');
    dispatch(markAllRead());
  }, [sound, dispatch]);

  const getNotificationTitle = React.useCallback((notif: INotificationDisplay) => {
    if (notif.action?.type === 'popup') {
      switch (notif.action.popup) {
        case '$VERIFY':
          return 'Account';
        default:
          return 'Unknown';
      }
    } else if (notif.action?.link) {
      return 'Unknown';
    }
    return 'Unknown';
  }, []);

  return React.useMemo(
    () => ({
      handleMarkAllRead,
      handleViewNotification,
      handleMarkRead,
      getNotificationTitle,
    }),
    [handleMarkAllRead, handleViewNotification, handleMarkRead, getNotificationTitle],
  );
}

export default useNotification;
