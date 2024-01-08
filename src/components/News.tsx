import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/PostService';
import { fetchPhotos } from '../services/PhotoService';
import { fetchAlbums } from '../services/AlbumService';
import { fetchUsers } from '../services/UserService';
import CreateCommentForm from './CreateCommentForm';

import { Post } from '../models/Post';
import { Photo } from '../models/Photo';
import { Album } from '../models/Album';
import { User } from '../models/User';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const postsData = await fetchPosts();
      const photosData = await fetchPhotos();
      const albumsData = await fetchAlbums();
      const usersData = await fetchUsers();
      setPosts(postsData.slice(0, 2));
      setPhotos(photosData);
      setAlbums(albumsData);
      setUsers(usersData);
    };
    loadData();
  }, []);

  const findPhotoByPostId = (postId: number) => {
    return photos.find(photo => photo.albumId === postId);
  };

  const findAlbumByPhotoId = (photoId: number) => {
    return albums.find(album => album.id === photoId);
  };

  const findUserByPostId = (userId: number) => {
    return users.find(user => user.id === userId);
  };

  const getRandomUser = () => {
    if (users.length > 0) {
      return users[Math.floor(Math.random() * users.length)];
    }
    return null;
  };


  const styles = {
    container: {
      backgroundColor: '#f0f0f0',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      width: '940px',
      marginLeft: '8px',
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
  };

  return (
    <div style={styles.container}>
      <h1>NEWS</h1>
      {posts.map(post => {
        const photo = findPhotoByPostId(post.id);
        const album = photo ? findAlbumByPhotoId(photo.id) : null;
        const randomUser = getRandomUser();
        return (
          <div key={post.id} style={styles.post}>
            <h5 style={styles.postTitle}>{post.title}</h5>
            {photo && (
              <img
                src={photo.thumbnailUrl}
                alt={post.title}
                className="img-fluid"
                style={{ maxWidth: '200px' }}
              />
            )}
            <p className="card-text">{post.body}</p>
            {album && <p className="card-text">Album: {album.title}</p>}
            {randomUser && <p className="card-text">Author: {randomUser.name}</p>}
            <CreateCommentForm onCommentCreated={() => {}} />
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
