import type {
  TerminalState,
  TerminalStyle,
} from '@/Definitions/Types/terminal/terminal.types';
import { Store } from '@tanstack/react-store';

const defaultStyle: TerminalStyle = {
  font: 'Jura, "Courier New", monospace',
  fontColor: '#31d1ff',
  fontSize: '1rem',
  alertSize: '1.3rem',
  infoColor: '#d0d0d0',
  successColor: '#00ff41',
  errorColor: '#ff4444',
  warningColor: '#ff9100',
  dateFormat: 'HH:mm:ss',
  cursorStyle: 'beam' as const,
  cursorColor: '#31d1ff',
  showTimestamp: true,
  background: 'rgb(0,1,19)',
  glow: 'rgba(49, 209, 255, 0.3)',
  promptColor: '#00ff41',
};

const welcomeMessage = [
  '██╗   ██╗███████╗██████╗ ███████╗███████╗    ██╗     ███████╗██████╗  ██████╗ ███████╗██████╗ ',
  '██║   ██║██╔════╝██╔══██╗██╔════╝██╔════╝    ██║     ██╔════╝██╔══██╗██╔════╝ ██╔════╝██╔══██╗',
  '██║   ██║█████╗  ██████╔╝███████╗█████╗      ██║     █████╗  ██║  ██║██║  ███╗█████╗  ██████╔╝',
  '╚██╗ ██╔╝██╔══╝  ██╔══██╗╚════██║██╔══╝      ██║     ██╔══╝  ██║  ██║██║   ██║██╔══╝  ██╔══██╗',
  ' ╚████╔╝ ███████╗██║  ██║███████║███████╗    ███████╗███████╗██████╔╝╚██████╔╝███████╗██║  ██║',
  '  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝    ╚══════╝╚══════╝╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝',
  '',
  '╔══════════════════════════════════════════════════════════╗',
  '║                  VLTERMINAL v2.0 — ONLINE                ║',
  '║        Star Citizen Companion — Keyboard Only Mode       ║',
  '╚══════════════════════════════════════════════════════════╝',
  '',
  'Type "help" • "style" to customize • "clear" to reset',
];

export const terminalStore = new Store<TerminalState>({
  history: [
    {
      type: 'ascii',
      content: welcomeMessage,
    },
  ],
  input: '',
  cwd: '~/',
  style: defaultStyle,
});
