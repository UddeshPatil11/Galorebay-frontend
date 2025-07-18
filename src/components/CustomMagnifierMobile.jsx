import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const CustomMagnifier = ({ src, zoom = 2 }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0, imgX: 0, imgY: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [containerPosition, setContainerPosition] = useState({ left: 0, top: 0 });

  const imgRef = useRef(null);
  const containerRef = useRef(null);

  const magnifierWidth = 320;
  const magnifierHeight = 240;

  const updateDimensions = () => {
    if (imgRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setImageDimensions({
        width: imgRef.current.offsetWidth,
        height: imgRef.current.offsetHeight,
      });
      setContainerPosition({
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
      });
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const handleEnter = () => setIsHovering(true);
  const handleLeave = () => setIsHovering(false);

  const handleMove = (clientX, clientY) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setCursorPosition({
      x: clientX,
      y: clientY,
      imgX: x,
      imgY: y,
    });
  };

  // Mouse event handlers
  const handleMouseEnter = handleEnter;
  const handleMouseLeave = handleLeave;
  const handleMouseMove = (e) => handleMove(e.clientX, e.clientY);

  // Touch event handlers
  const handleTouchStart = handleEnter;
  const handleTouchEnd = handleLeave;
  const handleTouchMove = (e) => {
    // e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  return (
    <div className="relative" ref={containerRef}>
      <img
        ref={imgRef}
        src={src}
        alt="Product"
        className="w-full h-auto cursor-zoom-in"
        onLoad={updateDimensions}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      />

      {isHovering && (
        <>
          {/* Magnifier */}
          <div
            className="absolute bg-white border border-gray-200 shadow-lg overflow-hidden pointer-events-none"
            style={{
              width: `${magnifierWidth}px`,
              height: `${magnifierHeight}px`,
              top: '150%',
              left: '0',
              display: imageDimensions.width > 0 ? 'block' : 'none',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: `${imageDimensions.width * zoom}px ${imageDimensions.height * zoom}px`,
                backgroundPosition: `-${cursorPosition.imgX * zoom - magnifierWidth / 2}px -${cursorPosition.imgY * zoom - magnifierHeight / 2}px`,
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>

          {/* Scanning rectangle */}
          <div
            className="absolute z-50 pointer-events-none"
            style={{
              width: '70px',
              height: '50px',
              backgroundImage: 'radial-gradient(rgba(0, 0, 255, 0.5) 1px, transparent 1px)',
              backgroundSize: '3px 3px',
              left: `${cursorPosition.imgX - 25}px`,
              top: `${cursorPosition.imgY - 15}px`,
              transform: 'translateZ(0)',
            }}
          />
        </>
      )}
    </div>
  );
};

CustomMagnifier.propTypes = {
  src: PropTypes.string,
  zoom: PropTypes.number,
};

export default CustomMagnifier;
