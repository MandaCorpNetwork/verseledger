import WidgetTitleBar from '@CommonLegacy/Components/Boxes/WidgetTitleBar';
import { Close, Maximize, Minimize } from '@mui/icons-material';
import { Box, Collapse, IconButton, Typography } from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import { closeWidget } from '@Redux/Slices/Widgets/widgets.actions';
import React, { PropsWithChildren } from 'react';
import { Float2 } from 'vl-shared/src/math';

type VLWidgetProps = PropsWithChildren<{
  name: string;
  ['data-testid']?: string;
  title: string;
  onClose?: () => void;
}>;

const VLWidgetComponent: React.FC<VLWidgetProps> = (props) => {
  const { children, 'data-testid': testid = 'tool', name, title, onClose } = props;
  /** DRAGGING LOGIC */
  //TODO: Set Bounding Limits
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
    e.preventDefault();
    e.stopPropagation();
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

  /** FUNCTIONAL LOGIC */
  const dispatch = useAppDispatch();
  const onCloseDefault = React.useCallback(() => {
    dispatch(closeWidget(name));
  }, [dispatch, name]);

  const [isExpanded, setIsExpanded] = React.useState<boolean>(true);

  const handleExpand = React.useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, [setIsExpanded]);

  return (
    <Box
      ref={block}
      data-testid={`VLWidget__${testid}__Root`}
      onMouseDown={handleMouseDown}
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        minWidth: '200px',
        borderRadius: '5px',
        mb: '1em',
        ml: '1em',
        cursor: dragging.current ? 'grabbing' : 'grab',
      }}
    >
      <WidgetTitleBar
        data-testid={`VLWidget__${testid}__TitleBar`}
        sx={{
          px: '.5em',
          opacity: dragging.current ? 1 : 0.8,
          backdropFilter: 'blur(20px)',
        }}
      >
        <Typography
          sx={{
            color: 'secondary.main',
            textShadow: '0 2px 4px rgba(0,0,0)',
            cursor: 'default',
          }}
        >
          {title}
        </Typography>
        <div>
          <IconButton size="small" onClick={handleExpand}>
            {isExpanded ? <Minimize /> : <Maximize />}
          </IconButton>
          <IconButton size="small" onClick={onClose ?? onCloseDefault}>
            <Close fontSize="small" />
          </IconButton>
        </div>
      </WidgetTitleBar>
      <Collapse
        in={isExpanded}
        sx={{
          bgcolor: 'rgba(8,22,80)',
          mx: '.2em',
          borderBottomLeftRadius: '5px',
          borderBottomRightRadius: '5px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7), 0 0 10px 2px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(121,192,244,.15)',
        }}
      >
        {children}
      </Collapse>
    </Box>
  );
};

export const VLWidget = React.memo(VLWidgetComponent);
