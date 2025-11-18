import { terminalStore } from "@Store/terminal/terminalStore";
import { useRef } from "react";

export function useTerminalInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const input = terminalStore.state.input.trim();
      const [cmd, ...args] = input.split(' ');

      terminalStore.setState(prev => ({
        ...prev,
        history: [
          ...prev.history,
          {
            type: 'command',
            content: input,
            cwd: prev.cwd,
            timestamp: Date.now()
          }],
        input: '',
      }));

      // Command Routing Switch
      
    }
  };

  return { inputRef, handleKeyDown };
}