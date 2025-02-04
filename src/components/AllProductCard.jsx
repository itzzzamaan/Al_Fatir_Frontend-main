import { useState } from "react";

const ProductGrid = () => {
  // State to manage the number of products displayed
  const [visibleProducts, setVisibleProducts] = useState(8); // Initially show 8 products

  // Function to handle loading more products
  const handleLoadMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 8); // Load 8 more products on each click
  };

  const ProductCard = ({ product }) => {
    const [showView, setShowView] = useState(false);

    const handleShowView = () => {
      setShowView((prev) => !prev);
    };

    return (
      <div className="relative flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md p-4 transition transform hover:scale-105">
        <div className="absolute z-40 top-0 left-0 bg-[rgb(154,42,72)] text-white px-2 py-1 text-xs font-semibold">
          New Arrival
        </div>

        <div
          className="w-full relative overflow-hidden"
          onMouseEnter={handleShowView}
          onMouseLeave={handleShowView}
        >
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-48 object-cover rounded-md transition-all duration-600 ${
              showView ? "scale-110" : ""
            }`}
          />
          {showView && (
            <div className="absolute bottom-0 w-full bg-white p-3 text-black cursor-pointer text-center text-xl">
              Quick View
            </div>
          )}
        </div>

        <div className="mt-4 text-left space-y-1 mr-16">
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="text-gray-600 font-medium">From ₹{product.price}</p>
          <p className="text-sm text-gray-500">
            Taxes Included | Free Shipping
          </p>

          <select className="w-full border border-gray-300 hover:border-black rounded px-3 py-2 mt-2 text-sm">
            <option>Size</option>
            <option>10ml</option>
            <option>20ml</option>
            <option>30ml</option>
          </select>

          <div className="flex items-center mt-3 justify-center space-x-2 border border-gray-300 hover:border-black rounded p-2">
            <button className="px-3 py-1 bg-gray-200 rounded focus:outline-none hover:border-black">
              -
            </button>
            <span className="font-medium">{product.quantity}</span>
            <button className="px-3 py-1 bg-gray-200 rounded focus:outline-none hover:border-black">
              +
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Render only visible products */}
        {products.slice(0, visibleProducts).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {visibleProducts < products.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg- border border-yellow-700 w-40 h-12 text-yellow-500  shadow-md hover:bg-yellow-200 transition flex items-center justify-center"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
