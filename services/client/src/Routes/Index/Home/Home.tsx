/// <reference types="vite/client" />
import '@Components/Home/Home.css';

import backgroundvideo from '@Assets/media/MenuPage/backgroundvideo.webm?url';
import { Box } from '@mui/material';
import React from 'react';

export const Home: React.FC<unknown> = () => {
  // **Mouse Parallax for BGVideo**
  // const videoRef = React.useRef<HTMLVideoElement | null>(null);
  // const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  // const [isAnimating, setIsAnimating] = React.useState(false);

  // React.useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY });
  //   };

  //   window.addEventListener('mousemove', handleMouseMove);

  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, []);

  // React.useEffect(() => {
  //   const windowWidth = window.innerWidth;
  //   const windowHeight = window.innerHeight;

  //   const updateAnimation = () => {
  //     if (videoRef.current) {
  //       const { x, y } = mousePosition;
  //       const offsetX = (x / windowWidth - 0.5) * 20;
  //       const offsetY = (y / windowHeight - 0.5) * 20;
  //       videoRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.05)`;
  //     }

  //     setIsAnimating(false);
  //   };
  //   if (!isAnimating) {
  //     setIsAnimating(true);
  //     requestAnimationFrame(updateAnimation);
  //   }
  // }, [mousePosition, isAnimating]);
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexGrow: 1,
        position: 'relative',
      }}
    >
      <video autoPlay loop muted id="videobg">
        <source src={backgroundvideo} />
      </video>
    </Box>
  );
};
