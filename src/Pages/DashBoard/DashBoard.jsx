import React from "react";
import { useAuth } from "../../components/Authentication/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Searchbar from "../../components/Common/Searchbar/Searchbar";
import PostList from "../../components/Common/Posts/PostList/PostList";
import Navigation from "../../components/Common/NavBar/Navbar";
import ProfileManagerModal from "../../components/Common/Profile/ProfileManagerModal";
import { PostsProvider } from "../../components/Common/Posts/PostContext/PostContext";

const Dashboard = () => {
  const { token } = useAuth();

  return token ? (
    <PostsProvider>
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
    </PostsProvider>
  ) : (
    <Navigate to="/" />
  );
};

export default Dashboard;
