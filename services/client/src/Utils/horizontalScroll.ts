import { type RefObject, useEffect, useRef } from 'react';

export function useHorizontalSimpleScroll(): RefObject<HTMLDivElement> {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;

    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.max(-1, Math.min(1, e.deltaY));
      el.scrollLeft += delta * 40;
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, [elRef]);

  return elRef;
}

export function useHorizontalAdvancedScroll(): RefObject<HTMLDivElement> {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;

    if (!el) return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout | null = null;
    let scrollVelocity = 0;
    let lastScrollLeft = el.scrollLeft;
    const inertiaFactor = 0.45; // Adjust the inertia decrease rate

    const applyInertia = () => {
      if (!isScrolling && scrollVelocity !== 0) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        let newScrollLeft = el.scrollLeft + scrollVelocity;
        newScrollLeft = Math.max(0, Math.min(maxScroll, newScrollLeft));
        el.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth',
        });

        // Scroll Velocity Adjustment based on direction and speed
        const direction = newScrollLeft > lastScrollLeft ? 1 : -1;
        scrollVelocity *= inertiaFactor;

        if (Math.abs(scrollVelocity) < 0.01) {
          scrollVelocity = 0;
        } else {
          // Adjust velocity for next frame
          scrollVelocity = direction * Math.abs(scrollVelocity);
        }

        // Sets frame rate to 60fps (call frequency)
        scrollTimeout = setTimeout(applyInertia, 16);
      } else {
        scrollVelocity = 0;
      }
      lastScrollLeft = el.scrollLeft;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      isScrolling = true;

      const delta = e.deltaY > 0 ? 1 : -1;
      el.scrollLeft += delta * 40;

      const maxScroll = el.scrollWidth - el.clientWidth;
      const scrollRatio = el.scrollLeft / maxScroll;
      const speedFactor = Math.abs(delta) * scrollRatio * 2000; // Speed Sensitivity
      scrollVelocity = delta * speedFactor;

      if (scrollTimeout) clearTimeout(scrollTimeout);
      // Inertia Application Delay
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        applyInertia();
      }, 50);
    };

    let startX: number;
    let startScrollLeft: number;

    const onTouchStart = (e: TouchEvent) => {
      isScrolling = true;
      startX = e.touches[0].pageX - el.offsetLeft;
      startScrollLeft = el.scrollLeft;
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const x = e.touches[0].pageX - el.offsetLeft;
      const walk = (x - startX) * 2; // Scroll sensitivity
      el.scrollLeft = startScrollLeft - walk;
    };

    const onTouchEnd = () => {
      isScrolling = false;
      applyInertia();
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [elRef]);

  return elRef;
}
