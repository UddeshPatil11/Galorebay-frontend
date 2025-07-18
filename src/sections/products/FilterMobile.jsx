import PropTypes from 'prop-types';
import { FaXmark } from "react-icons/fa6";
import { useState } from 'react';

function FilterMobile({
  allProducts,
  setFilteredProducts,
  types = [],
  shapes = [],
  colors = [],
  brands = [],
  sizes = [],
  genders = [],
  materials = [],
  setIsMobileFilterOpen
}) {
  const [filter, setFilter] = useState({
    types: [],
    shapes: [],
    colors: [],
    brands: [],
    models: [],
    sizes: [],
    genders: [],
    materials: []
  });

  const applyFilters = (filters) => {
    const filtered = allProducts.filter(product => {
      const matchesType =
        filters.types.length === 0 || filters.types.includes(product.type?.toLowerCase());
      const matchesShape =
        filters.shapes.length === 0 || filters.shapes.includes(product.shape?.toLowerCase());
      const matchesColor =
        filters.colors.length === 0 ||
        product.colors?.some(color => filters.colors.includes(color.name?.toLowerCase()));
      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand?.toLowerCase());
      const matchesModel =
        filters.models.length === 0 || filters.models.includes(product.category?.toLowerCase());
      const matchesSize =
        filters.sizes.length === 0 ||
        product.sizes?.some(size => filters.sizes.includes(size.size?.toLowerCase()));
      const matchesGender =
        filters.genders.length === 0 || filters.genders.includes(product.gender?.toLowerCase());
      const matchesMaterial =
        filters.materials.length === 0 || filters.materials.includes(product.material?.toLowerCase());

      return (
        matchesType &&
        matchesShape &&
        matchesColor &&
        matchesBrand &&
        matchesModel &&
        matchesSize &&
        matchesGender &&
        matchesMaterial
      );
    });

    setFilteredProducts(filtered);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckboxChange = (e, filterKey) => {
    const value = e.target.value.toLowerCase();
    setFilter(prev => ({
      ...prev,
      [filterKey]: prev[filterKey].includes(value)
        ? prev[filterKey].filter(item => item !== value)
        : [...prev[filterKey], value]
    }));
  };

  const handleApplyFilters = () => {
    const anyFilterApplied = Object.values(filter).some(arr => arr.length > 0);
    if (anyFilterApplied) {
      applyFilters(filter);
    } else {
      setFilteredProducts(allProducts);
    }
    setIsMobileFilterOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white p-5 pt-2 overflow-y-auto flex flex-col" style={{ minHeight: "100dvh" }}>
      {/* Top Close Button */}
      <button
        className="absolute top-1 right-1 md:top-4 bg-gray-200 text-black px-2 py-1.5 rounded shadow"
        onClick={() => setIsMobileFilterOpen(false)}
        type="button"
      >
        <FaXmark size={20} />
      </button>

      {/* Filters */}
      <form className="text-sm flex-1 space-y-5">
        <details open>
          <summary className="font-semibold uppercase text-sm cursor-pointer">Frame Type</summary>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {types.map((type, index) => (
              <label key={index} className="flex flex-col items-center bg-gray-50 rounded border p-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={type.name}
                  checked={filter.types.includes(type.name.toLowerCase())}
                  onChange={e => handleCheckboxChange(e, 'types')}
                  className="mb-1 scale-125 accent-black"
                />
                {type.image && <img src={type.image} alt={type.name} className="w-12 h-12 object-contain mb-1" />}
                <span className="text-xs font-medium">{type.name}</span>
              </label>
            ))}
          </div>
        </details>

        <details open>
          <summary className="font-semibold uppercase text-sm cursor-pointer">Frame Shape</summary>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {shapes.map((shape, index) => (
              <label key={index} className="flex flex-col items-center bg-gray-50 rounded border p-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={shape.name}
                  checked={filter.shapes.includes(shape.name.toLowerCase())}
                  onChange={e => handleCheckboxChange(e, 'shapes')}
                  className="mb-1 scale-125 accent-black"
                />
                {shape.image && <img src={shape.image} alt={shape.name} className="w-12 h-12 object-contain mb-1" />}
                <span className="text-xs font-medium">{shape.name}</span>
              </label>
            ))}
          </div>
        </details>

        <details open>
          <summary className="font-semibold uppercase text-sm cursor-pointer">Frame Color</summary>
          <div className="grid grid-cols-2 gap-2 mt-3 max-h-40 overflow-y-auto">
            {colors.map((color, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer px-1 py-2">
                <input
                  type="checkbox"
                  value={color.name}
                  checked={filter.colors.includes(color.name.toLowerCase())}
                  onChange={e => handleCheckboxChange(e, 'colors')}
                  className="scale-125 accent-black"
                />
                <span className="w-5 h-5 rounded-full border" style={{ background: color.image || "#fff" }}></span>
                <span className="text-xs">{color.name}</span>
              </label>
            ))}
          </div>
        </details>

        <details open>
          <summary className="font-semibold uppercase text-sm cursor-pointer">Brand & Model</summary>
          <div className="grid gap-1 mt-3 max-h-40 overflow-y-auto">
            {brands.map((brand, index) => (
              <div key={index} className="mb-1">
                <label className="flex items-center gap-2 font-semibold">
                  <input
                    type="checkbox"
                    value={brand.name}
                    checked={filter.brands.includes(brand.name.toLowerCase())}
                    onChange={e => handleCheckboxChange(e, 'brands')}
                    className="scale-125 accent-black"
                  />
                  {brand.name}
                </label>
                <div className="ml-6 grid gap-1">
                  {brand.models?.map((model, i) => (
                    <label key={i} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={model.name}
                        checked={filter.models.includes(model.name.toLowerCase())}
                        onChange={e => handleCheckboxChange(e, 'models')}
                        className="scale-125 accent-black"
                      />
                      {model.name}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </details>

        <details open>
          <summary className="font-semibold uppercase text-sm cursor-pointer">Size</summary>
          <div className="grid grid-cols-2 gap-2 mt-3 max-h-40 overflow-y-auto">
            {sizes.map((size, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer px-1 py-2">
                <input
                  type="checkbox"
                  value={size.name}
                  checked={filter.sizes.includes(size.name.toLowerCase())}
                  onChange={e => handleCheckboxChange(e, 'sizes')}
                  className="scale-125 accent-black"
                />
                <span className="text-xs">{size.name}</span>
              </label>
            ))}
          </div>
        </details>

        <details open>
          <summary className="font-semibold uppercase text-sm cursor-pointer">Gender</summary>
          <div className="grid grid-cols-2 gap-2 mt-3 max-h-40 overflow-y-auto">
            {genders.map((gender, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer px-1 py-2">
                <input
                  type="checkbox"
                  value={gender.name}
                  checked={filter.genders.includes(gender.name.toLowerCase())}
                  onChange={e => handleCheckboxChange(e, 'genders')}
                  className="scale-125 accent-black"
                />
                <span className="text-xs">{gender.name}</span>
              </label>
            ))}
          </div>
        </details>

        <details open>
          <summary className="font-semibold uppercase text-sm cursor-pointer">Material</summary>
          <div className="grid grid-cols-2 gap-2 mt-3 max-h-40 overflow-y-auto">
            {materials.map((material, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer px-1 py-2">
                <input
                  type="checkbox"
                  value={material.name}
                  checked={filter.materials.includes(material.name.toLowerCase())}
                  onChange={e => handleCheckboxChange(e, 'materials')}
                  className="scale-125 accent-black"
                />
                <span className="text-xs">{material.name}</span>
              </label>
            ))}
          </div>
        </details>
      </form>

      {/* Sticky Apply Button */}
      <div className="mt-auto pt-4">
        <button
          className="w-full bg-black text-white py-3 rounded shadow-md font-bold text-base"
          onClick={handleApplyFilters}
          type="button"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

FilterMobile.propTypes = {
  allProducts: PropTypes.array,
  setFilteredProducts: PropTypes.func,
  types: PropTypes.array,
  shapes: PropTypes.array,
  colors: PropTypes.array,
  brands: PropTypes.array,
  sizes: PropTypes.array,
  genders: PropTypes.array,
  materials: PropTypes.array,
  setIsMobileFilterOpen: PropTypes.func
};

export default FilterMobile;
