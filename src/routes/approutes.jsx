import { Routes, Route } from "react-router-dom";
import Home from "../components/home";
import Register from "../components/register";
import Login from "../components/login";
import Contact from "../components/contact";
import NotFound from "../components/NotFoundPage";
import AddProduct from "../components/addProducts";
import ForgotPassword from "../components/forgotpassword";
import UpdatePassword from "../components/updatePassword";
import ResetPassword from "../components/resetpassword";
import ProductsPage from "../components/productsPage";
import Productsforuser from "../components/productsforuser";
import Updateproduct from "../components/updateproduct";
import SingleProduct from "../components/SingleProduct";
import ViewCart from "../components/viewcart";
import CartDrawer from '../components/CartDrawer';
import Orders_details from "../components/Orders_details";
import Customers from "../components/customers";
import Reports from "../components/Reports";
import Search from "../components/Search";
import Wishlist from "../components/wishlist";
import Productsfortest from "../components/Productsfortest";
import Profile from "../components/profile";
import Checkout from "../components/checkout";
import Order from "../components/order.jsx";
import CreateOrder from "../components/CreateOrder";
import UserOrders from "../components/userorders";
import PaymentComponent from "../components/paymentcomponent";
import AboutUs from "../components/AboutUs";
import ShopByCollections from "../components/ShopByCollections";
import ShopByCategories from "../components/ShopByCategories";
import Bakhur from "../components/Bakhur";
import AllProducts from "../components/AllProducts";
import Shopwoody from "../components/Shopwoody";
import Shopfloral from "../components/Shopfloral";
import Shopfruity from "../components/Shopfruity";
import Shoporiental from "../components/Shoporiental";
import Shopfresh from "../components/Shopfresh";
import Shopattars from "../components/Shopattars";
import Shopperfum from "../components/Shopperfum";
import Shopexclusive from "../components/Shopexclusive";
import Shopclassic from "../components/Shopclassic";
import Card2 from '../components/Card2.jsx';

import { Toaster } from "react-hot-toast";
import  Address from '../components/Address';
import BookOnline from '@/components/BookOnline';
import BookingForm from "@/components/BookingForm";





const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/address" element={<Address/>} />

        <Route path="/addproducts" element={<AddProduct />} />
        <Route path="/updatepassword/:token" element={<UpdatePassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/productspage" element={<ProductsPage />} />
        <Route path="/productsforuser" element={<Productsforuser />} />
        <Route path="/productsfortest" element={<Productsfortest />} />
        <Route path="/updateproduct/:productId" element={<Updateproduct />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/shopwoody" element={<Shopwoody />} />
        <Route path="/shopattars" element={<Shopattars />} />
        <Route path="/shopexclusive" element={<Shopexclusive />} />
        <Route path="/shopclassic" element={<Shopclassic />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/book-online" element={<BookOnline />} />
        <Route path="/booking-form" element={<BookingForm />} />
        <Route path="/shopperfum" element={<Shopperfum />} />
        <Route path="/shopfloral" element={<Shopfloral />} />
        <Route path="/shopfruity" element={<Shopfruity />} />
        <Route path="/shoporiental" element={<Shoporiental />} />
        <Route path="/shopfresh" element={<Shopfresh />} />
        <Route path="categories/:categoryName/:categoryId" element={<ShopByCategories />} />

        {/* <Route path="categories/:categoryName" element={<Item />} /> */}
        <Route path="/collections" element={<ShopByCollections />} />
        <Route path="/bakhur" element={<Bakhur />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/all-products/:productId" element={<ProductsPage />} />
        <Route path="/viewcart" element={<ViewCart />} />
        <Route path="/CartDrawer" element={<CartDrawer />} />
        <Route path="/order_history/Details/:orderId" element={<Orders_details/>} />
        <Route path="/order_history" element={<Order />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/search" element={<Search />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/createorder" element={<CreateOrder />} />
        <Route path="/userorder" element={<UserOrders />} />
        <Route path="/payment" element={<PaymentComponent />} />
        <Route path="/Card2" element={<Card2 />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default AppRoutes;
