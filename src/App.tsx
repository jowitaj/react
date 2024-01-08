import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './components/UserList';
import CommentList from './components/CommentList';
import TodoList from './components/TodoList';
import News from './components/News';

const App: React.FC = () => {
  return (
    <Router> 
      
      <div>
        <nav>
          <ul>
          <li><Link id="id1" to="/news">News</Link></li>
            <li><Link id="id2" to="/users">Workmates</Link></li>
            <li><Link id="id3" to="/comments">Discussion</Link></li>
            <li><Link id="id6" to="/todos">ToDo</Link></li>
          </ul>
        </nav>

        <Routes>
        <Route path="/news" element={<News />} />
               <Route path="/users" element={<UserList />} />
               <Route path="/comments" element={<CommentList />} />
               <Route path="/todos" element={<TodoList />} />
</Routes>

      </div>
    </Router>
  );
};

export default App;
