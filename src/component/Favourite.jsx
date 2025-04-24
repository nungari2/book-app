import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Favourite() {
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    fetch("https://book-app-30xv.onrender.com/readingList")
      .then((r) => r.json())
      .then((response) => setReadingList(response));
  }, []);

  const toggleReadStatus = (book) => {
    fetch(`https://book-app-30xv.onrender.com/readingList/${book.id}`, {
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://book-app-30xv.onrender.com/readingList/${id}`, {
          method: "DELETE"
        }).then(() => {
          setReadingList((prevList) => prevList.filter((book) => book.id !== id));
          Swal.fire(
            'Deleted!',
            'The book has been removed from your favourites.',
            'success'
          );
        });
    }
  });
};

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10 bg-gray-50 pt-8">
        <h2 className="text-2xl font-bold mb-6 s-y-4">Reading List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {readingList.map((book) => (
            <div key={book.id} className="border rounded-lg p-4 shadow-md">
            <img src={book.image} className="w-full h-64 object-cover rounded-md" alt="book" />
            <h4 className="mt-2 text-lg font-semibold">{book.Title}</h4>
            <p className="text-sm mt-1 text-gray-600">Author: {book.Author}</p>
            <p className="text-sm text-gray-600">Genre: {book.Genre}</p>
            <p className="text-sm text-gray-700">About: {book.About}</p>
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
