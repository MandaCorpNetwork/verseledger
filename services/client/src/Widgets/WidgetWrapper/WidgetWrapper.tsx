import WidgetTitleBar from '@Common/Components/Boxes/WidgetTitleBar';
import { CallToAction, Close, Minimize } from '@mui/icons-material';
import { Box, Collapse, IconButton, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { closeWidget } from '@Redux/Slices/Widgets/widgets.actions';
import { actions } from '@Redux/Slices/Widgets/widgets.reducer';
import { selectWidgetPosition } from '@Redux/Slices/Widgets/widgets.selectors';
import { Logger } from '@Utils/Logger';
// import { useAppDispatch } from '@Redux/hooks';
import React, { PropsWithChildren } from 'react';
import { useDrag } from 'react-dnd';

type VLWidgetProps = PropsWithChildren<{
  open?: boolean;
  name: string;
  ['data-testid']?: string;
  title: string;
  onClose?: () => void;
}>;

const VLWidgetComponent: React.FC<VLWidgetProps> = (props) => {
  const { children, 'data-testid': testid = 'tool', name, title, onClose } = props;
  const dispatch = useAppDispatch();
  const onCloseDefault = React.useCallback(() => {
    dispatch(closeWidget(name));
  }, [dispatch, name]);
  const widgetPosition = useAppSelector((state) => selectWidgetPosition(state, name));

  const widgetRef = React.useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'WIDGET',
      item: { name },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (!delta || !widgetPosition) return;
        const { innerWidth, innerHeight } = window;

        let newX = Math.max(0, widgetPosition.x + delta.x);
        let newY = Math.max(0, widgetPosition.y + delta.y);

        // Adjust position to ensure the widget stays within the viewport
        if (widgetRef.current) {
          const rect = widgetRef.current.getBoundingClientRect();
          if (newX + rect.width > innerWidth) {
            newX = innerWidth - rect.width;
          }
          if (newY + rect.height > innerHeight) {
            newY = innerHeight - rect.height;
          }
        }

        dispatch(
          actions.setPosition({ name: item.name, position: { x: newX, y: newY } }),
        );
        Logger.info(`Widget Pos Reading:`, widgetPosition);
      },
    }),
    [widgetPosition],
  );

  drag(widgetRef);
  const [isExpanded, setIsExpanded] = React.useState(true);

  const handleExpand = React.useCallback(() => {
    if (widgetRef.current) {
      const rect = widgetRef.current.getBoundingClientRect();
      const { innerWidth, innerHeight } = window;

      let newX = widgetPosition.x;
      let newY = widgetPosition.y;

      if (rect.right > innerWidth) {
        newX = innerWidth - rect.width;
      }

      if (rect.bottom > innerHeight) {
        newY = innerHeight - rect.height;
      }

      if (newX !== widgetPosition.x || newY !== widgetPosition.y) {
        dispatch(actions.setPosition({ name, position: { x: newX, y: newY } }));
      }
    }
    setIsExpanded((prev) => !prev);
  }, [dispatch, widgetPosition.x, widgetPosition.y, name]);

  return (
    <Box
      ref={widgetRef}
      data-testid={`VLWidget__${testid}__Root`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: widgetPosition.y,
        left: widgetPosition.x,
        zIndex: 25,
        opacity: isDragging ? 0.5 : 1,
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
          opacity: isExpanded ? 1 : 0.8,
          backdropFilter: 'blur(20px)',
        }}
      >
        <Typography sx={{ color: 'secondary.main', textShadow: '0 2px 4px rgba(0,0,0)' }}>
          {title}
        </Typography>
        <Box
          data-testid={`VLWidget__${testid}__WidgetViewControl_Wrapper`}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton size="small" onClick={handleExpand}>
            {isExpanded ? (
              <Minimize fontSize="small" />
            ) : (
              <CallToAction fontSize="small" color="action" />
            )}
          </IconButton>
          <IconButton size="small" onClick={onClose ?? onCloseDefault}>
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </WidgetTitleBar>
      <Collapse
        in={isExpanded}
        sx={{
          bgcolor: 'rgba(8,22,80)',
          mx: '.2em',
          borderBottomLeftRadius: '5px',
          borderBottomRightRadius: '5px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7), 0 0 10px 2px rgba(0, 0, 0, 0.3)',
          zIndex: 26,
          border: '1px solid rgba(121,192,244,.15)',
        }}
      >
        {children}
      </Collapse>
    </Box>
  );
};

export const VLWidget = React.memo(VLWidgetComponent);
