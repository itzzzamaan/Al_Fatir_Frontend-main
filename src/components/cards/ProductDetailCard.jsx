import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const ProductDetailCard = ({ product }) => {
  const [showView, setShowView] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("Select Size");
  const [quantityCount, setQuantityCount] = useState(0);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  function handleShowView() {
    setShowView((prev) => !prev);
  }

  const cardImageRef = useRef();
  useEffect(() => {
    gsap.from(cardImageRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.4,
    });
  }, [showView]);

  const handleCountDecrease = (quantityCount) => {
    if (quantityCount === 0) {
      return;
    } else {
      setQuantityCount(quantityCount - 1);
    }
  };

  const [quantity, setQuantity] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const handleQuantity = () => {
    setDropdown(true);
  };

  return (
   <div className="container ">
    <div className="" >
     <h1 className="font-bold text-center text-2xl my-5">PRODUCT DETAILS</h1>
   </div>
    <div className=" min-h-screen justify-items-center my-5">
     
  <div className="row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
    {/* Image Section */}
    <div className="w-full md:w-1/2 h-64 md:h-auto relative">
      <img
        src={product.filePath}
        className={`w-full h-full object-cover transition-transform duration-200 ${
          showView ? "scale-110" : ""
        }`}
        alt="product"
        onMouseEnter={handleShowView}
        onMouseLeave={handleShowView}
      />
      {showView && (
        <div
          ref={cardImageRef}
          className="bg-white/40 p-3 z-10 opacity-100 absolute bottom-0 w-full text-black text-center cursive--font text-xl capitalize"
        >
         
        </div>
      )}
    </div>

    {/* Content Section */}
    <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
      <h1 className="text-3xl font-semibold text-red mb-4">{product.name}</h1>
      <p className="text-xl font-bold mb-2">₹{product.price}</p>
      <div className="text-base space-y-2">
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Quantity:</strong> {product.quantity}
        </p>
        <p>
          <strong>Volume (ml):</strong> {product.ml}
        </p>
      </div>
    </div>
  </div>
</div>
</div>

  

  );
};

export default ProductDetailCard;
