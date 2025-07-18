import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const modalRef = useRef(null)

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
      setQuery('')
    }
  }

  // Detect click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      {/* Search Icon */}
      <button onClick={() => setIsOpen(true)}>
        <img src="/images/1735878602.svg" alt="Search" className="max-h-4" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white p-4 rounded shadow-md w-full max-w-md relative"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-0 right-2 text-gray-600 hover:text-black"
            >
              ×
            </button>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded"
                autoFocus
              />
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchPopup
