import React, { useState } from 'react';
import { createPost } from '../services/PostService';
import { Post } from '../models/Post';
import { Photo } from '../models/Photo'; 

interface CreatePostFormProps {
  onPostCreated: () => void;
  photos: Photo[]; 
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated, photos }) => {
  const [post, setPost] = useState<Post>({ id: 0, title: '', body: '', photoId: 0 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost(post);
    onPostCreated();
    setPost({ id: 0, title: '', body: '', photoId: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <br></br>
        <input
          type="text"
          value={post.title}
          onChange={e => setPost({ ...post, title: e.target.value })}
        />
      </div>
      <br></br>
      <div>
        <label>Text:</label>
        <br></br>
        <textarea
          value={post.body}
          onChange={e => setPost({ ...post, body: e.target.value })}
        />
      </div>
      <br></br>
      <div>
        <label>Photo:</label>
        <br></br>
        <select
          value={post.photoId}
          onChange={e => setPost({ ...post, photoId: parseInt(e.target.value, 10) })}
        >
          {photos.map(photo => (
            <option key={photo.id} value={photo.id}>
              {photo.title}
            </option>
          ))}
        </select>
      </div>
      <br></br>
      <button type="submit">Create Post</button>
      <br></br>
    </form>
  );
};

export default CreatePostForm;
