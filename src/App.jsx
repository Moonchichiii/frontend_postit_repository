import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Authentication/Routing/ProtectedRoute';
import LandingPage from './Pages/LandingPage/LandingPage';         
import { PostsProvider } from './components/Common/Posts/PostContext/PostContext';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";



const Dashboard = lazy(() => import('./Pages/DashBoard/DashBoard'));

function App() {

  
  return (
    <Router>
       <PostsProvider>
      <Suspense fallback={<div className='text-center'><h4>Loading.....</h4></div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
        </Routes>
      </Suspense>
      </PostsProvider>
    </Router>
  );
};



export default App;
