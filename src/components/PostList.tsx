import React, { useEffect, useState } from 'react';
import { fetchPosts, deletePost } from '../services/PostService';
import { fetchPhotos } from '../services/PhotoService';
import { Post } from '../models/Post';
import { Photo } from '../models/Photo';
import CreatePostForm from './CreatePostForm';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchData = async () => {
    const newPosts = await fetchPosts();
    const newPhotos = await fetchPhotos();
    setPosts(newPosts);
    setPhotos(newPhotos);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await deletePost(id);
    fetchData(); 
  };

  const findPhotoUrlById = (photoId: number) => {
    const photo = photos.find(p => p.id === photoId);
    return photo ? photo.url : '';
  };

  const styles = {
    container: {
      backgroundColor: '#f0f0f0',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      width: '940px',
      marginLeft: '8px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#F0F0F0',
      padding: '0px 0px',
    },
    postTitle: {
      fontWeight: 'bold',
      fontSize: '24px',
      margin: '20px 0',
      color: '#333',
    },
    post: {
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
        <h1>POSTS</h1>
      </div>
      <CreatePostForm onPostCreated={fetchData} photos={photos} />
      {posts.map(post => (
        <div key={post.id} style={styles.post}>
          <h2 style={styles.postTitle}>{post.title}</h2>
          <p>{post.body}</p>
          {post.photoId && <img src={findPhotoUrlById(post.photoId)} alt={post.title} />}
          <button style={styles.button} onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
