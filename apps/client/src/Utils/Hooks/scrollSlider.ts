import { type RefObject, useEffect } from 'react';

const useScrollSlider = (
  sliderRef: RefObject<HTMLDivElement>,
  onChange: (value: number) => void,
  currentValue: number,
) => {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const valueChange = e.deltaY > 0 ? -1 : 1;
      const newValue = Math.min(Math.max(currentValue + valueChange, 0), 100);
      onChange(newValue);
      e.preventDefault();
    };

    const sliderElement = sliderRef.current;

    if (sliderElement) {
      sliderElement?.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (sliderElement) {
        sliderElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [sliderRef, onChange, currentValue]);
};

export default useScrollSlider;
