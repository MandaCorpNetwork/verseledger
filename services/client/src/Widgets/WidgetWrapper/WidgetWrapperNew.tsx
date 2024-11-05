import WidgetTitleBar from '@Common/Components/Boxes/WidgetTitleBar';
import { Box, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { Float2 } from 'vl-shared/src/math';

type VLWidgetProps = PropsWithChildren<{
  open?: boolean;
  name: string;
  ['data-testid']?: string;
  title: string;
  onClose?: () => void;
}>;

const VLWidgetComponent: React.FC<VLWidgetProps> = (props) => {
  const { children, 'data-testid': testid = 'tool', name, title, onClose } = props;
  const dragging = React.useRef(false);
  const block: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement,
  );
  const frameId = React.useRef(0);
  const last = React.useRef(new Float2());
  const drag = React.useRef(new Float2());

  const handleMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    const cur = new Float2(e.pageX, e.pageY);
    const delta = last.current.subtract(cur);
    last.current = cur;
    drag.current = drag.current.subtract(delta);

    cancelAnimationFrame(frameId.current);

    frameId.current = requestAnimationFrame(() => {
      const transform = `translate3d(${drag.current.x}px, ${drag.current.y}px, 0)`;
      if (block.current != null) block.current.style.transform = transform;
    });
  };

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    last.current = new Float2(e.pageX, e.pageY);
    dragging.current = true;
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <Box
      ref={block}
      data-testid={`VLWidget__${testid}__Root`}
      onMouseDown={handleMouseDown}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        zIndex: 25,
        minWidth: '200px',
        borderRadius: '5px',
        transition: 'top 0.1s ease-in, left 0.1s ease-in',
        mb: '1em',
      }}
    >
      <WidgetTitleBar
        data-testid={`VLWidget__${testid}__TitleBar`}
        sx={{
          px: '.5em',
          // opacity: isExpanded ? 1 : 0.8,
          backdropFilter: 'blur(20px)',
        }}
      >
        <Typography sx={{ color: 'secondary.main', textShadow: '0 2px 4px rgba(0,0,0)' }}>
          {title}
        </Typography>
      </WidgetTitleBar>
      <Box>{children}</Box>
    </Box>
  );
};

export const VLWidget = React.memo(VLWidgetComponent);
