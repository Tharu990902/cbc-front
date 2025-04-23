import { useEffect, useState } from "react";

export default function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Main Image */}
      <div className="relative w-full mb-4 h-96">
        <img
          src={images[currentIndex]}
          alt={`Product ${currentIndex + 1}`}
          className="object-cover w-full h-full transition-all duration-500 shadow-lg rounded-xl"
        />
      </div>

      {/* Thumbnail Bar */}
      <div className="flex gap-2 px-2 pb-1 overflow-x-auto">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => handleImageClick(index)}
            className={`w-20 h-20 object-cover cursor-pointer rounded-md border-2 ${
              currentIndex === index
                ? "border-blue-500 ring-2 ring-blue-300"
                : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
