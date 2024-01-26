import React, { useEffect} from 'react';
import { Accordion } from 'react-bootstrap';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { useComments } from './CommentsContext';

function CommentAccordion({ postId }) {
  const { comments, fetchComments, addComment, editComment, deleteComment } = useComments();


  const handleCommentSubmit = (commentText) => {
    console.log&(postId, commentText);
    addComment(postId, commentText);
  };

  useEffect(() => {
    fetchComments(postId);
    console.log(postId);
  }, [postId, fetchComments]);

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Comments</Accordion.Header>
        <Accordion.Body>
          <CommentList comments={comments} postId={postId} />          
          <CommentForm postId={postId} onCommentSubmit={handleCommentSubmit} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default CommentAccordion;
