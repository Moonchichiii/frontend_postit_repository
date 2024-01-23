import React, { useState } from "react";
import { useAuth } from "../../Authentication/AuthContext";
import { Navigate } from "react-router-dom";
import { PostsProvider} from "../Posts/PostContext"

import Searchbar from '../Searchbar/Searchbar';


import PostList from '../Posts/PostList';
import Postcard from '../Posts/Cards/Cards'


import Navigation from '../NavBar/Navbar';


const Dashboard = () => {
  const { token, logOut } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    token ? (
      <PostsProvider>
        <div>
        <Navigation />
          <h1>Dashboard</h1>
          
          <Searchbar onSearch={setSearchTerm} />
          <PostList searchTerm={searchTerm} />
          <PostList />
          <Postcard />         
          
        </div>
      </PostsProvider>
    ) : (
      <Navigate to="/" />
    )
  );
};

export default Dashboard;
