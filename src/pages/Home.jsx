import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    fetch("https://book-app-30xv.onrender.com/Books")
      .then((r) => r.json())
      .then((response) => setBooks(response));
  }, []);

  const addToReadingList = (book) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true
    });

    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Do you want to add this book to your favourite?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("https://book-app-30xv.onrender.com/readingList")
          .then((r) => r.json())
          .then((readingList) => {
            const alreadyInList = readingList.find((b) => b.id === book.id);
            if (alreadyInList) {
              Swal.fire({
                icon: 'info',
                title: 'Already Added',
                text: 'This book is already in your reading list.'
              });
              return;
            }

            fetch("https://book-app-30xv.onrender.com/readingList", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ ...book, read: false })
            }).then(() => {
              setReadingList([...readingList, book]);
              swalWithBootstrapButtons.fire({
                title: "Added!",
                text: "The book has been added to your favourite.",
                icon: "success"
              });
            });
          });
      }
    });
  };

  const filteredBooks = books.filter((book) =>
    book.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8e735b] to-[#c2a58d] text-white font-sans pt-16">
      
      <div className="grid grid-cols-1 md:grid-cols-2 bg-[#c2a58d] text-white">
      <div className="relative w-full h-full overflow-hidden ">
     <div
      className="w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: `url('/booklibray.png')`,
        clipPath: 'ellipse(100% 150% at 0% 50%)'
      }}
    ></div>
  </div>


  
  <div className="flex flex-col justify-center items-center p-6 text-center">
    <h1 className="text-2xl md:text-4xl font-bold mb-4">
      A room without books is like a body without a soul.
    </h1>
    <div className="relative w-full max-w-md">
      <input type="text" placeholder="Find Your Book" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3 rounded-lg text-gray-900 placeholder-gray-500 hover:bg-blue-300" />
      <span className="absolute top-3 right-4 text-gray-500">🔍</span>
    </div>
  </div>
</div>

      
      <div className="p-6">
      
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {filteredBooks.map((book) => (
            <div key={book.Id} className='bg-white text-black rounded-lg shadow-lg overflow-hidden flex flex-col'>
              <img src={book.image} alt={book.Title} className="h-64 w-full object-cover transform transition-transform duration-300 hover:scale-105" />
              <div className="p-3 flex-1 flex flex-col">
                <h4 className="font-semibold text-lg mb-2">{book.Title}</h4>
                <button onClick={() => addToReadingList(book)} className="mt-auto px-4 py-2 bg-[#4B2E2E] text-white rounded hover:bg-green-800 transition" > Add to Favourite </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}