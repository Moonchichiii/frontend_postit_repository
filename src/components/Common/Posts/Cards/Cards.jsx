import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";

function Postcard({ post, isSuperuser }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!post) {
    return <div className="text-center">Posts Loading....</div>;
  }

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.error("Error loading image:", post.image);
  };

  return (
    <Card
      style={{
        width: "18rem",
        marginBottom: "1rem",
        opacity: post.published ? "1" : "0.5"
      }}
    >
      <Card.Img
        variant="top"
        src={post.image || "default-image-url.jpg"}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: imageLoaded ? "block" : "none" }}
      />

      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>

        <p>Posted by: {post.profile.username}</p>

        <p>Cooking time: {post.time} minutes</p>

        {isSuperuser ? (
          post.published ? (

            <Button variant="primary">Read more</Button>
            
          ) : (
            <Button variant="success">Approve & Publish</Button>
          )
        ) : post.published ? (
          <Button variant="primary">Read more</Button>
        ) : (
          <Button variant="secondary" disabled>
            Unpublished
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Postcard;
