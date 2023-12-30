// Importing necessary modules and styles
import React from 'react';
import './Table.css';

// Table component for displaying and editing book data
function Table({ data, onEdit, onUpdate, onDelete, isTableEditable }) {
  // Function to check if a value is a number
  const isNumber = (value) => /^\d+$/.test(value);

  // Rendering the Table component
  return (
    <div className="table_container">
      {/* Table structure */}
      <table id="data_table">
        {/* Table headers */}
        <thead>
          <tr>
            <th>Book No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Year of Publication</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table rows */}
        <tbody>
          {data.map((book, index) => (
            <tr key={index}>
              {/* Book No */}
              <td>{book.sno}</td>
              
              {/* Title */}
              <td contentEditable={book.editable}>{book.title}</td>
              
              {/* Author */}
              <td contentEditable={book.editable}>{book.author}</td>
              
              {/* Genre */}
              <td contentEditable={book.editable}>{book.genre}</td>
              
              {/* Year of Publication */}
              <td contentEditable={book.editable && isTableEditable}>
                {isNumber(book.yop) ? book.yop : ''}
              </td>
              
              {/* ISBN */}
              <td contentEditable={book.editable && isTableEditable}>
                {isNumber(book.isbn) ? book.isbn : ''}
              </td>
              
              {/* Actions column */}
              <td>
                {book.editable ? (
                  // Save and Cancel buttons when in editable mode
                  <React.Fragment>
                    <button onClick={() => onUpdate(index)}>Save</button>
                    <button onClick={() => onEdit(index)}>Cancel</button>
                  </React.Fragment>
                ) : (
                  // Edit and Delete buttons when not in editable mode
                  <React.Fragment>
                    <button onClick={() => onEdit(index)}>Edit</button>
                    <button onClick={() => onDelete(index)}>Delete</button>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Exporting the Table component
export default Table;
