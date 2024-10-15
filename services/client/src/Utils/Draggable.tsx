import { PropsWithChildren, useEffect, useRef } from 'react';
import { Float2 } from 'vl-shared/src/math';

const requestAnimationFrame = window.requestAnimationFrame;

export const Draggable: React.FC<PropsWithChildren> = (props) => {
  const dragging = useRef(false);
  const block = useRef<HTMLElement>(null as unknown as HTMLElement);
  const frameID = useRef(0);
  const last = useRef(new Float2());
  const drag = useRef(new Float2());

  const handleMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    const cur = new Float2(e.pageX, e.pageY);
    const delta = last.current.subtract(cur);
    last.current = cur;
    drag.current = drag.current.subtract(delta);

    cancelAnimationFrame(frameID.current);

    frameID.current = requestAnimationFrame(() => {
      const transform = `translate3d(${drag.current.x}px, ${drag.current.y}px, 0)`;
      block.current.style.transform = transform;
    });
  };

  const handleMouseDown = (e: MouseEvent) => {
    last.current = new Float2(e.pageX, e.pageY);
    dragging.current = true;
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div ref={block} onMouseDown={handleMouseDown}>
      {props.children}
    </div>
  );
};
