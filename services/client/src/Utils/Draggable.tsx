import {
  type MouseEventHandler,
  type PropsWithChildren,
  type RefObject,
  useEffect,
  useRef,
} from 'react';
import { Float2 } from 'vl-shared/src/math';

const requestAnimationFrame = window.requestAnimationFrame;

export const Draggable: React.FC<PropsWithChildren> = (props) => {
  const dragging = useRef(false);
  const block: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement,
  );
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
