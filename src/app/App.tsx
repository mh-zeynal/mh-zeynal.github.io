import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BaseLayout } from 'components/layout/BaseLayout';
import { ErrorPage } from 'views/ErrorPage';
import { HomePage } from 'views/HomePage';
import { ForecastPage } from 'views/ForecastPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path='forecast' element={<ForecastPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
