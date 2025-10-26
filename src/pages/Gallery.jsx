import React, { useState } from 'react';

export default function Gallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const artworks = [
    "./images/art3.png",
    "./images/art3.png",
    "./images/art3.png",
    "./images/art3.png",
    "./images/art3.png",
    "./images/art3.png",
    "./images/art3.png",
    "./images/art3.png",
  ];

  const openModal = (src) => {
    setSelectedImage(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  return (
    <div className="p-10">
      <h2 className="text-4xl font-light mb-10 text-center">Gallery</h2>

      {/* Grid layout for images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {artworks.map((src, i) => (
          <div key={i} className="relative">
            <img
              src={src}
              alt={`Artwork ${i + 1}`}
              className="w-full h-80- object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => openModal(src)}
            
            />
          </div>
        ))}
      </div>

      {/* Modal to show large image */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="relative max-w-3xl max-h-full p-5">
            <img
              src={selectedImage}
              alt="Large Artwork"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
            />
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 text-white text-3xl p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
