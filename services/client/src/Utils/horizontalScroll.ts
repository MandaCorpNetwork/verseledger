import { RefObject, useEffect, useRef } from 'react';

export function useHorizontalSimpleScroll(): RefObject<HTMLDivElement> {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;

    if (!el) return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout | null = null;
    let scrollVelocity = 0;
    let lastScrollLeft = el.scrollLeft;
    const inertiaFactor = 0.75; // Adjust the inertia decrease rate

    const applyInertia = () => {
      if (!isScrolling && scrollVelocity !== 0) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        let newScrollLeft = el.scrollLeft + scrollVelocity;
        newScrollLeft = Math.max(0, Math.min(maxScroll, newScrollLeft));
        el.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth',
        });

        // Calculate scroll direction and adjust velocity
        const direction = newScrollLeft > lastScrollLeft ? 1 : -1;
        const deceleration = Math.abs(scrollVelocity) * inertiaFactor * direction;
        scrollVelocity -= deceleration;

        if (Math.abs(scrollVelocity) < 0.01) {
          scrollVelocity = 0;
        }

        scrollTimeout = setTimeout(applyInertia, 16);
      } else {
        scrollVelocity = 0;
      }

      lastScrollLeft = el.scrollLeft; // Update last scroll position
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      isScrolling = true;

      const delta = Math.max(-1, Math.min(1, e.deltaY));
      el.scrollLeft += delta * 30;

      const maxScroll = el.scrollWidth - el.clientWidth;
      const scrollRatio = el.scrollLeft / maxScroll;
      const speedFactor = Math.abs(delta) * scrollRatio * 2000; // Speed Sensitivity
      scrollVelocity = delta * speedFactor;

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        applyInertia();
      }, 50);
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [elRef]);

  return elRef;
}
