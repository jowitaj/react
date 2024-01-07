import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostList from './components/PostList';
import UserList from './components/UserList';
import CommentList from './components/CommentList';
import AlbumList from './components/AlbumList';
import PhotoList from './components/PhotoList';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <Router> 
      
      <div>
        <nav>
          <ul>
            <li><Link id="id1"  to="/posts">Posts</Link></li>
            <li><Link id="id2" to="/users">Workmates</Link></li>
            <li><Link id="id3" to="/comments">Discussion</Link></li>
            <li><Link id="id4" to="/albums">Albums</Link></li>
            <li><Link id="id5" to="/photos">Photos</Link></li>
            <li><Link id="id6" to="/todos">ToDo</Link></li>
          </ul>
        </nav>

        <Routes>
               <Route path="/posts" element={<PostList />} />
               <Route path="/users" element={<UserList />} />
               <Route path="/comments" element={<CommentList />} />
               <Route path="/albums" element={<AlbumList />} />
               <Route path="/photos" element={<PhotoList />} />
               <Route path="/todos" element={<TodoList />} />
</Routes>

      </div>
    </Router>
  );
};

export default App;
