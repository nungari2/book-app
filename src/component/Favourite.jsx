import React, { useEffect, useState } from 'react';

export default function Favourite() {
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/readingList")
      .then((r) => r.json())
      .then((response) => setReadingList(response));
  }, []);

  const toggleReadStatus = (book) => {
    fetch(`http://localhost:3000/readingList/${book.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ read: !book.read })
    })
      .then((res) => res.json())
      .then((updatedBook) => {
        setReadingList((prevList) =>
          prevList.map((b) => (b.id === updatedBook.id ? updatedBook : b))
        );
      });
  };

  const deleteBook = (id) => {
    fetch(`http://localhost:3000/readingList/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setReadingList((prevList) => prevList.filter((book) => book.id !== id));
      });
  };

  return (
    <div className="p-6">
    <h2 className="text-2xl font-bold mt-10 mb-4">Reading List</h2>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {readingList.map((book) => (
        <div key={book.id} className='border rounded-lg p-4 shadow-md'>
          <img src={book.image} className="w-full h-64 object-cover rounded-md" alt='book' />
          <h4 className="mt-2 text-lg font-semibold">{book.Title}</h4>
          <p className="text-sm mt-1 text-gray-600">Author: {book.Author}</p>
          <p className="text-sm text-gray-600">Genre: {book.Genre}</p>
          <p className="text-sm text-gray-700 ">About: {book.About }</p>
          <p className="mt-1 font-semibold">Status: {book.read ? "Read" : "Not Read"}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => toggleReadStatus(book)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
              Mark as {book.read ? "Unread" : "Read"}
            </button>
            <button onClick={() => deleteBook(book.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}
