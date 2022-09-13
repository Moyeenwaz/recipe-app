import React from 'react';
import Home from './Home';
import Cuisine from './Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const Pages = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="cuisine/:type" element={<Cuisine />}></Route>
          <Route path="searched/:search" element={<Searched />}></Route>
          <Route path="recipe/:id" element={<Recipe />}></Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default Pages;
