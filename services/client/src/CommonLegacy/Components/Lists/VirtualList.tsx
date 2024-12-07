import { Box, List } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Children,
  forwardRef,
  type HTMLAttributes,
  Key,
  type ReactElement,
  useRef,
} from 'react';

export const VirtualListboxComponent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLElement>
>((props, ref) => {
  const { children, role, ...other } = props;

  const items = Children.toArray(children) as ReactElement[];
  const itemCount = items.length;

  const scrollRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: itemCount,
    estimateSize: () => 35,
    getScrollElement: () => scrollRef.current,
  });

  return (
    <div ref={ref}>
      <List
        {...other}
        role={role}
        ref={scrollRef}
        component="div"
        sx={{
          position: 'relative',
          height: virtualizer.getTotalSize(),
        }}
      >
        {virtualizer
          .getVirtualItems()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((item: { key: Key | null | undefined; start: any; index: number }) => (
            <Box
              key={item.key}
              sx={{
                height: 35,
                py: 0.5,
                width: '100%',
                position: 'absolute',
                transform: `translateY(${item.start}px)`,
              }}
            >
              {items[item.index]}
            </Box>
          ))}
      </List>
    </div>
  );
});
VirtualListboxComponent.displayName = 'VirtualListBoxComponent';
