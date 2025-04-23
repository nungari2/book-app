import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <div>
      
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-end items-center">
            
            
            <div className="flex space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-300">
        <FontAwesomeIcon icon={faHome} />
        <span>Home</span>
      </Link>
            
            <Link to="/Favourite" className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white hover:text-red-700">
        <FontAwesomeIcon icon={faHeart} />
        <span>Favourite</span>
      </Link>
            </div>

        </div>
     </nav>

      

    </div>
  )
}
