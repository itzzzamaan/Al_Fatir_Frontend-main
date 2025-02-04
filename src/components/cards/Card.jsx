import { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ image, to, productName, finalPrice, originalPrice, discount }) => {
  const [showView, setShowView] = useState(false);

  function handleShowView() {
    setShowView((prev) => !prev);
  }

  return (
    <div className="w-full sm:w-[450px] md:w-[350px] lg:w-[300px] xl:w-[440px] h-auto m-2 mb-10 bg-white">
      <div className="flex flex-col space-y-4">
        <div className="card p-3">
          <div
            className="w-full xl:h-[300px] relative overflow-hidden"
            onMouseEnter={handleShowView}
            onMouseLeave={handleShowView}
          >
            <img
              src={image}
              className={`w-full h-full object-cover transition-all duration-200 ${showView ? "scale-110" : ""}`} // Adjusted image styling here
              alt="product-card"
            />
            {showView && (
              <Link to={to} className="text-decoration-none">
                <div
                  className="bg-white/40 p-3 z-10 opacity-100 absolute bottom-0 w-full text-black text-center cursive--font text-xl capitalize cursor-pointer"
                >
                  Quick view
                </div>
              </Link>
            )}
          </div>
          <div className="bg-white text-center font-[300]">

            <h2 className="text-xl font-semibold mb-1 mt-2 text-left">
              {productName.length > 20 ? `${productName.slice(0, 40)}...` : productName}
            </h2>

            <div className="text-left align-items-center">
              <p className="card-text">
                <strong style={{ fontSize: "1.2rem", fontWeight: "bold" }}>₹{finalPrice}</strong>
                &nbsp;
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "gray",
                    fontSize: "0.9rem",
                  }}
                >
                  ₹{originalPrice}
                </span>
                &nbsp;
                <span style={{ color: "green", fontSize: "0.9rem" }}>
                  ({discount}% off)
                </span>
              </p>
            </div>
            <div className="text-sm text-left align-items-center">
              Taxes included | <span className="underline">Free shipping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
