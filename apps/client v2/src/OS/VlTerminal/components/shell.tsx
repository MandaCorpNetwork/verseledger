import {
  BaseShell,
  type BaseShellProps,
} from '../../../Components/Functional/Shells/baseShell';
import { Terminal } from '../../../Components/Functional/Shells/terminal';

export const VlTerminalShell: React.FC<BaseShellProps> = ({ children }) => {
  return (
    <BaseShell>
      <Terminal>{children}</Terminal>
    </BaseShell>
  );
};
