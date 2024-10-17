import { useSoundEffect } from '@Audio/AudioManager';
import { URLUtil } from '@Utils/URLUtil';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNav = () => {
  const navigate = useNavigate();
  const { playSound } = useSoundEffect();

  const handleNav = useCallback(
    (url: string, variant: 'external' | 'internal', e: React.MouseEvent) => {
      if (variant === 'internal') {
        playSound('navigate');
        if (e.ctrlKey || e.metaKey) {
          const prefix = URLUtil.frontendHost;
          window.open(`${prefix}${url}`, '_blank');
        } else {
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
