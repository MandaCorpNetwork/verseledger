export type TerminalState = {
  history: TerminalLine[];
  input: string;
  cwd: string;
  style: TerminalStyle;
};

export type CursorStyle = 'block' | 'underscore' | 'beam';

export type TerminalStyle = {
  font: string;
  fontColor: string;
  fontSize: string;
  alertSize: string;
  infoColor: string;
  successColor: string;
  errorColor: string;
  warningColor: string;
  dateFormat: string;
  cursorStyle: CursorStyle;
  cursorColor: string;
  showTimestamp: boolean;
  background: string;
  glow: string;
  promptColor: string;
};

export type TerminalLine =
  | {
      type: 'output';
      content: string;
      timestamp?: number;
    }
  | {
      type: 'command';
      content: string;
      cwd: string;
      timestamp: number;
    }
  | {
      type: 'error';
      content: string;
      timestamp: number;
    }
  | {
      type: 'success';
      content: string;
      timestamp: number;
    }
  | {
      type: 'ascii';
      content: string[];
    };
