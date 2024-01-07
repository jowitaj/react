import React, { useEffect, useState } from 'react';
import { Photo } from '../models/Photo';
import { fetchPhotos, deletePhoto } from '../services/PhotoService';
import CreatePhotoForm from './CreatePhotoForm';

const PhotoList: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    const newPhotos = await fetchPhotos();
    setPhotos(newPhotos);
  };

  const handleDelete = async (id: number) => {
    await deletePhoto(id);
    loadPhotos(); 
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
    photoTitle: {
      fontWeight: 'bold',
      fontSize: '24px',
      margin: '20px 0',
      color: '#333',
    },
    photo: {
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
        <h1>PHOTOS</h1>
      </div>
      <div style={styles.photoTitle}>Create Photo</div>
      <CreatePhotoForm onPhotoCreated={loadPhotos} />
      {photos.map(photo => (
        <div key={photo.id} style={styles.photo}>
          <p>{photo.title}</p>
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <button style={styles.button} onClick={() => handleDelete(photo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PhotoList;
