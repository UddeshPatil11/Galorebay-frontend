import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../utils/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';
import HeroSection from '../sections/HeroSection';
import Product from '../components/Product';
import Filter from '../sections/products/Filter';
import { FaXmark } from "react-icons/fa6";

function Brand({ types, shapes, colors, brands, sizes, genders, materials }) {
  const { id } = useParams();
  const [brand, setBrand] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const getBrand = useCallback(async () => {
    try {
      const docRef = doc(db, 'brands', id);
      const snapshot = await getDoc(docRef);
      setBrand({ id: snapshot.id, ...snapshot.data() });
    } catch {
      toast.error('Error!');
    }
  }, [id]);

  useEffect(() => {
    getBrand();
  }, [getBrand]);

  const getProducts = useCallback(async () => {
    try {
      const collectionRef = collection(db, 'products');
      const queryRef = query(collectionRef, where('brand', '==', brand.name));
      const snapshot = await getDocs(queryRef);

      const data = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const colorsRef = collection(doc.ref, 'colors');
          const colorsSnapshot = await getDocs(colorsRef);
          const colors = colorsSnapshot.docs.map((colorDoc) => ({
            id: colorDoc.id,
            ...colorDoc.data(),
          }));

          const sizesRef = collection(doc.ref, 'sizes');
          const sizesSnapshot = await getDocs(sizesRef);
          const sizes = sizesSnapshot.docs.map((sizeDoc) => ({
            id: sizeDoc.id,
            ...sizeDoc.data(),
          }));

          return { id: doc.id, ...doc.data(), colors, sizes };
        })
      );

      setProducts(data);
    } catch (error) {
      console.log(error);
      toast.error('Error!');
    }
  }, [brand]);

  useEffect(() => {
    if (brand.name) getProducts();
  }, [brand, getProducts]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    let temp = [...products];

    if (searchTerm.trim()) {
      temp = temp.filter(
        (p) =>
          p.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.modelNo?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === 'priceLowToHigh') {
      temp.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sortBy === 'priceHighToLow') {
      temp.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    setFilteredProducts(temp);
  }, [products, searchTerm, sortBy]);

  return (
    <>
      <Helmet>
        <title>{brand.name}</title>
      </Helmet>

      <main>
        <HeroSection heroImage={brand.heroImage} />

        <section className="w-[90%] mx-auto my-16 flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-1/4">
            <img src={brand.image} alt="" />
          </div>

          <div className="lg:w-3/4 w-full flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-[#616161] font-semibold text-3xl">
              {filteredProducts.length} Products
            </h2>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-3 w-full">
              <input
                type="text"
                placeholder="Search model, model no..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white w-full sm:w-64 px-3 py-2 border rounded shadow-sm outline-none focus:border-secondary"
              />

              <select
                name="sortby"
                className="bg-white font-medium w-full sm:w-64 px-3 py-2 border rounded shadow-sm outline-none focus:border-secondary"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
              </select>

              {isMobile && (
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="bg-black text-white w-full sm:w-auto px-4 py-2 rounded shadow-sm"
                >
                  Open Filter
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="w-[90%] mx-auto my-16 flex flex-col gap-16 lg:flex-row">
          <div className="hidden lg:block lg:w-1/4">
            <Filter
              products={products}
              types={types}
              shapes={shapes}
              colors={colors}
              brands={brands}
              sizes={sizes}
              genders={genders}
              materials={materials}
              setFilteredProducts={setFilteredProducts}
              showApply={false} // Only for mobile
            />
          </div>

          <div className="lg:w-3/4">
            <div className="grid gap-5 lg:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <Product key={index} product={product} />
              ))}
            </div>
          </div>
        </section>

        {isMobile && isFilterOpen && (
          <div className="fixed inset-0 z-50 bg-white p-5 overflow-y-auto">
     <button
  className="absolute top-2 right-2 bg-gray-200 text-black rounded shadow flex items-center justify-center cursor-pointer w-6 h-6"
  onClick={() => setIsFilterOpen(false)}
  type="button"
  aria-label="Close filter"
>
  <FaXmark size={22} />
</button>


            <Filter
              products={products}
              types={types}
              shapes={shapes}
              colors={colors}
              brands={brands}
              sizes={sizes}
              genders={genders}
              materials={materials}
              setFilteredProducts={setFilteredProducts}
              showApply
              onClose={() => setIsFilterOpen(false)}
            />
          </div>
        )}
      </main>
    </>
  );
}

Brand.propTypes = {
  types: PropTypes.array,
  shapes: PropTypes.array,
  colors: PropTypes.array,
  brands: PropTypes.array,
  sizes: PropTypes.array,
  genders: PropTypes.array,
  materials: PropTypes.array,
};

export default Brand;
