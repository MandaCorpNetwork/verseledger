import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
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
}>;

const VLWidgetComponent: React.FC<VLWidgetProps> = (props) => {
  const { children, 'data-testid': testid = 'tool', name, title } = props;
  const dispatch = useAppDispatch();
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

        const newX = Math.max(0, widgetPosition.x + delta.x);
        const newY = Math.max(0, widgetPosition.y + delta.y);

        dispatch(
          actions.setPosition({ name: item.name, position: { x: newX, y: newY } }),
        );
        Logger.info(`Widget Pos Reading:`, widgetPosition);
      },
    }),
    [widgetPosition],
  );

  drag(widgetRef);

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
        zIndex: 50,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: 'red',
        p: '.5rem',
      }}
    >
      <Box
        data-testid={`VLWidget__${testid}__ViewControl`}
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {title}
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export const VLWidget = React.memo(VLWidgetComponent);
