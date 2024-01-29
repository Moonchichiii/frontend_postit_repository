import React from "react";
import Navigation from "../../components/Common/NavBar/Navbar";
import Searchbar from "../../components/Common/Searchbar/Searchbar";
import PostList from "../../components/Common/Posts/PostList/PostList";
import { PostsProvider } from "../../components/Common/Posts/PostContext/PostContext";

const LandingPage = () => {
  return (
    <PostsProvider>
      <div className="landing-page">
        <Navigation />
        <main>
          <h1 className="text-center">Recipe Search</h1>
          <Searchbar />
          <PostList />
        </main>
      </div>
    </PostsProvider>
  );
};

export default LandingPage;
