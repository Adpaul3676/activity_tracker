import React from 'react';
import './App.css';
import routes from './routes';
import Nav from './components/nav/nav';

function App() {
  return (
    <div className='App'>
      <Nav></Nav>
      {routes}
    </div>
  )
};

export default App;
