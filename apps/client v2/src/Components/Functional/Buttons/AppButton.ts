import { settingsStore } from "@Store/userSettings/settingStore";
import { useNavigate } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import type { AppListing } from "@Types/apps";
import { motion } from 'motion/react';
import { useCallback } from "react";

export type AppButtonProps = {
  app: AppListing;
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
};

function AppButtonCore({ app, children, onClick, size = 'medium', ...motionProps }: AppButtonProps) {
  const navigate = useNavigate();
  const { fidelity } = useStore(settingsStore);
  const isHighFidelity = fidelity === 'ultra' || fidelity === 'high';

  const handleClick = useCallback(() => {
    if (app.disabled) return;
    onClick?.();
    if (app.path) {
      navigate({ to: app.path });
    }
  }, []);
}