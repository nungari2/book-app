import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function AddBook() {
  const [formData, setFormData] = useState({
    Title: '',
    Author: '',
    Genre: '',
    About: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();

    fetch("https://book-app-30xv.onrender.com/readingList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your work has been added to the Favourite list.',
          showConfirmButton: false,
          timer: 2000
        });

        
        setFormData({
          Title: '',
          Author: '',
          Genre: '',
          About: '',
          image: '',
          read: false
        });
      });
  };


  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10 bg-gray-50">
      <div className="w-full max-w-2xl p-8 border border-gray-300 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Add a New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="Title" placeholder="Title" value={formData.Title} onChange={handleChange} className="w-full border px-3 py-2 rounded" required/>
          <input type="text" name="Author" placeholder="Author" value={formData.Author} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
          <input type="text" name="Genre" placeholder="Genre" value={formData.Genre} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <textarea name="About" placeholder="About the book..." value={formData.About} onChange={handleChange} className="w-full border px-3 py-2 rounded h-24" />
          <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full" >Add to Favourit </button>
        </form>
      </div>
    </div>
  );
}
