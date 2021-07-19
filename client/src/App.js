import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Prueba from './components/Prueba';
import NavBar  from './components/NavBar';
import Formulary from './components/Form';
export default function App() {return(
  <Router>
    <Route path='/welcome'>
      <NavBar/>
      <Prueba/>
    </Route>
    <Route exact path='/newrecipe'>
      <Formulary/>
    </Route>
  </Router>
)}
