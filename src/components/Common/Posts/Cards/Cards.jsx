import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Postcard({ post }) {
  if (!post) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <Card style={{ width: "18rem", marginBottom: "1rem" }}>
      <Card.Img variant="top" src={post.image || "default-image-url.jpg"} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default Postcard;
