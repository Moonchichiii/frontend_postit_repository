import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {  AuthProvider } from './components/Authentication/AuthContext.jsx';


import { ProfileProvider } from './components/Common/Profile/ProfileContext.jsx';

import { FollowerProvider } from './components/Common/followers/FollowersContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
      

      {/* <ProfileProvider> */}
      <FollowerProvider> 
    <App />
    </FollowerProvider>
  {/* </ProfileProvider> */}
      
      </AuthProvider>  

  </React.StrictMode>
)


