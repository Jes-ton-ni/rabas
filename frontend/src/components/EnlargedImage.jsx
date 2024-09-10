import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

const EnlargedImage = ({ src, alt, position }) => {
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const calculateDimensions = useCallback(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let maxWidth = Math.min(400, viewportWidth * 0.8);
      let maxHeight = Math.min(400, viewportHeight * 0.8);

      const aspectRatio = img.width / img.height;
      
      let width = Math.min(img.width, maxWidth);
      let height = width / aspectRatio;
      
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      setImageDimensions({ width, height });

      let x = position.x;
      let y = position.y;

      if (x + width + 20 > viewportWidth) {
        x = Math.max(10, viewportWidth - width - 20);
      }

      if (y + height + 20 > viewportHeight) {
        y = Math.max(10, viewportHeight - height - 20);
      }

      setAdjustedPosition({ x, y });
    };
  }, [src, position]);

  useEffect(() => {
    calculateDimensions();
  }, [calculateDimensions]);

  useEffect(() => {
    const handleResize = () => {
      calculateDimensions();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateDimensions]);

  return ReactDOM.createPortal(
    <div 
      style={{
        position: 'fixed',
        left: `${adjustedPosition.x}px`,
        top: `${adjustedPosition.y}px`,
        zIndex: 9999,
      }}
      className="bg-black bg-opacity-75 p-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: `${imageDimensions.width}px`,
          height: `${imageDimensions.height}px`,
        }}
        className="rounded-md object-contain transition-all duration-300 ease-in-out"
      />
    </div>,
    document.body
  );
};

export default EnlargedImage;