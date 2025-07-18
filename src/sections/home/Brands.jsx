import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// BrandCard Component
function BrandCard({ brand }) {
  return (
    <Link
      to={`/brands/${brand.id}`}
      className="
        flex flex-col items-center justify-between
        bg-white rounded-2xl shadow-sm
        px-3 py-5
        transition-all duration-150
        hover:shadow-lg active:scale-[0.98]
        border border-gray-100
        group
      "
      style={{
        minHeight: '220px',
        minWidth: '140px',
        maxWidth: '230px',
        margin: 'auto',
      }}
    >
      <img
        src={brand.productImage}
        alt={brand.name}
        className="w-28 h-14 object-contain mb-2 transition-transform duration-200 group-hover:scale-105"
        loading="lazy"
        style={{ background: 'white', borderRadius: '12px' }}
      />
      <img
        src={brand.image}
        alt={`${brand.name} logo`}
        className="grayscale h-10 w-32 object-contain group-hover:grayscale-0 transition-all mb-2"
        loading="lazy"
        style={{ background: 'white', borderRadius: '7px' }}
      />
      <div className="text-center mt-1">
        <div className="font-medium text-lg md:text-base">{brand.name}</div>
        {brand.description && (
          <div className="text-xs text-gray-400">{brand.description}</div>
        )}
      </div>
    </Link>
  )
}

BrandCard.propTypes = {
  brand: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    productImage: PropTypes.string,
    description: PropTypes.string
  })
}

// Main Brands Section
function Brands({ brands }) {
  const desiredOrder = [
    'Feather',
    'Galorebay',
    'John Karter',
    'Kidstar',
    'Caron',
    'Red Grapes',
    'Cashier'
  ]

  const brandDescriptions = {
    Feather: 'Titanium Eyewear | USA',
    Galorebay: 'Korean Eyewear',
    'John Karter': 'Eyewear / Sunwear',
    Kidstar: 'Kids Eyewear',
    Caron: 'Designer Eyewear',
    'Red Grapes': 'Eyewear',
    Cashier: 'Deluxe'
  }

  // Order brands as needed
  const orderedBrands = desiredOrder
    .map(name => brands.find(brand => brand.name === name))
    .filter(Boolean)
    .map(brand => ({ ...brand, description: brandDescriptions[brand.name] || '' }))

  return (
    <section>
      <div
        className="
          bg-white w-[96%] mx-auto
          px-2 py-8 md:px-6 lg:px-12 xl:px-16
          rounded-3xl shadow-[0_0_20px_-8px_#0001]
          grid
          grid-cols-2 gap-x-3 gap-y-6
          sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10
          md:grid-cols-4 md:gap-x-8 md:gap-y-12
          xl:grid-cols-4 xl:gap-x-14 xl:gap-y-16
          "
        style={{ maxWidth: '1280px' }}
      >
        {orderedBrands.map((brand, idx) =>
          <BrandCard key={brand.id || idx} brand={brand} />
        )}
      </div>
    </section>
  )
}

Brands.propTypes = {
  brands: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
      productImage: PropTypes.string
    })
  )
}

export default Brands
