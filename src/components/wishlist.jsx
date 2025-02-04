import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { WISHLIST_CUSTOMER } from "../config/api";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from "../components/Header";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import { FaHeart } from "react-icons/fa";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredImage, setHoveredImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("Token");
      if (!token) {
        toast.error("You are not logged in, please login first.");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const customerId = decodedToken?.claims?.id;

        if (!customerId) {
          toast.error("Customer ID not found.");
          return;
        }

        const response = await axios.get(`${WISHLIST_CUSTOMER}${customerId}`);
        if (!response.data.error) {
          const products = response.data.meta?.wishlist || [];
          setWishlistItems(products);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch wishlist items");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const toggleWishlist = async (productId) => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const customerId = decodedToken?.claims?.id;
        const url = `${WISHLIST_ADD}?customerId=${customerId}&productId=${productId}`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.error) {
            toast.error("Error updating wishlist.");
          } else {
            setWishlist((prevState) => ({
              ...prevState,
              [productId]: !prevState[productId],
            }));
          }
        } else {
          toast.error("Error updating wishlist.");
        }
      } catch (error) {
        toast.error("Failed to update wishlist.");
      }
    } else {
      toast.error("Please log in to add to wishlist.");
    }
  };

  return (
    <div className="wishlist-container">
      <Header />
      <div className="container my-5">
        <h1 className="text-center font-bold text-3xl mb-5">My Wishlist</h1>

        <div className="wishlist-content">
          {loading ? (
            <div className="row">
              {[...Array(3)].map((_, index) => (
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-4" key={index}>
                  <div
                    className="skeleton-card"
                    style={{
                      height: "400px",
                      background: "#f0f0f0",
                      borderRadius: "8px",
                      padding: "15px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div className="skeleton-img" style={{ flex: 1, background: "#ddd" }} />
                    <div
                      className="skeleton-text"
                      style={{
                        width: "60%",
                        height: "20px",
                        background: "#ddd",
                        margin: "10px 0",
                      }}
                    />
                    <div
                      className="skeleton-price"
                      style={{
                        width: "40%",
                        height: "18px",
                        background: "#ddd",
                      }}
                    />
                  </div>
                </div>


              ))}
            </div>
          ) : wishlistItems.length > 0 ? (
            <div className="row">
              {wishlistItems.map((product) => (
                <div
                  className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-4"
                  key={product.id}
                >
                  <Link
                    to={`/all-products/${product?.productId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="card shadow-sm rounded p-2 position-relative"
                      style={{ overflow: "hidden" }}
                    >
                      <FaHeart
                        className="position-absolute cursor-pointer"
                        style={{
                          top: "25px",
                          right: "30px",
                          fontSize: "2rem",
                          color: "red",
                        }}
                        onClick={() => toggleWishlist(product.productId)}
                      />
                      <img
                        src={hoveredImage || product.variants?.[0]?.bannerImage || "placeholder.jpg"}
                        alt={product.productName}
                        className="img-fluid rounded"
                        style={{ height: "280px", objectFit: "cover" }}
                        // onMouseEnter={() =>
                        //   setHoveredImage(product.variants?.[0]?.variantImages?.[1])
                        // }
                        // onMouseLeave={() => setHoveredImage(null)}
                      />
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
                            ₹{product.variants[0]?.price || "0"}
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
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-wishlist text-center">
              <p className="fs-4 text-gray mb-3">
                No items found in your wishlist. Explore the store to add
                products.
              </p>
              <p
                className="text-decoration-underline cursor-pointer"
                onClick={() => navigate("/")}
              >
                Continue browsing
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
