// a react app that renders the App component into the DOM
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const root = createRoot(document.getElementById('root')!);

root.render(<App />);