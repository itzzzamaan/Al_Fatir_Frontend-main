/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import  { useState, useEffect } from "react";
import Slider from "react-slick";
import Card from "./cards/Card";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import { ALL_PRODUCT } from "../config/api";

const HomeBestSellers = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10); // Set a default page size
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${ALL_PRODUCT}?page=${page}&size=${size}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data.error) {
        toast.error("Error fetching products.");
      } else {
        setProducts(data.meta.products || []);
        setTotalPages(data.meta.totalPages || 0);
      }
    } catch (error) {
      toast.error("Error fetching products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, size]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white py-10 mb-[1px]">
      <h3 className="cursive--font font-extrabold text-center text-black md:text-6xl text-4xl">
        Best Sellers
      </h3>
      <div className="mt-12 bg-white px-2">
        <Slider {...settings} className="w-full">
          {products.map((product, index) => {
            const finalPrice = product.variants[0]?.finalPrice || "N/A";
            const originalPrice = product.variants[0]?.price || "N/A";
            const discount =
              product.variants[0]?.price && product.variants[0]?.finalPrice
                ? Math.round(
                    ((product.variants[0]?.price - product.variants[0]?.finalPrice) /
                      product.variants[0]?.price) *
                      100
                  )
                : 0;

            return (
              <div key={product.id || index} className="p-4">
                <Card
                  image={product.variants[0]?.bannerImage || ""}
                  productName={product.productName}
                  finalPrice={finalPrice}
                  originalPrice={originalPrice}
                  discount={discount}
                  to={`/all-products/${product?.id}`}
                />
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="flex justify-center pt-12">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/all-products");
          }}
          className="bg-transparent text-black font-semibold border-black border-2 rounded-full p-2 px-6 hover:bg-black hover:text-white duration-150 transition-all mx-auto"
        >
          Shop all
        </button>
      </div>

      {/* <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded mr-2"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded ml-2"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default HomeBestSellers;
