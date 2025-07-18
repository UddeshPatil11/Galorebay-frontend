import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../sections/HeroSection';
import Product from '../components/Product';
import Filter from '../sections/products/Filter';
import FilterMobile from '../sections/products/FilterMobile';

function Products({ user, products, types, shapes, colors, brands, sizes, genders, materials }) {
  const [page, setPage] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const getPage = useCallback(async () => {
    try {
      const docRef = doc(db, 'pages', 'GLUmSaJl79QHhQd16wQ1');
      const snapshot = await getDoc(docRef);
      const data = snapshot.data();
      setPage(data);
    } catch {
      toast.error('Error fetching page data');
    }
  }, []);

  useEffect(() => {
    getPage();
  }, [getPage]);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.model?.toLowerCase().includes(searchQuery) ||
      product.brand?.toLowerCase().includes(searchQuery) ||
      product.modelNo?.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  return (
    <>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
      </Helmet>

      <main>
        <HeroSection heroImage={page.heroImage} />

        <div className="block lg:hidden w-[90%] mx-auto mt-6">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="w-full bg-black text-white font-medium text-base rounded py-3 mt-2 transition hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
          >
            Open Filter
          </button>
        </div>

        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end lg:hidden">
            <div className="w-3/4 sm:w-2/5 bg-white p-4 h-full shadow-lg overflow-y-auto relative">
              <FilterMobile
                allProducts={products}
                setFilteredProducts={setFilteredProducts}
                types={types}
                shapes={shapes}
                colors={colors}
                brands={brands}
                sizes={sizes}
                genders={genders}
                materials={materials}
                isMobileFilterOpen={isMobileFilterOpen}
                setIsMobileFilterOpen={setIsMobileFilterOpen}
              />
            </div>
          </div>
        )}

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
            />
          </div>

          <div className="lg:w-3/4">
            {filteredProducts.length > 0 ? (
              <div className="grid gap-5 grid-cols-2 sm:grid-cols-3">
                {filteredProducts.map((product, index) => (
                  <Product key={index} product={product} user={user} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No products found.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

Products.propTypes = {
  user: PropTypes.object,
  products: PropTypes.array,
  types: PropTypes.array,
  shapes: PropTypes.array,
  colors: PropTypes.array,
  brands: PropTypes.array,
  sizes: PropTypes.array,
  genders: PropTypes.array,
  materials: PropTypes.array
};

export default Products;
