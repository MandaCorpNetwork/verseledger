import { useSoundEffect } from '@Audio/AudioManager';
import { URLUtil } from '@Utils/URLUtil';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNav = () => {
  const navigate = useNavigate();
  const { playSound } = useSoundEffect();

  const handleNav = useCallback(
    (
      e: React.MouseEvent,
      url: string,
      variant: 'external' | 'internal',
      pageChange: boolean = true,
    ) => {
      if (variant === 'internal') {
        playSound('navigate');
        if ((e.ctrlKey || e.metaKey) && pageChange) {
          const prefix = URLUtil.frontendHost;
          window.open(`${prefix}${url}`, '_blank');
        } else {
          if (pageChange) {
            playSound('navigate');
          } else {
            playSound('close');
          }
          navigate(url);
        }
      } else {
        playSound('navigate');
        window.open(url, '_blank');
      }
    },
    [playSound, navigate],
  );

  return handleNav;
};
