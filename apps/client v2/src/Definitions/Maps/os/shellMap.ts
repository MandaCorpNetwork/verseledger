import { VerseOSShell } from '@/OS/VerseOS/components/shell';
import { VlTerminalShell } from '@/OS/VlTerminal/components/shell';
import type { ThemeOS } from '@/Definitions/Types/os/themeOS';

export const shellMap = {
  verseOS: VerseOSShell,
  pirateOS: VerseOSShell,
  refineryOS: VerseOSShell,
  vlTerminal: VlTerminalShell,
  hexOS: VerseOSShell,
} as const satisfies Record<ThemeOS, React.ComponentType<{ children: React.ReactNode }>>;
