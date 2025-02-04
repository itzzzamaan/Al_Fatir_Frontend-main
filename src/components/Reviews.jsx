import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules"; 
import "swiper/css"; 
import "swiper/css/navigation"; 
import "swiper/css/pagination"; 
import "swiper/css/scrollbar"; 

const Reviews = () => {
  const testimonials = [
    {
      name: "Ali Ashraf",
      text: "I have used many branded fragrances but never got satisfied by them but after using fatir fragrances I've been mesmerized and also use it on daily basis so my most favourite attar's are oud-e-khas oud-e- tamasha becaucse they smell nice and are the most long lasting attar I've ever used.",
    },
    {
      name: "Saib Arsalan, IN",
      text: "I purchased 'Oudh E Tamasha' from FATIR Apparels and Perfumes. It has become my go-to fragrance...",
    },
    {
      name: "Zuhair Sherwani, IN",
      text: "The fragrance (oud-e-khaas) that i got was of really good quality with a decent longevity, infact all the fragrances that I've tried hasn't let me down. A must check out place for attars.",
    },
    {
      name: "Anam, IN",
      text: "The fragrance (oud-e-khaas) that i got was of really good quality with a decent longevity, infact all the fragrances that I've tried hasn't let me down. A must check out place for attars.",
    },
  ];

  return (
    <div className="bg-black mb-[1px]">
      <div className="max-w-7xl mx-auto py-16">
        <Swiper
          spaceBetween={50}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]} 
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          slidesPerView={1}
          navigation={true}
          autoplay={{
            delay: 1500, 
            disableOnInteraction: false,
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="text-white p-6 text-center ">
                <h3 className="font-bold  text-lg md:text-2xl">{testimonial.name}</h3>
                <div className="w-8 h-[2px] bg-white mx-auto mb-8"></div>
                <p className="px-6 md:px-40 text-lg">{testimonial.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
