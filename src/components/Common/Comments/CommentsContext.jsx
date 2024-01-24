import axios from 'axios';
    

const getCommentsForPost = async (postId) => {
    try {
      const response = await axios.get(`/api/posts/${postId}/comments/`);
      const comments = response.data;
      
      console.log('Comments:', comments);
    } catch (error) {
      console.error('Error retrieving comments:', error);
    }
  };
  
  
  getCommentsForPost(postId);