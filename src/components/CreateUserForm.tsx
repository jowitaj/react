import React, { useState } from 'react';
import { createUser } from '../services/UserService';
import { User } from '../models/User';

interface CreateUserFormProps {
  onUserCreated: () => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onUserCreated }) => {
  const [user, setUser] = useState<User>({ id: 0, name: '', username: '', email: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(user);
    onUserCreated();
    setUser({ id: 0, name: '', username: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <br></br>
        <input
          type="text"
          value={user.name}
          onChange={e => setUser({ ...user, name: e.target.value })}
        />
      </div>
      <br></br>
      <div>
        <label>Username:</label>
        <br></br>
        <input
          type="text"
          value={user.username}
          onChange={e => setUser({ ...user, username: e.target.value })}
        />
      </div>
      <br></br>
      <div>
        <label>Email:</label>
        <br></br>
        <input
          type="email"
          value={user.email}
          onChange={e => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <br></br>
      <button type="submit">Create User</button>
      <br></br>
      <br></br>
      
    </form>

    
  );
};

export default CreateUserForm;
