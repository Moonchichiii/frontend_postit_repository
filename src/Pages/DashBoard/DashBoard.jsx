import React, { useState } from "react";
import { useAuth } from "../../components/Authentication/AuthContext";
import { Navigate } from "react-router-dom";
import Searchbar from '../../components/Common/Searchbar/Searchbar';
import PostList from '../../components/Common/Posts/PostList/PostList';
import Postcard from '../../components/Common/Posts/Cards/Cards';
import Navigation from '../../components/Common/NavBar/Navbar';


const Dashboard = () => {
  const { token, logOut } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    token ? (
      <div>
          <Navigation />
          <h1 className="text-center">Recipe Search</h1>
          <main>
          <Searchbar onSearch={setSearchTerm} />
          <PostList searchTerm={searchTerm} />
          <Postcard />
          </main>

      </div>
    ) : (
      <Navigate to="/" />
    )
  );
};

export default Dashboard;
