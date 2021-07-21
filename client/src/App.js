import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Prueba from './components/Prueba';
import NavBar  from './components/NavBar';
import Formulary from './components/Form';
import GoTo from './components/GoTo';
import Home from './components/Home';
import Detail from './components/Detail';

export default function App() {return(
  <Router>
    <Route exact path='/'>
      <Home/>
    </Route>
    <Route path='/welcome'>
      <NavBar/>
    </Route>
    <Route path='/welcome'>
      <Prueba/>
    </Route>
    <Route path='/card'>
      <GoTo/>
      <Detail/>
    </Route>
    <Route exact path='/newrecipe'>
      <GoTo/>
      <Formulary/>
    </Route>
  </Router>
)}
