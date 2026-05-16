import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouletteApp } from './ui/RouletteApp';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouletteApp />
  </React.StrictMode>,
);
