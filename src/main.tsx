import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App.tsx';
import AppLoader from './components/AppLoader.tsx';
import './index.css';

function Root() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <AppLoader onDone={() => setLoaded(true)} />}
      {loaded && (
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      )}
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
