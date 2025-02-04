import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import WhatsappBtn from "./WhatsappBtn";

const BookOnline = () => {
  const navigate = useNavigate();

  return (
    <>
    <Header/>
    <div className="flex flex-col mt-20 md:flex-row items-center md:items-start p-6 md:p-12 max-w-4xl mx-auto">
      
      <div className="md:w-1/2 w-full mb-6 md:mb-0">
        <img
          src="https://static.wixstatic.com/media/b6bc2e_30750f0f14114ff58ffe957ae7e6b54d~mv2.png/v1/fill/w_704,h_642,fp_0.50_0.50,q_90,usm_0.66_1.00_0.01,enc_auto/b6bc2e_30750f0f14114ff58ffe957ae7e6b54d~mv2.png"
          alt="Perfume Bottle"
          className=" w-full object-cover grayscale cursor-pointer hover:grayscale-0 transition-transform transform hover:scale-105"
        />
      </div>
      
     
      <div className="md:w-1/2 w-full bg-white p-6 mt-3">
        <h2 className="text-xl md:text-2xl font-bold mb-3">Online Perfume Consultation</h2>
        <p className="text-gray-600 mb-4">
          Discover your signature scent with a personalized consultation.
        </p>
        <a href="#" className="text-gray-700 hover:text-gray-600 underline mb-4 block">
          Read More
        </a>
        
        <div className=" border-t pt-4">
          <span className="text-gray-500">30 min</span>
          <br/>
          <span className="text-gray-900">₹109</span>
        </div>
        
        <button 
          onClick={() => navigate("/booking-form")}
          className=" mt-3 pb-2 w-[100px] text-center hover:underline bg-black text-white py-2 hover:bg-gray-800 transition duration-300"
        >
          Book Now
        </button>
      </div>
    </div>
    <WhatsappBtn/>
    <Footer/>
    </>
  );
};

export default BookOnline;
