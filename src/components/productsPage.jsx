import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PRODUCT_DETAILS, ADD_TO_CART } from "../config/api";
import Header from "../components/Header";
import Footer from "./Footer";
import DOMPurify from "dompurify";
import { jwtDecode } from "jwt-decode";
import { ProDuctDetails } from "./cards/ProDuctDetails";

const ProductsPage = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const navigate = useNavigate();



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${PRODUCT_DETAILS}${productId}`);
        const productData = response?.data?.meta;
        console.log(productData)

        if (productData) {
          setProduct(productData);

          const initialImage =
            productData?.variants?.[0]?.variantImages?.[0] || productData?.filePath || "";
          setCurrentImage(initialImage);

          setSelectedSize(productData.variants?.[0] || null);
        } else {
          toast.error("Product not found.");
          navigate("/");
        }
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch product details");
        setLoading(false);
      }
    };

    if (productId) fetchProduct();

    const token = localStorage.getItem("Token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
      } catch (error) {
        console.error("Failed to decode the token", error);
      }
    }
  }, [productId, navigate]);

  const handleSizeChange = (variantId) => {
    const variant = product?.variants?.find((v) => v.variantId === variantId);
    setSelectedSize(variant);

    if (variant?.variantImages?.length > 0) {
      setCurrentImage(variant.variantImages[0]);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const customerId = decodedToken?.claims?.id;
        console.log("Decoded customerId:", customerId);

        if (customerId) {
          if (!selectedSize) {
            toast.error("Please select a size.");
            return;
          }

          const cartData = {
            customerId: customerId,
            variantId: selectedSize?.variantId,
            quantity: quantity,
          };
          console.log("Cart data:", cartData);

          setLoading(true);
          const response = await axios.post(ADD_TO_CART, cartData);

          if (response.data.error === false) {
            toast.success(response.data.message || "Product added to cart!");
          } else {
            toast.error(response.data.message || "Failed to add product to cart.");
          }
          setLoading(false);
        } else {
          toast.error("Customer ID not found.");
        }
      } catch (error) {
        toast.error("Failed to add product to cart.");
        console.error(error);
        setLoading(false);
      }
    } else {
      toast.error("You need to be logged in to add products to the cart.");
    }
  };


  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center mt-5 border-2 p-3">
            <div className="col-lg-6 col-md-6 col-sm-12 mb-5 md:mb-0">
              <img
                src={currentImage}
                alt="Product"
                className="w-full h-96 object-contain border-2 shadow-lg"
              />
              <div className="flex mt-2 space-x-2">
                {selectedSize?.variantImages?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Variant ${index}`}
                    className="w-16 h-16 border cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:border-2 hover:border-black hover:opacity-75"
                    onClick={() => setCurrentImage(img)}
                    onMouseEnter={() => setCurrentImage(img)} // Hover event to show the image
                    style={{
                      borderColor: currentImage === img ? 'black' : 'transparent', // Highlight border of selected image
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 px-5">
              <h1 className="text-2xl font-semibold mb-1">{product?.productName}</h1>
              <div className="text-sm mt-2 text-gray-500">
                {product?.productDescription ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        product.productDescription.split(" ").slice(0, 500).join(" ") +
                        (product.productDescription.split(" ").length > 500 ? "..." : "")
                      ),
                    }}
                  />
                ) : (
                  <p>No description available.</p>
                )}
              </div>

              <p className="text-base pb-2">
                <strong style={{ fontSize: "1.2rem" }}>
                  ₹{selectedSize?.finalPrice || product?.finalPrice}
                </strong>
                &nbsp;
                <span style={{ textDecoration: "line-through", color: "gray", fontSize: "0.9rem" }}>
                  ₹{selectedSize?.price || product?.price}
                </span>
                &nbsp;
                {selectedSize?.price && selectedSize?.finalPrice && (
                  <span style={{ color: "green", fontSize: "0.9rem" }}>
                    ({Math.round(
                      ((selectedSize?.price - selectedSize?.finalPrice) / selectedSize?.price) * 100
                    )}% off)
                  </span>
                )}
              </p>

              <p className="text-xs text-gray-500 mb-2">
                Taxes Included | <span className="underline">Free Shipping</span>
              </p>

              <div className="mb-2 mt-4 flex flex-col sm:flex-row space-x-0 sm:space-x-2">
                <div className="w-full mb-2 sm:mb-0">
                  <select
                    className="w-full border border-gray-300 hover:border-black px-4 py-2 text-sm shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-all"
                    onChange={(e) => handleSizeChange(e.target.value)}
                    value={selectedSize?.variantId || ""}
                  >
                    <option value="" disabled>
                      Select Size
                    </option>
                    {product?.variants?.map((variant) => (
                      <option key={variant.variantId} value={variant.variantId}>
                        {variant.size}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    className="w-full border border-gray-300 hover:border-black px-4 py-2 text-sm shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-all"
                    placeholder="Quantity"
                    defaultValue="1"
                    onChange={handleQuantityChange}
                  />
                </div>
              </div>

              <div className="mb-2 mt-4">
                <label
                  htmlFor="customText"
                  className="block font-semibold text-xs mb-0.5 py-1"
                >
                  What name would you like to have on your bottle?
                </label>
                <input
                  type="text"
                  id="customText"
                  maxLength="100"
                  className="border w-full p-2 rounded-md text-sm shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  placeholder="Enter name here..."
                />
              </div>

              <div className="mt-2">
                <button
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all w-full"
                  disabled={loading}
                  onClick={handleAddToCart}
                >
                  {loading ? "Adding..." : "Add to Cart"}
                </button>
              </div>

              <div className="mt-2">
                <button
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all w-full"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProDuctDetails />

      <Footer />
    </div>
  );
};

export default ProductsPage;