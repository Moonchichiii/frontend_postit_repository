import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Postcard from "../PostCard/PostCards";
import { useContext, useEffect } from "react";
import { PostListContext } from "../PostList/PostListContext";
import { Row, Col } from "react-bootstrap";

import { useSearch } from "../../Searchbar/SearchContext";

const PostList = () => {
  const { posts, hasMore, setPage } = useContext(PostListContext);
  const { searchTerm } = useSearch();

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={() => setPage((prevPage) => prevPage + 1)}
      hasMore={hasMore}
      loader={<h4 className="text-center m-2">Loading...</h4>}
    >
      <Row>
        {posts.map((post, index) => (
          <Col key={post.id || index} xs={12} md={6} lg={4} className="mb-4">
            <Postcard post={post} />
          </Col>
        ))}
      </Row>
    </InfiniteScroll>
  );
};
export default PostList;
