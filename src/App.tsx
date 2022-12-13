import React from 'react';
import './App.css';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';

export default function App() {
  return (
    <CssVarsProvider>
      <Sheet variant="outlined">Welcome!</Sheet>
    </CssVarsProvider>
  );
}
