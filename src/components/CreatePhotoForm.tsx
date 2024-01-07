import React, { useState } from 'react';
import { createPhoto } from '../services/PhotoService';
import { Photo } from '../models/Photo';

interface CreatePhotoFormProps {
  onPhotoCreated: () => void;
}

const CreatePhotoForm: React.FC<CreatePhotoFormProps> = ({ onPhotoCreated }) => {
  const [photo, setPhoto] = useState<Photo>({ id: 0, albumId: 1, title: '', url: '', thumbnailUrl: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPhoto(photo);
    onPhotoCreated();
    setPhoto({ id: 0, albumId: 1, title: '', url: '', thumbnailUrl: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <br></br>
        <input
          type="text"
          value={photo.title}
          onChange={e => setPhoto({ ...photo, title: e.target.value })}
        />
      </div>
      <br></br>
      <div>
        <label>URL:</label>
        <br></br>
        <input
          type="text"
          value={photo.url}
          onChange={e => setPhoto({ ...photo, url: e.target.value })}
        />
      </div>
      <br></br>
      <div>
        <label>Thumbnail URL:</label>
        <br></br>
        <input
          type="text"
          value={photo.thumbnailUrl}
          onChange={e => setPhoto({ ...photo, thumbnailUrl: e.target.value })}
        />
      </div>
      <br></br>
      <button type="submit">Create Photo</button>
      <br></br>
    </form>
  );
};

export default CreatePhotoForm;
