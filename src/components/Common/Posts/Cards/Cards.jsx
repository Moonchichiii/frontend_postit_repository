import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Postcard({ post }) {
  if (!post) {
    return <div className="text-center"></div>;
  }

  return (
    <Card style={{ width: "18rem", marginBottom: "1rem" }}>
      {post.image && <Card.Img variant="top" src={post.image} />}

      <Card.Body>
        <Card.Title>{post.title}</Card.Title>

        <Card.Text>{post.content}</Card.Text>

        {post.user && (
          <div>
            <Card.Text>Profile: {post.user.username}</Card.Text>

            {post.user.profile && (
              <Card.Img
                variant="top"
                src={post.user.profile.profile_image}
                alt={`${post.user.username}'s Profile`}
                style={{ maxWidth: "50px" }}
              />
            )}
          </div>
        )}

        <Button variant="primary">Read more</Button>

        
      </Card.Body>
    </Card>
  );
}

export default Postcard;
