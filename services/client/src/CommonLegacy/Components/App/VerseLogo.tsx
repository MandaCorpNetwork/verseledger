import React from 'react';
import { useLocation } from 'react-router';

const VerseLogo = () => {
  const imgRef = React.useRef<HTMLImageElement>(null);
  const location = useLocation();

  React.useEffect(() => {
    function getLogoPath(pathname: string) {
      switch (pathname) {
        case '/':
          return '/Assets/media/VerseLogos/verselogo-0.png';
        case '/ledger/contract':
          return '/Assets/media/VerseLogos/verselogo-1.png';
        default:
          return '/Assets/media/VerseLogos/verselogo-6.png';
      }
    }
    if (imgRef.current) {
      const logoPath = getLogoPath(location.pathname);
      imgRef.current.src = logoPath;
    }
  }, [location.pathname]);

  return <img ref={imgRef} alt="Verse Logo" />;
};

export default React.memo(VerseLogo);
