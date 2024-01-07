import React, { useEffect, useState } from 'react';
import { Album } from '../models/Album';
import { fetchAlbums, deleteAlbum } from '../services/AlbumService';
import CreateAlbumForm from './CreateAlbumForm';

const AlbumList: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    const newAlbums = await fetchAlbums();
    setAlbums(newAlbums);
  };

  const handleDelete = async (id: number) => {
    await deleteAlbum(id);
    loadAlbums();
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
    albumTitle: {
      fontWeight: 'bold',
      fontSize: '24px',
      margin: '20px 0',
      color: '#333',
    },
    album: {
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
        <h1>ALBUMS</h1>
      </div>
      <div style={styles.albumTitle}>Create Album</div>
      <CreateAlbumForm onAlbumCreated={loadAlbums} />
      {albums.map(album => (
        <div key={album.id} style={styles.album}>
          <p>{album.title}</p>
          <button style={styles.button} onClick={() => handleDelete(album.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
