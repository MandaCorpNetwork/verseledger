import '@Assets/Css/AppDockV3.css';

import { useSoundEffect } from '@Audio/AudioManager';
import { MobileDock } from '@CommonLegacy/MobileDock/MobileDock';
import { SupportBar } from '@Components/Home/SupportBar';
import { DoubleArrow } from '@mui/icons-material';
import { Collapse, IconButton, Portal } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectAnimations } from '@Redux/Slices/Auth/auth.selectors';
import { useIsMobile } from '@Utils/isMobile';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { AppDock } from './AppDockV3';

export const AppDockRenderer: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(true);

  const isMobile = useIsMobile();
  const sound = useSoundEffect();
  const location = useLocation();

  const animation = useAppSelector(selectAnimations);

  const appearUse = animation === 'high' || animation === 'medium';
  const collapseKeep = animation === 'high';

  const supportTrigger = React.useMemo(() => {
    const path = location.pathname;
    switch (true) {
      case path === '/':
      case path.startsWith('/settings'):
      case path.startsWith('/license'):
      case path.startsWith('/api-docs'):
        return true;
      default:
        return false;
    }
  }, [location.pathname]);

  const checkEnabled = React.useCallback((path: string) => {
    switch (true) {
      case path === '/':
      case path.startsWith('/settings'):
      case path === '/license':
        return false;
      default:
        return true;
    }
  }, []);

  const collapseEnabled = React.useMemo(() => {
    if (isMobile) return;
    const path = location.pathname;
    const isEnabled = checkEnabled(path);
    if (!isEnabled && !isExpanded) setIsExpanded(true);
    return isEnabled;
  }, [isExpanded, location.pathname, setIsExpanded, checkEnabled, isMobile]);

  const handleExpand = React.useCallback(() => {
    setIsExpanded((prev) => {
      if (prev) {
        sound.playSound('close');
      } else {
        sound.playSound('open');
      }
      return !prev;
    });
  }, [sound]);

  return (
    <Portal>
      {isMobile && (
        <>
          <MobileDock top left />
          {supportTrigger && (
            <div data-testid="AppDockRenderer__SupportContainer" id="DockContainer">
              <SupportBar />
            </div>
          )}
        </>
      )}
      {!isMobile && (
        <div data-testid="AppDockRenderer_Container" id="DockContainer">
          <IconButton
            data-testid="AppDockCollapse__Collapse_Button"
            disabled={!collapseEnabled}
            sx={{
              position: 'absolute',
              left: '20%',
              bottom: 0,
              '&:disabled': { color: 'text.disabled' },
            }}
            onClick={handleExpand}
          >
            <DoubleArrow
              fontSize="large"
              sx={[
                {
                  transform: `rotate(${isExpanded ? '90' : '-90'}deg) scale(0.9)`,
                  opacity: '0.4',
                  filter:
                    'drop-shadow(0 0 0 rgba(14,255,255,0.4)) drop-shadow(0 0 5px rgba(14,255,255,0.6)) drop-shadow(0 0 10px rgba(14,255,255,0.5))',
                  transition: 'opacity 0.3s ease-in-out, transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: `rotate(${isExpanded ? '90' : '-90'}deg) scale(1)`,
                    opacity: '1',
                  },
                },
                !collapseEnabled && {
                  filter:
                    'drop-shadow(0 0 0 rgba(0,0,0,0.4)) drop-shadow(0 0 5px rgba(0,0,0,0.6)) drop-shadow(0 0 10px rgba(0,0,0,0.5))',
                },
              ]}
            />
          </IconButton>
          <Collapse
            in={isExpanded}
            appear={appearUse}
            unmountOnExit={!collapseKeep}
            mountOnEnter={!collapseKeep}
          >
            <AppDock />
            {supportTrigger && <SupportBar />}
          </Collapse>
        </div>
      )}
    </Portal>
  );
};
