import React from "react";
import { useAuth } from "../../components/Authentication/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom"; 
import Searchbar from "../../components/Common/Searchbar/Searchbar";
import PostList from "../../components/Common/Posts/PostList/PostList";

import Navigation from "../../components/Common/NavBar/Navbar";
import ProfileManagerModal from "../../components/Common/Profile/ProfileManagerModal"; 

import { PostListProvider } from "../../components/Common/Posts/PostList/PostListContext";
import { PostsProvider } from "../../components/Common/Posts/PostContext/PostContext";
import { SearchProvider } from "../../components/Common/Searchbar/SearchContext";

const Dashboard = () => {
  const { token } = useAuth();

  return token ? (
    <PostsProvider>
      <SearchProvider>
        <PostListProvider>
          <div>
            <Navigation />
            <Routes>
              <Route path="/profile" element={<ProfileManagerModal />} /> 
            </Routes>
            <main>
              <h1 className="text-center">Recipe Search</h1>
              <Searchbar />
              <PostList />
            </main>
          </div>
        </PostListProvider>
      </SearchProvider>
    </PostsProvider>
  ) : (
    <Navigate to="/" />
  );
};

export default Dashboard;