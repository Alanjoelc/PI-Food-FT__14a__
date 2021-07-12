import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Prueba from './components/Prueba';
import NavBar  from './components/NavBar';


export default function App() {return(
  <Router>
    <NavBar/>
    <Route path='/xd'>
      <Prueba/>
    </Route>
  </Router>
)}
