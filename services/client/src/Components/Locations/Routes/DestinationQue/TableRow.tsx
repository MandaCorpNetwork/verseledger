import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { ExpandMoreTwoTone } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React, { MouseEventHandler, RefObject } from 'react';
import { Float2 } from 'vl-shared/src/math';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

type TableRowProps = {
  destination: IDestination;
  distance: string;
  draggable?: boolean;
  ['data-testid']?: string;
};

export const DestinationTableRow: React.FC<TableRowProps> = ({
  destination,
  distance,
  draggable,
  'data-testid': testid = 'TableRow',
}) => {
  const dragging = React.useRef(false);
  const block: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement,
  );
  const frameID = React.useRef(0);
  const last = React.useRef(new Float2());
  const drag = React.useRef(new Float2());

  const handleMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    const cur = new Float2(e.pageX, e.pageY);
    const delta = last.current.subtract(cur);
    last.current = cur;
    drag.current = drag.current.subtract(delta);

    cancelAnimationFrame(frameID.current);

    frameID.current = requestAnimationFrame(() => {
      const transform = `translate3d(${drag.current.x}px, ${drag.current.y}px, 0)`;
      if (block.current != null) block.current.style.transform = transform;
    });
  };

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
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
    <Accordion
      data-testid={`${testid}__Container`}
      sx={{ width: '100%' }}
      ref={block}
      onMouseDown={handleMouseDown}
    >
      <AccordionSummary
        // data-testid={`${testid}__Summary`}
        expandIcon={<ExpandMoreTwoTone color="secondary" />}
        sx={{
          display: 'flex',
          width: '100%',
        }}
      >
        <div
          data-testid={`${testid}__Summary_Wrapper`}
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 .2em',
          }}
        >
          <Typography
            data-testid={`${testid}-Summary__DestinationStop`}
            variant="body2"
            sx={{
              fontWeight: 'bold',
              color: 'info.main',
              display: 'flex',
              gap: '0.5em',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {destination.stopNumber === 0 ? 'Unsorted' : `${destination.stopNumber}.`}
            <LocationChip
              data-testid={`${testid}__LocationChip`}
              locationId={destination.location.id}
              sx={{
                maxWidth: '130px',
              }}
            />
          </Typography>
          <Typography data-testid={`${testid}__StopReason`} color="info">
            {destination.reason}
          </Typography>
          <Typography
            data-testid={`${testid}__TaskCount`}
            sx={{ color: 'text.secondary' }}
          >
            {`${destination.objectives.length} Task(s)`}
          </Typography>
          <Typography data-testid={`${testid}__Distance`}>{distance}</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
};
