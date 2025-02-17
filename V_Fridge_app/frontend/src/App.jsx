import React, { useState } from 'react';
import MyFridge from './pages/myfridge';
import './App.css';
import RecipeItem from './components/recipeItem';
import ScrollableWindow from './components/recipeHist';
import Chatbot from './components/chatbot';
import NavBar from './components/navbar';

function App() {
  const [activeComponent, setActiveComponent] = useState('myfridge');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'myfridge':
        return <MyFridge />;
      case 'recipes':
        return (
          <div style={{ flex: 1 }}>
            <ScrollableWindow />
          </div>
        );
      default:
        return <MyFridge />;
    }
  };

  return (
    <>
      <NavBar onNavClick={setActiveComponent} />
      <div style={{ display: 'flex', height: '100vh', width: '70vw' }}>
        {renderComponent()}
        <div style={{ flex: 1 }}>
          <Chatbot />
        </div>
      </div>
    </>
  );
}

export default App;
