import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Users from './components/Users';
import Loader from './components/Loader';
import { Toaster } from 'react-hot-toast';

function App() {

  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Header />
      {
        loading && <Loader />
      }
     <Users setLoading={setLoading}/>
      <Toaster />
     
    </div>
  );
}

export default App;
