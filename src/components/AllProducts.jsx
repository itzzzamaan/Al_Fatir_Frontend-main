import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "../components/Footer";
import LoginPromptModal from "./LoginPromptModal";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { ALL_PRODUCT, WISHLIST_ADD } from "../config/api";
import { jwtDecode } from "jwt-decode";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import { Filter, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { FilterSection } from "./sub-components/Sidebar";
 
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [wishlist, setWishlist] = useState({});
  const [loading, setLoading] = useState(false);
 
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
 
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${ALL_PRODUCT}?page=${page}&size=${size}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data.error) {
        toast.error("Error fetching products.");
      } else {
        setProducts(data.meta.products);
        setTotalPages(data.meta.totalPages);
      }
    } catch (error) {
      toast.error("Error fetching products.");
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchProducts();
  }, [page, size]);
 
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
 
        if (data.error) {
          toast.error("Error updating wishlist.");
        } else {
          setWishlist((prevState) => ({
            ...prevState,
            [productId]: !prevState[productId],
          }));
        }
      } catch (error) {
        toast.success("Add to wishlist.");
      }
    } else {
      toast.error("Please log in to add to wishlist.");
    }
  };
 
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };
 
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
 
  const closeLoginModal = () => {
    setIsModalOpen(false);
  };
 
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <Header />
        <div className="sticky top-0 left-0 w-80 border-r pt-24 h-fit bg-white hidden md:block">
          <FilterSection title={"Availablity"}>Availablity</FilterSection>
          <FilterSection title={"Price"}>Price</FilterSection>
          <FilterSection title={"Product Type"}>
            Product Type yaha daalo
          </FilterSection>
          <FilterSection title={"More Filter's"}>
            Product Type yaha daalo
          </FilterSection>
        </div>
        <div className="sticky top-16  w-screen mt-16 bg-white border border-black  left-0 md:hidden p-3 flex items-center justify-between  ms-auto  z-[50]">
          <div></div>
          <div className="flex gap-6">
            {/* sort by mobile */}
            {/* <div>sort by</div> */}
            <Drawer>
              <DrawerTrigger>Sort By</DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  {/* <DrawerTitleitle>Are you absolutely {"sure?"} </DrawerTitle> */}
                  yeh mobile sort by laga hai
                  <DrawerDescription>yaha tum logic lagao</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose>
                    <X />
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            {/* filter mobile */}
            <div>
              <Sheet>
                <SheetTrigger>
                  <span className="flex flex-row-reverse items-center gap-2">
                    Filter <Filter size={18} />
                  </span>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>yaha daalo filters ko</SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 min-h-screen md:grid-cols-2 mt-10 lg:grid-cols-3 xl:grid-cols-3 px-4 md:gap-10 gap-6 ml-0 ">
          {!loading && products.length > 0 ? (
            products?.map((product) => (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
              >
                <div
                  className="card rounded-0 mt-5 border-none position-relative "
                  data-aos="fade-up"
                >
                  <Link
                    to={`/all-products/${product?.id}`}
                    className="text-decoration-none"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          product.variants?.[0]?.bannerImage ||
                          "placeholder.jpg"
                        }
                        alt={product.productName}
                        className={`w-full h-52 object-cover transition-all duration-600 ${
                          hoveredProductId === product.id ? "scale-110" : ""
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
                      className={`cursor-pointer ${
                        wishlist[product.id] ? "text-red-500" : "text-gray-500"
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
            ))
          ) : (
            <h2 className="font-bold text-center my-5">
              No products available.
            </h2>
          )}
        </div>
      </div>
      <div className="flex justify-center my-4 md:ml-72 ">
        <div className="mx-auto">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className={`bg-gray-400 text-white px-4 py-2 rounded-md ${
              page === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Previous
          </button>
          <span className="mx-4 my-auto">
            {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`bg-black text-white px-4 py-2 rounded-md ${
              page === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Next
          </button>
        </div>
 
        <LoginPromptModal
          isOpen={isModalOpen}
          onClose={closeLoginModal}
          navigate={navigate}
        />
      </div>
 
      <Footer />
    </>
  );
};
 
export default AllProducts;