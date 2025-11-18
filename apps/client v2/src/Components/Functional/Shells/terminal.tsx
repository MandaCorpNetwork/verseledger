import { updateTerminalInput } from '@/Store/terminal/actions/input';
import { terminalStore } from '@/Store/terminal/terminalStore';
import { useTerminalTheme } from '@/Utils/helpers/createTerminalTheme';
import { useTerminalInput } from '@/Utils/hooks/useTerminalInput';
import { ThemeProvider } from '@emotion/react';
import { Box, Typography, keyframes } from '@mui/material';
import { useStore } from '@tanstack/react-store';
import { useCallback, useEffect, useRef, type ChangeEvent } from 'react';

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`

type TerminalProps = {
  children: React.ReactNode;
};

export const Terminal: React.FC<TerminalProps> = (props) => {
  const { children } = props;
  const theme = useTerminalTheme();
  const { history, input, cwd, style } = useStore(terminalStore);
  const { inputRef, handleKeyDown } = useTerminalInput();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    updateTerminalInput(e.target.value);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        role="log"
        aria-label="VLTerminal Output"
        aria-live="polite"
        aria-atomic="false"
        data-testid="vlterminal-container"
        sx={{
          height: '100%',
          p: 5,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          ref={scrollRef}
          aria-label="Terminal History"
          data-testid="vlterminal-output"
          sx={{
            flex: 1,
            overflowY: 'auto',
            pb: 2,
          }}
        >
          {history.map((line, i) => {
            if (line.type === 'ascii') {
              return line.content.map((l, j) => (
                <Typography
                  key={`${i}-${j}`}
                  component="div"
                  aria-hidden="true"
                  data-testid={`ascii-line-${i}-${j}`}
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    whiteSpace: 'pre'
                  }}
                >
                  {l}
                </Typography>
              ));
            }

            let color;
            switch (line.type) {
              case 'error':
                color = 'error';
                break;
              case 'success':
                color = 'success';
                break;
              case 'command':
                color = 'secondary';
                break;
              case 'output':
                color = 'info';
                break;
              default:
                color = 'textPrimary';
                break;
            }

            const role = line.type === 'error' ? 'alert' : undefined;
            return (
              <Typography
                key={`output#${i}`}
                component="div"
                role={role}
                aria-live={line.type === 'error' ? 'assertive' : 'polite'}
                data-testid={`terminal-line-${line.type}-${i}`}
                color={color}
                sx={{
                  opacity: line.type === 'command' ? 0.9 : 1,
                }}
              >
                {line.type === 'command' && (
                  <span
                    style={{ color: style.promptColor }}
                    aria-label={`Current directory: ${line.cwd}`}
                  >
                    {line.cwd}$
                  </span>
                )}{' '}
                <span data-testid={`line-content-${i}`}>{line.content}</span>
              </Typography>
            );
          })}
        </Box>

        {/* Input Line */}
        <Box
          component="label"
          htmlFor="vlterminal-input"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Typography
            component="span"
            aria-hidden="true"
            sx={{ color: style.promptColor, mr: 1 }}
          >
            {cwd}$
          </Typography>
        </Box>
        <Box
          component="input"
          id="vlterminal-input"
          aria-label="Terminal command input"
          data-testid="vlterminal-input"
          ref={inputRef}
          value={input}
          onChange={(e) => handleInput(e)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          sx={{
            bgcolor: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'primary.main',
            font: 'inherit',
            flex: 1,
            '&::placeholder': { color: '#0088cc', opacity: 0.7 },
          }}
          placeholder="Type 'help' to begin..."
        />
        {/* Blinking Cursor */}
        <Box
          aria-hidden="true"
          data-testid="vlterminal-cursor"
          sx={{
            width: style.cursorStyle === 'block' ? '0.6em' : '0.1em',
            height: style.cursorStyle === 'block' ? '1.2em' : '1.2em',
            bgColor: 'red',
            ml: 0.5,
            display: 'inline-block',
            animation: `${blink} 1s steps(1) infinite`,
          }}
        />
        {/* Hidden outlet for React Router */}
        <Box sx={{ position: 'absolute', left: '-9999px' }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
};
