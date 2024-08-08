import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Shorter from './components/Shorter';
import Rdir from './components/Rdir';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:shortUrl" element={<Rdir />} />
        <Route path="/" element={<Shorter />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
