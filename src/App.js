import './App.css';
import { BrowserRouter ,Route, Routes} from "react-router-dom";
import Glowna from "./strona/Glowna"
import Losowe, {MoviePage} from './strona/Losowe';
import Top from './strona/Top';
import Wyszukiwanie from './strona/Wyszukiwanie';
import React, { useState, useEffect } from 'react';

function App() {


   
  

  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes >
        <Route path="/Glowna" index element={<Glowna/>}/>
          <Route path="/top" element={<Top/>}/>
          <Route path="/losowe" element={<Losowe/>} >
          <Route path="movie/:title" element={<MoviePage/>}/>
          </Route>
          <Route path="/wyszukiwanie" element={<Wyszukiwanie/>}/>
        
      </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;


