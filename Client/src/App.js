import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form/Form';
import Table from './components/Table/Table';
import Auth from './components/Auth/Auth';
import Axios from 'axios';
import { auth } from './components/firebase/firebase';

function App() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [booksData, setBooksData] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        loadBooks();
      }
    });

    return () => unsubscribe();
  }, [user]);

  const loadBooks = () => {
    Axios.get('http://localhost:5000/books')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setBooksData(response.data);
        } else {
          console.error('Invalid response format. Expected an array.');
        }
      })
      .catch((error) => {
        console.error('Error loading books:', error);
      });
  };

  const handleFormSubmit = (formData) => {
    console.log('Form data submitted:', formData);
    setUserData(formData);
  };

  const handleAddClick = () => {
    if (user) {
      const newBook = {
        sno: booksData.length + 1,  // Generate Book No based on current length
        title: '',
        author: '',
        genre: '',
        year: '',
        isbn: '',
        user: {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        },
        editable: true,
      };

      setBooksData((prevBooks) => [...prevBooks, newBook]);
    } else {
      alert('You need to be authenticated to add a new book.');
    }
  }

  const handleEditRow = (index) => {
    const updatedBooks = [...booksData];
    updatedBooks[index].editable = !updatedBooks[index].editable;
    setBooksData(updatedBooks);
  };

  const handleUpdateRow = (index) => {
    const updatedBooks = [...booksData];
    updatedBooks[index].editable = false;
    setBooksData(updatedBooks);
  };

  const handleDeleteRow = (index) => {
    const updatedBooks = booksData.filter((book, i) => i !== index);
    setBooksData(updatedBooks);
  };

  const handleDumpStateToJson = () => {
    const userState = {
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      books: booksData.map((book, index) => ({
        sno: index + 1,
        title: book.title,
        author: book.author,
        genre: book.genre,
        year: book.year,
        isbn: book.isbn,
      })),
    };

    const jsonString = JSON.stringify(userState, null, 2);
    window.alert('Data successfully extracted. Check the console for the data.');
    console.log(jsonString);
  };

  return (
    <div className="app">
      <h1>Book Donate</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={() => auth.signOut()} className="logoutbutton">Logout</button>
          <div className="container">
            <Form onSubmit={handleFormSubmit} onAddClick={handleAddClick} onDumpStateClick={handleDumpStateToJson} setUserData={setUserData} />
            <Table
              data={booksData}
              onEdit={handleEditRow}
              onUpdate={handleUpdateRow}
              onDelete={handleDeleteRow}
              isTableEditable={!userData.name || !userData.email || !userData.phone}
            />
          </div>
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
