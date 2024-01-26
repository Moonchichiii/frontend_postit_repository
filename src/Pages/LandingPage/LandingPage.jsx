import React, { useContext } from 'react';
import Searchbar from '../../components/Common/Searchbar/Searchbar';
import PostList from '../../components/Common/Posts/PostList/PostList';
import Navigation from '../../components/Common/NavBar/Navbar';




import { PostsProvider } from "../../components/Common/Posts/PostContext/PostContext";

import { PostListProvider } from "../../components/Common/Posts/PostList/PostListContext";

import { SearchProvider } from '../../components/Common/Searchbar/SearchContext';

const LandingPage = () => {

  return (
    <PostsProvider>
    <SearchProvider>
      <PostListProvider>
        <div className="landing-page">
          <Navigation />
          <main>
            <h1 className="text-center">Recipe Search</h1>
            <Searchbar />
            <PostList />
          </main>
        </div>
      </PostListProvider>
    </SearchProvider>
  </PostsProvider>
);
};
export default LandingPage;
