import React, { useState } from 'react';
import { createAlbum } from '../services/AlbumService';
import { Album } from '../models/Album';

interface CreateAlbumFormProps {
  onAlbumCreated: () => void;
}

const CreateAlbumForm: React.FC<CreateAlbumFormProps> = ({ onAlbumCreated }) => {
  const [album, setAlbum] = useState<Album>({ id: 0, userId: 1, title: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createAlbum(album);
    onAlbumCreated();
    setAlbum({ id: 0, userId: 1, title: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <br></br>
        <input
          type="text"
          value={album.title}
          onChange={e => setAlbum({ ...album, title: e.target.value })}
        />
      </div>
      <br></br>
      <button type="submit">Create Album</button>
    </form>
    
  );
};

export default CreateAlbumForm;
