import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { ClipLoader } from "react-spinners";
import { FaAngleDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Range, getTrackBackground } from "react-range";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa6";

const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Home",
  "Sports",
  "Kids",
  "Footwears",
  "Cosmetics",
  "Mens",
  "Womens",
];

const Productsforuser = () => {
  const [dropdownOpenPrice, setDropdownOpenPrice] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [noProductsFound, setNoProductsFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const [itemsPerPage] = useState(8); // Items per page
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const initialCategory = query.get("category") || "All";
  const initialPriceRange = query.get("price") || "All";
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const handleDropdownTogglePrice = () => {
    setDropdownOpenPrice((prevState) => !prevState);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when category changes
    navigate(`/productsforuser?category=${category}`);
    setSelectedProduct(null);
  };

  const fetchProducts = async (page = 1) => {
    try {
      const endpoint =
        selectedCategory === "All"
          ? `/products/all?page=${page}&limit=${itemsPerPage}`
          : `/products/category?category=${selectedCategory}&page=${page}&limit=${itemsPerPage}`;

      const response = await axios.get(endpoint);
      setProducts(response.data.products);
      setTotalPages(response.data.pagination.totalPages); // Set total pages from response
      setNoProductsFound(response.data.products.length === 0);
    } catch (error) {
      toast.info("No products found for this category.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage); // Fetch products on current page change
  }, [currentPage, selectedCategory]); // Trigger on current page or selected category change

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  useEffect(() => {
    const fetchProductsByPrice = async () => {
      if (minPrice !== null && maxPrice !== null) {
        try {
          const response = await axios.get(
            `/products/filterproducts?minPrice=${minPrice}&maxPrice=${maxPrice}`
          );
          if (response.data.success) {
            setProducts(response.data.products);
            setNoProductsFound(response.data.products.length === 0);
          }
        } catch (error) {
          console.error("Error fetching filtered products:", error);
        }
      }
    };

    fetchProductsByPrice();
  }, [minPrice, maxPrice]);
  const handleApplyPriceFilter = async () => {
    if (
      minPrice === "" ||
      minPrice === null ||
      maxPrice === "" ||
      maxPrice === null
    ) {
      toast.info("Please Set a Price Range.");
      return;
    }

    try {
      const response = await axios.get(
        `/products/filterproducts?minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      if (response.data.success) {
        setProducts(response.data.products);
        setNoProductsFound(response.data.products.length === 0);
      }
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }

    setDropdownOpenPrice(false);
  };

  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };
  const [loginuser, setLoginuser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.warn("No token found");
        return;
      }

      try {
        const response = await axios.get(
          `/users/user/currentuser?token=${token}`
        );
        console.log(response.data.user.wishlist);
        setLoginuser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data.");
      }
    };
    fetchUserData();
  }, [token]);
  const handleAddToWishlist = async (productId) => {
    if (!token) {
      toast.info("Please log in first to add products to the wishlist.");
      alert("Please log in first to add products to the wishlist.");
      navigate("/login");
      return; // Exit the function if no token is present
    }

    try {
      await axios.put(`/user/wishlist/add?token=${token}`, { productId });
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };
  const [isCategoriesVisible, setCategoriesVisible] = useState(false);

  const toggleCategories = () => {
    setCategoriesVisible(!isCategoriesVisible);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Custom Header */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-16 left-4 mt-12 ml-4 flex items-center rounded-2xl text-gray-700 px-4 py-2  hover:bg-black hover:text-white transition duration-300"
      >
        <FaArrowLeft className="mr-2" />
      </button>

      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <ClipLoader color="#007bff" loading={loading} size={80} />
        </div>
      )}

      {/* Main Layout with Sidebar */}
      <div className="flex flex-col lg:flex-row mt-4 ml-4 lg:mb-0">
        {/* Sidebar Filter */}
        <aside
          className={`w-[85vw] lg:w-64  lg:h-[80vh] mt-8 ml-2  p-4 mb-4 lg:mb-0 lg:sticky lg:top-0 ${
            isCategoriesVisible ? "h-[74vh] lg:w-64" : "h-[5vh] lg:w-3"
          }`}
        >
          {/* Categories */}
          <h2
            className="text-lg flex items-center lg:absolute lg:top-[-5%] lg:left-16 font-semibold mb-6 cursor-pointer  transition-colors duration-300"
            onClick={toggleCategories}
          >
            <span className="mr-2">Categories</span>
            {isCategoriesVisible ? (
              <FaAngleUp
                size={24}
                className="text-gray-800 transition-transform duration-300"
              />
            ) : (
              <FaAngleDown
                size={24}
                className="text-gray-800 transition-transform duration-300"
              />
            )}
          </h2>

          {isCategoriesVisible && (
            <>
              <ul className="space-y-2 ">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full p-2 rounded-lg text-left ${
                        selectedCategory === category
                          ? "bg-black text-white"
                          : " text-gray-700"
                      } hover:bg-black hover:text-white transition duration-300`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>

              <h2 className="text-lg font-normal mt-8 mb-4">Price</h2>
              <div>
                <Range
                  values={priceRange}
                  step={100}
                  min={0}
                  max={500000}
                  onChange={handlePriceRangeChange}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "6px",
                        width: "100%",
                        background: getTrackBackground({
                          values: priceRange,
                          colors: ["#ccc", "black", "#ccc"],
                          min: 0,
                          max: 500000,
                        }),
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "20px",
                        width: "20px",
                        borderRadius: "50%",
                        backgroundColor: "black",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: "#fff",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  )}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-700">
                  <span>{priceRange[0]}</span>
                  <span>{priceRange[1]}</span>
                </div>
                <button
                  onClick={handleApplyPriceFilter}
                  className="mt-4 w-full py-2 opacity-0 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Apply
                </button>
              </div>
            </>
          )}
        </aside>

        {/* Product Grid */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {noProductsFound ? (
              <h3 className="text-xl text-center font-semibold text-gray-700">
                No products found in this price range.
              </h3>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/singleproduct/${product._id}`)}
                  className="bg-white lg:h-[40vh] h-[40vh] rounded-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 group relative"
                >
                  {/* Product Image */}
                  <div
                    onClick={() => setSelectedProduct(product)}
                    className="w-full h-56 cursor-pointer flex justify-center items-center overflow-hidden rounded-t-lg"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-96 object-cover rounded-t-lg cursor-pointer"
                    />
                  </div>

                  <div
                    onClick={() => navigate(`/singleproduct/${product._id}`)}
                    className="p-4 cursor-pointer"
                  >
                    <h2 className="relative text-lg font-light font-custom text-gray-700 mb-2">
                      {product.name}
                      {/* Underline effect */}
                      <span className="block h-[2px] w-0 bg-black transition-all duration-500 ease-in-out group-hover:w-full absolute left-0 bottom-0"></span>
                    </h2>

                    {/* Price Section */}
                    <div className="text-lg font-light text-black">
                      {/* Display original price with line-through if there’s a discount */}
                      {product.price !== product.priceAfterDiscount && (
                        <span className="text-gray-500 line-through mr-2">
                          Rs. {product.price}
                        </span>
                      )}
                      {/* Display discounted price */}
                      <span className="text-lg text-black">
                        Rs. {product.priceAfterDiscount}
                      </span>
                    </div>
                  </div>

                  {/* Action Icons */}
                  <div className="absolute z-[999] top-2 right-2 flex space-x-2">
                    {token && (
                      <div
                        onClick={(event) => {
                          event.stopPropagation(); // Stop the event from bubbling up
                          handleAddToWishlist(product._id);
                        }}
                        className={`w-8 h-8 rounded-full border border-black cursor-pointer flex justify-center items-center hover:bg-gray-100 transition ${
                          loginuser?.wishlist?.indexOf(product?._id) === -1
                            ? "opacity-50"
                            : "opacity-100"
                        }`}
                      >
                        <FaHeart
                          className={`text-black hover:text-red-500 transition ${
                            loginuser?.wishlist?.indexOf(product?._id) === -1
                              ? "text-gray-800"
                              : "text-red-500"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className=" text-black px-3 py-1 rounded-md  disabled:opacity-50"
            >
              <FaArrowLeft />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageSelect(index + 1)}
                className={`mx-1 px-3 py-1 rounded-md 
                ${
                  currentPage === index + 1
                    ? " text-black font-semibold"
                    : " text-gray-700  hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className=" text-black px-3 py-1 rounded-md  disabled:opacity-50"
            >
              <FaArrowRight />
            </button>
          </div>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Productsforuser;
