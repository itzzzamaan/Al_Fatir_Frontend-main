import Header from "./Header";
import Footer from "./Footer";
import ShopMoreSection from "./ShopMoreSection";
import Reviews from "./Reviews";
import HomeBestSellers from "./HomeBestSellers";
import HomeShopByFragrance from "./HomeShopByFragrance";
import { ProDuctDetails } from "./cards/ProDuctDetails";
import HomePage from "./HomePage";
import ShopNowSlider from "./ShopNowSlider";
import WhatsappBtn from "./WhatsappBtn";




const Home = () => {
  return (
    <div className="home  text-gray-800 overflow-x-hidden overflow-y-auto">
      <Header />

      <HomePage />
      <ShopMoreSection />

      <ShopNowSlider />
      
      <HomeShopByFragrance />

      <HomeBestSellers />
      <ProDuctDetails />
      <Reviews />
      <WhatsappBtn />

      <Footer />

      <div>
        {/* <div className="rounded-full p-4 z-[1000] bg-black text-2xl md:hidden block text-white w-fit fixed bottom-4 right-4">
          <HiOutlineDotsHorizontal />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
