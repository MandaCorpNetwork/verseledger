import type React from 'react';
export const EmptySpace: React.FC = () => {
  return (
    <div
      style={{
        width: '45px',
        height: '45px',
        borderRadius: '10px',
        border: '1px solid',
        borderColor: 'rgba(0,0,0)',
        backgroundImage: 'linear-gradient(120deg, rgba(120,120,120), rgba(60,60,60))',
        boxShadow:
          'inset 0 2px 5px rgba(255, 255, 255, 0.3), inset 0 -2px 5px rgba(0, 0, 0, 0.4), 0px 4px 8px rgba(0, 0, 0, 0.3)',
        opacity: '0.8',
      }}
    />
  );
};
