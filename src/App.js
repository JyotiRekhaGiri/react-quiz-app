import React from 'react';
// import Nav from './Nav';
import Navbar from './Component/Navbar';
import Footer from './Component/Foote';
import Quiz from './Component/Quiz';

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <Quiz />
      <Footer />
    </div>
  );
};

export default App;