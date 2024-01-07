import React, { useState } from 'react';
import { createTodo } from '../services/TodoService';
import { Todo } from '../models/Todo';

interface CreateTodoFormProps {
  onTodoCreated: () => void;
}

const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onTodoCreated }) => {
  const [todo, setTodo] = useState<Todo>({ id: 0, userId: 1, title: '', completed: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTodo(todo);
    onTodoCreated();
    setTodo({ id: 0, userId: 1, title: '', completed: false }); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <br></br>
        <input
          type="text"
          value={todo.title}
          onChange={e => setTodo({ ...todo, title: e.target.value })}
        />
      </div>
      <br></br>
      <div>
        <label>
          Completed:
          <br></br>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={e => setTodo({ ...todo, completed: e.target.checked })}
          />
        </label>
        <br></br>
        <br></br>
      </div>
      <button type="submit">Create Todo</button>
      <br></br>
    </form>
  );
};

export default CreateTodoForm;
