import {
  BaseShell,
  type BaseShellProps,
} from '../../../Components/Functional/Shells/baseShell';

export const VerseOSShell: React.FC<BaseShellProps> = ({ children }) => {
  return <BaseShell>{children}</BaseShell>;
};
