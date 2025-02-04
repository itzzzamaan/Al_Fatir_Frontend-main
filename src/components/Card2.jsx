import gsap from "gsap";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CART_ADD, WISHLIST_ADD, PRODUCTBYCATEGORY } from "../config/api";

const Card2 = ({ product }) => {
  const [showView, setShowView] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("Select Size");
  // const [quantityCount, setQuantityCount] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const cardImageRef = useRef();

  useEffect(() => {
    gsap.from(cardImageRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.4,
    });
  }, [showView]);

 
  // const handleQuantityChange = (action) => {
  //   setQuantityCount((prevQuantity) => {
  //     if (action === "increase") {
  //       return prevQuantity + 1;
  //     } else if (action === "decrease") {
  //       return Math.max(prevQuantity - 1, 1); 
  //     }
  //     return prevQuantity;
  //   });
    
  // };


  const handleAddToCart = async (productId, quantity) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please Login to add to cart")
      setIsModalOpen(true);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const customerId = decodedToken.claims.id;

      if (!customerId) {
        toast.error("Customer ID not available");
        alert("Customer ID not available")
        return;
      }

      setLoading(true);
      await axios.post(
        `${CART_ADD}${customerId}/${productId}?quantity=1`
      );

      toast.success("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[320px] h-auto m-2 mb-10 bg-white">
      <div className="card p-3 rounded-0 border-none">
        <Link
          to={`/all-products/${product.id}`}
          className="text-decoration-none"
          onMouseEnter={() => setHoveredProductId(product.id)}
          onMouseLeave={() => setHoveredProductId(null)}
        >
          <div className="relative overflow-hidden">
            <img
              src={product.filePath}
              alt={product.name}
              className="img-fluid"
              style={{ height: "250px", width:"100%",objectFit: "cover"}}
            />
            {showView && (
              <div
                ref={cardImageRef}
                className="bg-white/40 p-3 z-10 opacity-100 absolute bottom-0 w-full text-black text-center cursive--font text-xl capitalize"
              >
                quick view
              </div>
            )}
          </div>
        </Link>

        <div className="bg-white text-center font-[300]">
          <div className="text-2xl text-left font-semibold pl-3">
            {product.name}
          </div>
          <div className="text-left pl-3">₹{product.price}</div>
          <div className="text-sm text-left pl-3">
            Taxes included <span className="underline">Free shipping</span>
          </div>
          <select className="w-full border px-3 py-2 mt-2 text-sm">
            <option>Size</option>
            <option>10ml</option>
            <option>20ml</option>
            <option>30ml</option>
          </select>
          <div>
                      {/* Modal */}
                      {isModalOpen && (
                        <div
                          className="relative z-10"
                          aria-labelledby="modal-title"
                          role="dialog"
                          aria-modal="true"
                        >
                          {/* Background backdrop */}
                          <div
                            className="fixed inset-0 bg-gray-500/75 transition-opacity"
                            aria-hidden="true"
                          ></div>

                          {/* Modal content */}
                          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                  <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                      <svg
                                        className="h-6 w-6 text-red-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                                        />
                                      </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                      <h3
                                        className="text-base font-semibold text-gray-900"
                                        id="modal-title"
                                      >
                                        Not Logged In
                                      </h3>
                                      <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                          Please login to add products to your
                                          cart.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                                  <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => navigate("/login")}
                                  >Login
                                  </button>
                                  <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={closeModal}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
          <div className="mt-2">
            <button
              onClick={() => handleAddToCart(product.id)}
              className="bg-black text-white px-4 py-2 w-full"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Card2;
