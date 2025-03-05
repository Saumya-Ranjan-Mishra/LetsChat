import React from 'react';
import ChatToggle from './pages/ChatPage/initiateChat';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { useState } from 'react';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  return (
    <div>
      <h1>Welcome to LetsChat app</h1>
      <h5>The chat here is end to end encrypted. Even LetsChat cannot read it</h5>
      {isUserLoggedIn ? (<ChatToggle setIsUserLoggedIn={setIsUserLoggedIn} />) : (<LoginPage setIsUserLoggedIn={setIsUserLoggedIn}/>)}
    </div>
  );
}

export default App;
