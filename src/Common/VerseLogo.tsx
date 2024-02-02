import React from 'react';

export const VerseLogo = () => {
  /*const fetchLogo = (fileName, i) => {
    for (let i = 0; i<10; i++) {
      fileName.push(`verselogo-${i}.png`)
    }
    return fileName;
  };*/

  function logoRandom() {
    const i = Math.floor(Math.random() * 10);
    return `../Assets/VerseLogos/verselogo-${i}.png`;
  }

  return (
    <img src={logoRandom()} alt="Verse Logo" />
    /*<img src={fetchLogo} alt="Verse Logo" />*/
  );
};
