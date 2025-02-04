import { useEffect, useState } from "react";

const HomePage = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between min-h-screen bg-white px-6 md:px-20">
      <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
        <h1
          className={`text-4xl md:text-6xl text-gray-900 transition-all duration-1000 ease-out ${
            animate ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          OUD E<br />
          TAMAASHA
        </h1>
        <button
          className={`mt-4 px-6 py-2 bg-black/80 text-white shadow-none text-md rounded-tl-xl rounded-br-xl border-1 border-black/80 transition-all duration-1000 ease-out ${
            animate ? "opacity-100 scale-100" : "opacity-0 scale-50"
          } hover:!bg-white hover:!text-black`}
        >
          Shop Now
        </button>
      </div>

      <div
        className={`w-full md:w-1/2 transition-all duration-1000 ease-out ${
          animate ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <img
          src="https://static.wixstatic.com/media/b6bc2e_db498d82e3e24d6bbf490a2badebfb30~mv2.jpg/v1/fill/w_1424,h_990,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b6bc2e_db498d82e3e24d6bbf490a2badebfb30~mv2.jpg"
          alt="Oud E Tamaasha"
          className="w-full h-[550px] object-cover"
        />
      </div>
    </div>
  );
};

export default HomePage;
