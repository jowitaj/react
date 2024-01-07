import React, { useEffect, useState } from 'react';
import { Todo } from '../models/Todo';
import { fetchTodos, deleteTodo } from '../services/TodoService';
import CreateTodoForm from './CreateTodoForm';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const newTodos = await fetchTodos();
    setTodos(newTodos);
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    loadTodos();
  };

  const styles = {
    container: {
      width: '700px',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#F0F0F0',
      padding: '0px 0px',
    },
    todoTitle: {
      fontWeight: 'bold',
      fontSize: '24px',
      margin: '20px 0',
      color: '#333',
    },
    todo: {
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
        <h1>TODO</h1>
      </div>
      <CreateTodoForm onTodoCreated={loadTodos} />
      {todos.map(todo => (
        <div key={todo.id} style={styles.todo}>
          <p style={styles.todoTitle}>{todo.title} - {todo.completed ? 'Completed' : 'Not Completed'}</p>
          <button style={styles.button} onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
