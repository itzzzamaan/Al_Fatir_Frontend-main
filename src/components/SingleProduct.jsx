/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ClipLoader } from "react-spinners";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";

import {
  FaShippingFast,
  FaShareAlt,
  FaHeadset,
  FaShoppingCart,
  FaGift,
  FaStar,
  FaStarHalfAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";
// import Input from "./input";
import CartContext from "../contexts/cartcontext";

const SingleProduct = () => {
  const [show, setshow] = useState(false);

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [moreProducts, setMoreProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  // const [ratingData, setRatingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const fetchProductData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/products/product/${id}?token=${token}`
      );
      setProduct(response.data?.product);

      if (response.data.product.reviews) {
        setReviews(response.data.product.reviews);
      }
      console.log(reviews);
      if (
        response.data.similarProducts &&
        response.data.similarProducts.length > 0
      ) {
        setSimilarProducts(response.data.similarProducts);
      } else if (
        response.data.moreProducts &&
        response.data.moreProducts.length > 0
      ) {
        setMoreProducts(response.data.moreProducts);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      toast.error("Failed to load product data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id, token]);

  const handleAddToCart = async (productId) => {
    if (!token) {
      toast.info("Please log in first to add products to the cart.");
      alert("Please log in first to add products to the cart.");
      navigate("/login");
      return; // Exit the function if no token is present
    }
    try {
      const { data } = await axios.post(`/users/user/cart/add?token=${token}`, {
        productId,
      });
      console.log(data.cart.items);
      setCart(data.cart.items.length);
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };

  const handleBuyNow = async (productId) => {
    try {
      await handleAddToCart(productId);
      navigate("/viewcart"); // Redirect to cart page
    } catch (error) {
      console.error("Error buying product:", error);
      toast.error("Failed to buy product.");
    }
  };

  const handleViewProductClick = (productId) => {
    navigate(`/singleproduct/${productId}`);
  };

  // Slider settings for main image carousel
  const settings = {
    dots: product?.images?.length > 1,
    infinite: product?.images?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    beforeChange: (current, next) => setCurrentImageIndex(next),
  };

  const similarSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index); 
  };

  const handleReview = () => {
    setshow(!show);
  };


  const handleAddToWishlist = async (productId) => {
    if (!token) {
      toast.info("Please log in first to add products to the wishlist.");
      alert("Please log in first to add products to the wishlist.");
      navigate("/login");
      return; 
    }

    try {
      await axios.put(`/user/wishlist/add?token=${token}`, { productId });
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || "Product Title",
          url: window.location.href,
        });
       
      } catch (error) {
        console.error("Error sharing:", error);
        alert("Failed to share the URL.");
      }
    } else {
      alert("Sharing is not supported in your browser.");
    }
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-16 left-0 mt-12 ml-4 flex items-center  text-gray-700 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300"
          >
            <FaArrowLeft className="mr-2" />
          </button>
          {/* Product Image and Thumbnails */}
          <div className="lg:w-6/12">
            {product ? (
              <>
                <div className="mb-4">
                  <Slider {...settings} initialSlide={currentImageIndex}>
                    {product.images && product.images.length > 0 ? (
                      product.images.map((image, index) => (
                        <div key={index}>
                          <img
                            src={image}
                            alt={`${product.name} image ${index + 1}`}
                            className="w-full h-[60vh] object-contain rounded-lg "
                            loading="lazy"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="h-72 flex justify-center items-center bg-gray-200 rounded-lg">
                        <p>No images available.</p>
                      </div>
                    )}
                  </Slider>
                </div>

              </>
            ) : (
              <div className="h-72 flex justify-center items-center bg-gray-200 rounded-lg">
                <ClipLoader color="#007bff" size={50} />
              </div>
            )}
          </div>

          
          <div className="relative lg:w-6/12 flex flex-col justify-between rounded-lg h-96 p-6">
          
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 flex items-center gap-2 bg-black text-white py-2 px-3 rounded-lg hover:bg-white hover:text-black border border-black transition duration-300"
            >
              <FaShareAlt /> 
              Share
            </button>

            
            <div>
              <div className="mb-6">
                <h2 className="text-4xl font-semibold mb-2">
                  {product?.name || "Product Title"}
                </h2>
                <div className="flex items-center mb-2">
                  <p className="text-2xl text-gray-800 font-semibold mr-2">
                    {product?.priceAfterDiscount || "$100.00"}
                  </p>
                  <div className="flex items-center">
                    <span className="text-yellow-400">
                      &#9733;&#9733;&#9733;&#9733;&#9734;
                    </span>
                    <p className="ml-2 text-gray-500">
                      {product?.reviews.length || "1624 reviews"}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  {product?.description || "Product description."}
                </p>
              </div>

              {/* Stock Info */}
              <div className="mb-6">
                <p className="text-green-600 font-semibold flex items-center">
                  <span className="mr-2">&#10003;</span> In stock and ready to
                  ship
                </p>
              </div>
            </div>

            {/* Add to Cart and Wishlist Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => handleBuyNow(product._id)}
                className={`bg-black text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black border border-black transition duration-300 ${
                  product?.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={product?.stock <= 0}
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleAddToWishlist(product._id)}
                className={`bg-white text-black py-2 px-4 rounded-lg hover:bg-black hover:text-white border border-black transition duration-300 ${
                  product?.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={product?.stock <= 0}
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
        {/* icons in middle  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8  p-8 ">
          {/* Free Delivery */}
          <div className="text-center">
            <div className="mb-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mx-auto flex items-center justify-center">
                <FaShippingFast className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-xl font-bold">Free delivery all year long</h3>
            <p className="text-gray-500 mt-2">
              Name another place that offers year-long free delivery? We’ll be
              waiting. Order now and you’ll get delivery absolutely free.
            </p>
          </div>

          {/* 24/7 Customer Support */}
          <div className="text-center">
            <div className="mb-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full mx-auto flex items-center justify-center">
                <FaHeadset className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-xl font-bold">24/7 Customer Support</h3>
            <p className="text-gray-500 mt-2">
              Or so we want you to believe. In reality, our chat widget is
              powered by a naive series of if/else statements that churn out
              canned responses. Guaranteed to irritate.
            </p>
          </div>

          {/* Fast Shopping Cart */}
          <div className="text-center">
            <div className="mb-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full mx-auto flex items-center justify-center">
                <FaShoppingCart className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-xl font-bold">Fast Shopping Cart</h3>
            <p className="text-gray-500 mt-2">
              Look at the cart in that icon, there's never been a faster cart.
              What does this mean for the actual checkout experience? I don't
              know.
            </p>
          </div>

          {/* Gift Cards */}
          <div className="text-center">
            <div className="mb-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center">
                <FaGift className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-xl font-bold">Gift Cards</h3>
            <p className="text-gray-500 mt-2">
              We sell these hoping that you will buy them for your friends and
              they will never actually use it. Free money for us, it's great.
            </p>
          </div>
        </div>
       
        <div className="p-8 bg-gray-50 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <div className="flex items-center">
              <div className="flex items-center">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStarHalfAlt className="text-yellow-400" />
              </div>
            </div>


            <div className="mt-6">
              <h3 className="font-bold">Share your thoughts</h3>
              <p className="text-gray-500 text-sm">
                If you've used this product, share your thoughts with other
                customers.
              </p>
              <button
                onClick={() => handleReview()}
                className="mt-2 py-2 px-4 border border-gray-300 rounded-lg text-sm"
              >
                Write a review
              </button>

              {/* {show ? <Input id={id} show={show} setshow={setshow}  /> :  ""} */}
              {show ? (
                <Input
                  id={id}
                  show={show}
                  setshow={setshow}
                  fetchProductData={fetchProductData} // Passing the fetch function
                />
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Individual Reviews */}
          <div>
            {reviews && reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="mb-8">
                  <div className="flex items-center mb-2">
                    <img
                      src={
                        review?.user?.profiles ||
                        "https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww"
                      } // Fallback image if no profile image
                      alt={review?.user?.username}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-bold">{review?.user?.username}</h4>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <FaStar
                            key={i}
                            className={`text-yellow-400 ${
                              i < review.rating ? "" : "opacity-50"
                            }`} // Highlight filled stars
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No reviews found</p> // Message when no reviews are available
            )}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 ml-8">
            {similarProducts.length > 0 ? "Similar Products" : "More Products"}
          </h3>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <ClipLoader color="#007bff" size={50} />
            </div>
          ) : similarProducts.length === 1 ? (
            // If only one product, display it without the slider
            <div className="flex justify-start items-center">
              {similarProducts.map((product) => (
                <div
                  key={product._id}
                  className="p-4 cursor-pointer"
                  onClick={() => handleViewProductClick(product._id)}
                >
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="flex justify-center items-center h-48">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 font-custom cursor-pointer">
                      <h2 className="relative text-lg font-light font-custom text-gray-700 mb-2">
                        {product.name}
                        <span className="block h-[2px] w-0 bg-black transition-all duration-500 ease-in-out group-hover:w-full absolute left-0 bottom-0"></span>
                      </h2>
                      <p className="text-gray-800 mb-2">
                        {product.priceAfterDiscount}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Display slider for multiple products
            <Slider {...similarSettings}>
              {(similarProducts.length > 0
                ? similarProducts
                : moreProducts
              ).map((product) => (
                <div
                  key={product._id}
                  className="p-4 cursor-pointer"
                  onClick={() => handleViewProductClick(product._id)}
                >
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="flex justify-center items-center h-48">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 font-custom cursor-pointer">
                      <h2 className="relative text-lg font-light font-custom text-gray-700 mb-2">
                        {product.name}
                        <span className="block h-[2px] w-0 bg-black transition-all duration-500 ease-in-out group-hover:w-full absolute left-0 bottom-0"></span>
                      </h2>
                      <p className="text-gray-800 mb-2">
                        {product.priceAfterDiscount}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
