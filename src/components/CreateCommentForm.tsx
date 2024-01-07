import React, { useState } from 'react';
import { createComment } from '../services/CommentService';
import { Comment } from '../models/Comment';

interface CreateCommentFormProps {
  onCommentCreated: () => void;
}

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({ onCommentCreated }) => {
  const [comment, setComment] = useState<Comment>({ id: 0, postId: 1, name: '', email: '', body: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createComment(comment);
    onCommentCreated();
    setComment({ id: 0, postId: 1, name: '', email: '', body: '' }); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <br></br>

        <input
          type="text"
          value={comment.name}
          onChange={e => setComment({ ...comment, name: e.target.value })}
        />
      </div>
      <br></br>
      <div>
        <label>Email:</label>
        <br></br>

        <input
          type="email"
          value={comment.email}
          onChange={e => setComment({ ...comment, email: e.target.value })}
        />
      </div>
      <br></br>

      <div>
        <label>Text:</label>
        <br></br>

        <textarea
          value={comment.body}
          onChange={e => setComment({ ...comment, body: e.target.value })}
        />
      </div>
      <br></br>

      <button type="submit">Create</button>
      <br></br>

    </form>
  );
};

export default CreateCommentForm;
