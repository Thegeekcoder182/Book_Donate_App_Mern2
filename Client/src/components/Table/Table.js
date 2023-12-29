import React from 'react';
import './Table.css';

function Table({ data, onEdit, onUpdate, onDelete, isTableEditable }) {
  const isNumber = (value) => /^\d+$/.test(value);

  return (
    <div className="table_container">
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
              <td>{book.sno}</td>
              <td contentEditable={book.editable}>{book.title}</td>
              <td contentEditable={book.editable}>{book.author}</td>
              <td contentEditable={book.editable}>{book.genre}</td>
              <td contentEditable={book.editable && isTableEditable}>{isNumber(book.yop) ? book.yop : ''}</td>
              <td contentEditable={book.editable && isTableEditable}>{isNumber(book.isbn) ? book.isbn : ''}</td>
              <td>
                {book.editable ? (
                  <React.Fragment>
                    <button onClick={() => onUpdate(index)}>Save</button>
                    <button onClick={() => onEdit(index)}>Cancel</button>
                  </React.Fragment>
                ) : (
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

export default Table;
