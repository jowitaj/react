
import React, { useEffect, useState } from 'react';
import { Comment } from '../models/Comment';
import { fetchComments, deleteComment } from '../services/CommentService';
import CreateCommentForm from './CreateCommentForm';

const CommentList: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    const newComments = await fetchComments();
    setComments(newComments);
  };

  const handleDelete = async (id: number) => {
    await deleteComment(id);
    loadComments();
  };

  const styles = {
    container: {
      backgroundColor: '#f0f0f0',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      width: '700px',
     
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#F0F0F0',
      padding: '0px 0px',
    },
    commentTitle: {
      fontWeight: 'bold',
      fontSize: '24px',
      margin: '20px 0',
      color: '#333',
    },
    comment: {
      backgroundColor: 'white',
      padding: '10px',
      marginTop: '10px',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    button: {
      backgroundColor: '#333333',
      color: 'white',
      border: '1px solid #333333',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>COMMENTS</h1>
      </div>
      <div style={styles.commentTitle}>Create Comment</div>
      <CreateCommentForm onCommentCreated={loadComments} />
      {comments.map(comment => (
        <div key={comment.id} style={styles.comment}>
          <p>{comment.body}</p>
          <button style={styles.button} onClick={() => handleDelete(comment.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
