import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateUserForm from './CreateUserForm';
import { deleteUser } from '../services/UserService';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    loadUsers();
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
    userTitle: {
      fontWeight: 'bold',
      fontSize: '14px',
      color: '#333',
    },
    user: {
      padding: '0px',
      borderRadius: '0px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      listStyleType: 'none',
    },
  
    button: {
      backgroundColor: '#333333',
      marginBottom:'20px',
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
        <h1>WORKMATES</h1>
      </div>
      <CreateUserForm onUserCreated={loadUsers} />
      <div>
    {users.map(user => (
    <div key={user.id}>
      <p style={styles.userTitle}>{user.name} - {user.email}</p>
      <button style={styles.button} onClick={() => handleDelete(user.id)}>Delete</button>
    </div>
   ))}
</div>
    </div>
  );
};

export default UserList;
