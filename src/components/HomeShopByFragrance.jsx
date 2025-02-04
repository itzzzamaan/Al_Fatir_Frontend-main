import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeShopByFragrance = () => {
  const fragranceFamilies = [
    { name: "Floral", image: "/floral.jpg", route: "/categories/floral" },
    { name: "Fresh", image: "/fresh.jpg", route: "/categories/fresh" },
    { name: "Woody", image: "/woody.jpg", route: "/categories/woody" },
    { name: "Oriental", image: "/oriental.jpg", route: "/categories/oriental" },
    { name: "Fruity", image: "/fruity.jpg", route: "/categories/fruity" },
  ];

  return (
    <div className="bg-[#EAEAEA] py-7">
      <h2 className="text-3xl md:text-4xl cursive--font text-center">
        Shop the luxury by Fragrance Family
      </h2>
      <div className="max-w-7xl mx-auto py-10">
        <Swiper
          spaceBetween={30}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          scrollbar={{ draggable: true }}
          navigation={true}
          slidesPerView={4}
          breakpoints={{
            1024: { slidesPerView: 4, spaceBetween: 20 },
            900: { slidesPerView: 3, spaceBetween: 15 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            480: { slidesPerView: 1, spaceBetween: 10 },
          }}
        >
          {fragranceFamilies.map((family, index) => (
            <SwiperSlide key={index}>
              <div className="px-1">
                <Link
                  to={family.route}
                  className="w-full h-96 relative group inline-block"
                >
                  <img
                    src={family.image}
                    alt={family.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 duration-500 transition ease-in z-10">
                    <div className="text-white text-xl md:text-2xl font-bold">
                      {family.name}
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeShopByFragrance;
