import { terminalStore } from '../terminalStore';

export const updateTerminalInput = (input: string) => {
  terminalStore.setState((prev) => ({
    ...prev,
    input,
  }));
};
