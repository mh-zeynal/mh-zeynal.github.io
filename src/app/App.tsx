import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BaseLayout } from 'components/layout/BaseLayout';
import { ErrorPage } from 'views/ErrorPage';
import { HomePage } from 'views/HomePage';

function App() {
  useEffect( () => {
    const leafletScript: HTMLScriptElement = document.createElement( 'script' );

    leafletScript.src = 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.js';
    leafletScript.integrity = 'sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==';
    leafletScript.crossOrigin = '';

    document.body.appendChild( leafletScript );
  }, [] );

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
