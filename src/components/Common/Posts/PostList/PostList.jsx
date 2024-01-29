import React, { useContext, useEffect } from "react";
import { PostsContext } from "../../Posts/PostContext/PostContext";
import Postcard from "../PostCard/PostCards";
import InfiniteScroll from "react-infinite-scroll-component";
import { Row, Col } from "react-bootstrap";

const PostList = () => {
  const { posts, hasMore, setPage, searchTerm } = useContext(PostsContext);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, setPage]);

  const filteredPosts = searchTerm
    ? posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;

  return (
    <InfiniteScroll
      dataLength={filteredPosts.length}
      next={() => setPage(prevPage => prevPage + 1)}
      hasMore={hasMore}
      loader={<h4 className="text-center m-2">Loading...</h4>}
    >
      <Row>
        {filteredPosts.map((post, index) => (
          <Col key={post.id || index} xs={12} md={6} lg={4} className="mb-4">
            <Postcard post={post} />
          </Col>
        ))}
      </Row>
    </InfiniteScroll>
  );
};

export default PostList;