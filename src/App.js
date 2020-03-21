import React from 'react';
import {Route} from 'react-router-dom';

import Home from './pages/Home';



export default function App() {
  return ( 
    <div className = "App">
      <Route exact path="/" component={Home} />
    </div>
  );
}