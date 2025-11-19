import { settingsStore } from '@Store/userSettings/settingStore';
import { useNavigate } from '@tanstack/react-router';
import { useStore } from '@tanstack/react-store';
import type { AppButtonProps } from '@Types/appDock/components';
import { motion } from 'motion/react';
import { useCallback } from 'react';



function AppButtonCore({
  app,
  children,
  onClick,
  size = 'medium',
  ...motionProps
}: AppButtonProps) {
  const navigate = useNavigate();
  const { fidelity } = useStore(settingsStore);
  const isHighFidelity = fidelity === 'ultra' || fidelity === 'high';

  const handleClick = useCallback(() => {
    if (app.disabled) return;
    onClick?.();
    if (app.path) {
      navigate({ to: app.path });
    }
  }, [app.disabled, app.path, navigate, onClick]);

  return (
    <motion.div
      role="button"
      aria-label={app.label}
      aria-disabled={app.disabled}
      tabIndex={app.disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      style={{
        cursor: app.disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        outline: 'none',
        display: 'inline-block',
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export const AppButton = motion(AppButtonCore, {
  forwardMotionProps: true,
});

AppButton.displayName = 'AppButton';
