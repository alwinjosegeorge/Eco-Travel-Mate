import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LocationProvider } from './hooks/useUserLocation'

createRoot(document.getElementById("root")!).render(
  <LocationProvider>
    <App />
  </LocationProvider>
);
