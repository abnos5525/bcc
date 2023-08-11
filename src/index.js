import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import './style.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Books from './components/Books/Books';
import Book from './components/Books/Book';
import EditBook from './components/Books/EditBook';
import AddBook from './components/Books/AddBook';
import 'react-confirm-alert/src/react-confirm-alert.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='/books' element={<Books/>}>

          <Route path='/books/:id' element={<Book/>} />
          <Route path='/books/edit/:id' element={<EditBook/>} />
          <Route path='/books/add' element={<AddBook/>} />
          </Route>
          
        </Route>
        <Route path='*' element={<Navigate to={'/'}/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
