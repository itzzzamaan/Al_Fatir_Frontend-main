import PageTitle from "./sub-components/PageTitle";
import Header from "./Header";
import Footer from "./Footer";
import { CATEGORY_BY_ID } from "../config/api";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { ProDuctDetails } from "./cards/ProDuctDetails";
import SkeletonLoader from "./cards/SkeletonLoader";

const ShopByCategories = () => {
  const { categoryName, categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [wishlist, setWishlist] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${CATEGORY_BY_ID}/${categoryId}`);
        if (response?.data?.meta) {
          setProducts(response.data.meta.products || []);
        } else {
          throw new Error("No data available");
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [categoryId]);

  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) => ({
      ...prevWishlist,
      [productId]: !prevWishlist[productId],
    }));
  };

  return (
    <div>
      <div className="mb-5">
        <Header />
      </div>
      <div className="my-5 text-uppercase mt-5">
        <PageTitle pageTitle={`${categoryName} Fragrances`} />
      </div>
      {isLoading ? (
        <div className="container my-5 p-5 text-center" style={{ minHeight: "50vh" }}>
          <SkeletonLoader count={6} />
        </div>
      ) : error ? (
        <div className="container my-5 p-5 text-center" style={{ minHeight: "50vh" }}>
          <h2 className="text-danger">Error</h2>
          <p>{error}</p>
          <p
            className="text-decoration-underline cursor-pointer"
            onClick={() => navigate("/all-products")}
          >
            Continue browsing
          </p>
        </div>
      ) : products.length > 0 ? (
        <div className="container" style={{ minHeight: "50vh" }}>
          <div className="row g-3 mb-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="col-lg-4 col-md-6 col-sm-12"
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
              >
                <div
                  className="card rounded-0 mt-5 border-none position-relative"
                  data-aos="fade-up"
                >
                  <Link
                    to={`/all-products/${product?.id}`}
                    className="text-decoration-none"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          product.variants?.[0]?.bannerImage || "placeholder.jpg"
                        }
                        alt={product.productName}
                        className={`w-full h-52 object-cover transition-all duration-600 ${hoveredProductId === product.id ? "scale-110" : ""
                          }`}
                        style={{
                          height: "250px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                      {hoveredProductId === product.id && (
                        <div className="bg-white/40 p-3 z-10 opacity-100 absolute bottom-0 w-full text-black text-center text-xl capitalize">
                          Quick view
                        </div>
                      )}
                    </div>
                  </Link>

                  <div
                    className="position-absolute top-5 right-10 z-10"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <FaHeart
                      className={`cursor-pointer ${wishlist[product.id] ? "text-red-500" : "text-gray-500"
                        }`}
                      size={24}
                    />
                  </div>

                  <div
                    className="card-body p-2"
                    style={{ backgroundColor: "#f5f5f5" }}
                  >
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text">
                      <strong style={{ fontSize: "1.2rem" }}>
                        ₹{product?.variants[0]?.finalPrice || "0"}
                      </strong>
                      &nbsp;
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "gray",
                          fontSize: "0.9rem",
                        }}
                      >
                        ₹{product.variants[0]?.price || "N/A"}
                      </span>
                      &nbsp;
                      <span style={{ color: "green", fontSize: "0.9rem" }}>
                        (
                        {Math.round(
                          ((product.variants[0]?.price -
                            product.variants[0]?.finalPrice) /
                            product.variants[0]?.price) *
                          100
                        )}
                        % off)
                      </span>
                    </p>

                    <p className="text-xs font-semibold text-gray-500">
                      Taxes Included | Free Shipping
                    </p>

                    <select className="w-full border border-gray-300 hover:border-black px-3 py-2 mt-2 text-sm">
                      <option>Size</option>
                      {product.variants.map((variant) => (
                        <option key={variant.variantId} value={variant.size}>
                          {variant.size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      ) : (
        <div
          className="container my-5 p-5 d-flex justify-content-center align-items-center"
          style={{ minHeight: "50vh", flexDirection: "column" }}
        >
          <FaShoppingCart className="mb-3 text-black" size={50} /> 
          <h2 className="font--cursive font-bold text-center">
            Products are out of stock!
          </h2>
          <p
            className="text-decoration-underline cursor-pointer text-center"
            onClick={() => navigate("/all-products")}
          >
            Continue browsing
          </p>
        </div>
      )}
      <ProDuctDetails />
      <Footer className="position bottom-0" />
    </div>
  );
};

export default ShopByCategories;
