/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { FiX, FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { IoCartOutline, IoHeartOutline, IoClose } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { ImMenu } from "react-icons/im";
import { jwtDecode } from "jwt-decode";
import {
  FaUser,
  FaKey,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import {
  CUSTOMER,
  GET_CART_BYID,
  CARD_UPDATE,
  DELETE_CARD,
  GET_CATEGORY,
} from "../config/api";
import { toast } from "react-hot-toast";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(null);
  const [quantity, setQuantity] = useState({});

  const handleEditToggle = (index, currentQuantity) => {
    setIsEditing(index);
    setQuantity((prev) => ({ ...prev, [index]: currentQuantity }));
  };

  const handleQuantityChange = (index, value) => {
    setQuantity((prev) => ({ ...prev, [index]: value }));
  };

  const handleSave = async (index, item) => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const customerId = decodedToken?.claims?.id;

        const requestBody = {
          customerId,
          variantId: item.variantId,
          quantity: quantity[index] || item.quantity,
        };
        const response = await axios.put(CARD_UPDATE, requestBody);
        toast.success(response.data.message);
        getCartDetails();
        setIsEditing(null);
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    } else {
      console.log("Token not found");
    }
  };

  const handleRemoveItem = async (index) => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const customerId = decodedToken?.claims?.id;
        const variantId = index;
        const requestBody = {
          customerId,
          variantId,
        };

        const response = await axios.delete(DELETE_CARD, { data: requestBody });

        if (response.data.error === false) {
          getCartDetails();
          toast.success("Item removed from cart");
        } else {
          toast.error("Failed to remove item");
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
        toast.error("Error removing item");
      }
    } else {
      toast.error("Token not found");
    }
  };

  const token = localStorage.getItem("Token");
  let decodedToken;

  const getCartDetails = async () => {
    try {
      const token = localStorage.getItem("Token");
      if (token) {
        const decoded = jwtDecode(token);
        const customerId = decoded?.claims?.id;

        const response = await axios.get(`${GET_CART_BYID}${customerId}`);
        if (response.data.error === false) {
          setCartItems(response.data.meta.items);
        } else {
          console.log(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  };

  useEffect(() => {
    getCartDetails();
  }, []);

  const logout = async () => {
    localStorage.removeItem("Token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownVisible(!isProfileDropdownVisible);
  };

  const [profile, setProfile] = useState({
    username: "",
    dob: "",
    gender: "",
    phonenumber: "",
    email: "",
    profile: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${CUSTOMER}${decodedToken.claims.id}`);
      if (!response.data.error) {
        setProfile(response.data.meta);
      } else if (response.data.error) {
        setProfile(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };
  const [categories, setCategories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${GET_CATEGORY}`)
      .then((response) => {
        if (response.data.meta) {
          setCategories(response.data.meta);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const routes = [
    { name: "Home", path: "/" },
    {
      name: "Fragnance Familes",
      root: categories.map((category) => ({
        name: category.categoryName,
        path: `/categories/${category.categoryName.toLowerCase()}`,
      })),
    },
    { name: "Bakhur", path: "/categories/bakhur" },
    { name: "All Products", path: "/all-products" },
    { name: "Contact us", path: "/contact-us" },
    { name: "Book Online", path: "/book-online" },
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[1000]">
      <header className="bg-white  px-4 sm:px-6  ">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <Link to={"/"} className="inline-block">
            <img
              src="https://static.wixstatic.com/media/b6bc2e_7e30de46c7e044a48b5a902607416de4~mv2.png/v1/crop/x_384,y_200,w_1209,h_689/fill/w_170,h_97,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo.png"
              alt=""
            />
          </Link>

          <div className="hidden sm:flex items-center space-x-4 lg:space-x-6 cursive--font">
            <nav className="cursive--font p-4">
              <ul className="flex space-x-4">
                {routes.map((route, index) => (
                  <li key={index} className="relative">
                    {route.path && (
                      <NavLink
                        to={route.path}
                        className={({ isActive }) =>
                          isActive
                            ? "text-yellow-500 font-bold text-lg"
                            : "text-lg hover:text-yellow-500 text-[#848584]"
                        }
                        end
                      >
                        {route.name}
                      </NavLink>
                    )}
                    {route.root && (
                      <div className="relative text-lg" ref={dropdownRef}>
                        <button
                          className="text-[#848584] hover:text-yellow-500"
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === index ? null : index
                            )
                          }
                        >
                          {route.name}
                        </button>
                        {openDropdown === index && (
                          <ul className="absolute top-full left-0 bg-white border shadow-lg rounded mt-2">
                            {categories.map((subRoute, subIndex) => (
                              <li key={subIndex}>
                                <NavLink
                                  to={`/categories/${subRoute.categoryName}/${subRoute.categoryId}`}
                                  className={({ isActive }) =>
                                    isActive
                                      ? "text-yellow-500 font-bold"
                                      : "hover:text-yellow-500 text-[#848584]"
                                  }
                                >
                                  {subRoute.categoryName}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex relative items-center space-x-4 lg:space-x-6">
            <div className="hidden sm:block text-black text-sm font-light">
              INR ₹ | India
            </div>

            <FiSearch
              className="text-black cursor-pointer"
              onClick={() => navigate("/search")}
              size={20}
            />

            <div className="relative flex items-center">
              <FaRegUser
                className="text-black cursor-pointer"
                size={20}
                onClick={toggleProfileDropdown}
              />

              {isProfileDropdownVisible && (
                <div className="absolute top-full right-0 mt-2 w-[250px] bg-white rounded shadow-lg py-2 z-10">
                  {token ? (
                    <>
                      <div className="text-center p-4">
                        <img
                          className="w-20 h-20 rounded-full mx-auto"
                          src={
                            profile.profile ||
                            "https://th.bing.com/th?id=OIP.TpqSE-tsrMBbQurUw2Su-AHaHk&w=247&h=252&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                          }
                          alt="Profile Pic"
                        />
                        <h2 className="mt-4 text-lg font-semibold">
                          {profile.firstName} {profile.lastName}
                        </h2>
                        <p className="text-gray-600">{profile.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                      >
                        <FaUser className="mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/order_history"
                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                      >
                        <i className="fa-regular fa-credit-card mr-2"></i>
                        Orders
                      </Link>
                      <Link
                        to="/resetpassword"
                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                      >
                        <FaKey className="mr-2" />
                        Reset Password
                      </Link>
                      <button
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 transition ease-out"
                        onClick={logout}
                      >
                        <FaSignOutAlt className="mr-2" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                      >
                        <FaSignInAlt className="mr-2" />
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                      >
                        <FaUserPlus className="mr-2" />
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {token && (
              <>
                <div className="flex items-center space-x-4">
                  <IoHeartOutline
                    className="text-black cursor-pointer"
                    onClick={() => navigate("/wishlist")}
                    size={23}
                    aria-label="Go to Wishlist"
                  />
                  <div className="relative">
                    <IoCartOutline
                      className="text-black cursor-pointer"
                      size={24}
                      id="offcanvasRightLabel"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                      aria-label="Open Shopping Cart"
                    />

                    <div
                      className="offcanvas offcanvas-end bg-slate-100"
                      tabIndex="-1"
                      id="offcanvasRight"
                      aria-labelledby="offcanvasRightLabel"
                    >
                      <div className="offcanvas-header">
                        <h5
                          className="offcanvas-title fw-bold"
                          id="offcanvasRightLabel"
                        >
                          Shopping Cart
                        </h5>
                        <button
                          type="button"
                          className="fw-bold"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        >
                          Close
                        </button>
                      </div>

                      <div className="offcanvas-body d-flex flex-column">
                        {cartItems.length === 0 ? (
                          <p>Your cart is currently empty.</p>
                        ) : (
                          <div className="flex-grow-1 overflow-auto">
                            {cartItems.map((item, index) => (
                              <div
                                key={index}
                                className="cart-item d-flex justify-content-between align-items-center shadow p-3 mb-2 bg-body"
                                style={{ borderRadius: "10px" }}
                              >
                                <div className="cart-item-image-container d-flex align-items-center">
                                  <img
                                    src={item.image[0]}
                                    alt={item.productName}
                                    className="cart-item-image"
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                      objectFit: "cover",
                                      borderRadius: "8px",
                                    }}
                                  />
                                </div>

                                <div className="cart-item-details ms-3 flex-grow-1">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <Link
                                      className="mb-1"
                                      to={`/all-products/${item.productId}`}
                                    >
                                      <strong>
                                        {item.productName
                                          .split(" ")
                                          .slice(0, 5)
                                          .join(" ")}
                                        {item.productName.split(" ").length > 10
                                          ? "..."
                                          : ""}
                                      </strong>
                                    </Link>

                                    <div className="cart-item-actions">
                                      <IoClose
                                        className="text-danger cursor-pointer"
                                        size={20}
                                        onClick={() =>
                                          handleRemoveItem(item.variantId)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <p className="mb-1">₹ Price: {item.price}</p>

                                  <div className="mb-1">
                                    {isEditing === index ? (
                                      <input
                                        type="number"
                                        value={quantity[index] || item.quantity}
                                        onChange={(e) =>
                                          handleQuantityChange(
                                            index,
                                            e.target.value
                                          )
                                        }
                                        style={{
                                          width: "60px",
                                          padding: "5px",
                                          borderRadius: "4px",
                                          borderColor: "#ccc",
                                          borderWidth: "1px",
                                        }}
                                      />
                                    ) : (
                                      <span>Quantity: {item.quantity}</span>
                                    )}
                                  </div>

                                  <p className="mb-1">
                                    <strong>Total: Rs.{item.totalPrice}</strong>
                                  </p>

                                  <div className="d-flex mt-3 gap-2">
                                    <button
                                      className="btn btn-sm"
                                      style={{
                                        width: "40%",
                                        backgroundColor: "black",
                                        color: "white",
                                      }}
                                      onClick={() => handleRemoveItem(index)}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="btn btn-sm"
                                      style={{
                                        width: "40%",
                                        backgroundColor: "black",
                                        color: "white",
                                      }}
                                      onClick={() =>
                                        isEditing === index
                                          ? handleSave(index, item)
                                          : handleEditToggle(
                                              index,
                                              item.quantity
                                            )
                                      }
                                    >
                                      {isEditing === index ? "Save" : "Edit"}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div
                          className="cart-footer mt-auto p-2 bg-slate-100 border-top"
                          style={{ position: "sticky", bottom: "0" }}
                        >
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <strong>Total Amount :</strong>
                            <strong
                              style={{ fontSize: "1.2rem", color: "#000" }}
                            >
                              {" "}
                              {new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                                maximumFractionDigits: 0,
                              }).format(
                                cartItems.reduce(
                                  (acc, item) => acc + item.totalPrice,
                                  0
                                )
                              )}
                            </strong>
                          </div>
                          <button
                            onClick={() => {
                              const totalPrice = cartItems.reduce(
                                (acc, item) => acc + item.totalPrice,
                                0
                              );
                              navigate("/address", { state: { totalPrice } });
                            }}
                            className="btn w-100"
                            style={{
                              backgroundColor: "black",
                              color: "white",
                            }}
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <ImMenu
              className="text-black sm:hidden cursor-pointer"
              size={24}
              onClick={toggleSidebar}
            />
          </div>

          <div
            className={`sm:hidden absolute top-0 left-0 bg-black w-64 h-screen z-50 p-8 sidebar ${
              isSidebarOpen ? "sidebar-open" : ""
            }`}
          >
            {isSidebarOpen && (
              <>
                <FiX
                  className="text-white cursor-pointer mb-6"
                  size={24}
                  onClick={toggleSidebar}
                />
                <nav className="cursive--font p-4">
                  <ul className="space-y-4">
                    {routes.map((route, index) => (
                      <li key={index}>
                        <NavLink
                          to={route.path}
                          className={({ isActive }) =>
                            isActive
                              ? "text-yellow-500 font-bold"
                              : "hover:text-yellow-500 text-white"
                          }
                          end
                        >
                          {route.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
