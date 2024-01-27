import React, { createContext, useState, useEffect } from "react";
import { axiosPublicInstance } from "../../../../Api/AxiosDefaults";
import { useSearch } from "../../Searchbar/SearchContext";

export const PostListContext = createContext();

export const PostListProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { searchTerm } = useSearch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = `/posts/?page=${page}`;
        const response = await axiosPublicInstance.get(url);
        let fetchedPosts = response.data.results;

        if (searchTerm) {
          fetchedPosts = fetchedPosts.filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setHasMore(fetchedPosts.length > 0);
        setPosts((prev) =>
          page === 1 ? fetchedPosts : [...prev, ...fetchedPosts]
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
        setHasMore(false);
      }
    };

    fetchPosts();
  }, [page, searchTerm]);
  return (
    <PostListContext.Provider value={{ posts, setPosts, hasMore, setPage }}>
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
