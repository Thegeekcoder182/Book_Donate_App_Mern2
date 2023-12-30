// Importing necessary modules and components
import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form/Form';
import Table from './components/Table/Table';
import Auth from './components/Auth/Auth';
import Axios from 'axios';
import { auth } from './components/firebase/firebase';

// Main App component
function App() {
  // State to manage user data (name, email, phone)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // State to manage books data
  const [booksData, setBooksData] = useState([]);

  // State to manage user authentication status
  const [user, setUser] = useState(null);

  // useEffect to handle authentication changes and load books when user is logged in
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // If user is logged in, load books
        loadBooks();
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, [user]);

  // Function to fetch books data from the server
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

  // Function to handle form submission
  const handleFormSubmit = (formData) => {
    console.log('Form data submitted:', formData);
    setUserData(formData);
  };

  // Function to handle adding a new book
  const handleAddClick = () => {
    if (user) {
      const newBook = {
        sno: booksData.length + 1, // Generate Book No based on current length
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

      // Update booksData with the new book
      setBooksData((prevBooks) => [...prevBooks, newBook]);
    } else {
      // Alert if user is not authenticated
      alert('You need to be authenticated to add a new book.');
    }
  };

  // Function to handle editing a row in the table
  const handleEditRow = (index) => {
    const updatedBooks = [...booksData];
    updatedBooks[index].editable = !updatedBooks[index].editable;
    setBooksData(updatedBooks);
  };

  // Function to handle updating a row in the table
  const handleUpdateRow = (index) => {
    const updatedBooks = [...booksData];
    updatedBooks[index].editable = false;
    setBooksData(updatedBooks);
  };

  // Function to handle deleting a row in the table
  const handleDeleteRow = (index) => {
    const updatedBooks = booksData.filter((book, i) => i !== index);
    setBooksData(updatedBooks);
  };

  // Function to dump state to JSON format
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

    // Convert user state to JSON and display it in the console
    const jsonString = JSON.stringify(userState, null, 2);
    window.alert('Data successfully extracted. Check the console for the data.');
    console.log(jsonString);
  };

  // Rendering the main component
  return (
    <div className="app">
      <h1>Book Donate</h1>
      {user ? (
        // If user is authenticated, show welcome message, logout button, form, and table
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
        // If user is not authenticated, show authentication component
        <Auth />
      )}
    </div>
  );
}

// Exporting the App component
export default App;
