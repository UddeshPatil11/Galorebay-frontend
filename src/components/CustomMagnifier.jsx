import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const CustomMagnifier = ({ src, zoom = 2 }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0, imgX: 0, imgY: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [containerPosition, setContainerPosition] = useState({ left: 0, top: 0 });

  const imgRef = useRef(null);
  const magnifierRef = useRef(null);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  const updateDimensions = () => {
    if (imgRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setImageDimensions({
        width: imgRef.current.offsetWidth,
        height: imgRef.current.offsetHeight,
      });
      setContainerPosition({
        // left: rect.left + window.scrollX,
        // top: rect.top + window.scrollY
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

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCursorPosition({
      x: e.clientX,
      y: e.clientY,
      imgX: x,
      imgY: y,
    });
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
      />

      {isHovering && (
        <>
          {/* Magnifier */}
          <div
            ref={magnifierRef}
            className="absolute top-0 left-full bg-white border-gray-200 pointer-events-none border shadow-lg overflow-hidden"
            style={{
              width: '700px',
              height: '500px',
              left: `${cursorPosition.x - containerPosition.left + 20}px`,
              top: `${cursorPosition.y - containerPosition.top}px`,
              transform: 'translateY(-15%)',
              display: imageDimensions.width > 0 ? 'block' : 'none',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: `${imageDimensions.width * zoom}px ${imageDimensions.height * zoom}px`,
                backgroundPosition: `-${(cursorPosition.imgX || 0) * zoom - 250}px -${(cursorPosition.imgY || 0) * zoom - 250}px`,
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>

          {/* Scanning rectangle filled with dots */}
          <div
            ref={cursorRef}
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
