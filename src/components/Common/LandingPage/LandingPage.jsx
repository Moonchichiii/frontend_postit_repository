import React, { useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import PostList from '../Posts/PostList';
import Postcard from '../Posts/Cards/Cards'
import { PostsProvider } from '../Posts/PostContext';
import Navigation from '../NavBar/Navbar';

const LandingPage = () => {
  
  

  return (
    <PostsProvider>
      <div className="landing-page">
        <Navigation />
        <h1>LandingPage</h1>                
        <Searchbar />
        <PostList />
        <Postcard />
      </div>
    </PostsProvider>
  );
};

export default LandingPage;

