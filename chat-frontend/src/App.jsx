import { useEffect, useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar"
import {Routes, Route, Navigate} from "react-router-dom"
import HomePage from './pages/HomePage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SignupPage from './pages/SignupPage'
import { checkForUserAuthentication } from './stateManager/auth.statemanager'

function App() {
  const {authenticatedUser, checkIfUserIsAuthenticated, isCheckingForAuthentication} = checkForUserAuthentication();

  //run it on every render
  useEffect(() => 
  {
    checkIfUserIsAuthenticated()
  }, [checkIfUserIsAuthenticated])

  if(isCheckingForAuthentication && !authenticatedUser)
  {
    return(
      <div>checking for authentication</div>
    )
  }

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={authenticatedUser? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!authenticatedUser? <LoginPage /> : <Navigate to = "/"/>} />
          <Route path="/signup" element={!authenticatedUser? <SignupPage /> : <Navigate to="/" />} />
          <Route path="/setting" element={<SettingsPage />} />
          <Route path="/profile" element={ authenticatedUser?  <ProfilePage />  : <Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  )
}

export default App
