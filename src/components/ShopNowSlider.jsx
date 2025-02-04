/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const ShopNowSlider = () => {
  const navigate = useNavigate();

  const images = [
    {
      src: "https://media.istockphoto.com/id/1449865984/photo/concept-of-natural-essential-organic-oils-bali-spa-beauty-treatment-relax-time-atmosphere-of.jpg?s=612x612&w=0&k=20&c=uqfDkav8sCFXjkfsMnnRwXXnlNSKY-scpxtOpSjgjAE=",
      title: "Artisanal Craftsmanship",
      description:
        "A fragrance collection thoughtfully crafted and curated for the Mindful man. Where each scent embodies a unique blend of sophistication and tranquility, Crafted to enhance your daily ritual. Experience the essence of mindfulness with fragrances that inspire confidence ",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0134/4392/4026/files/How_To_Apply_Attar_2.jpg?v=1682198464",
      title: "The Graceful Women",
      description:
        "A fragrance collection thoughtfully crafted and curated for the Mindful man. Where each scent embodies a unique blend of sophistication and tranquility, Crafted to enhance your daily ritual. Experience the essence of mindfulness with fragrances that inspire confidence ",
    },
    {
      src: "https://media.istockphoto.com/id/645045166/photo/homemade-rose-facial-tonic-glass-jar-of-flower-attar-bottle-pippette.jpg?s=612x612&w=0&k=20&c=0gfgPSTD9X--TMWTqi3fsmLSDH8PwnCdRjaEmNMz4Ao=",
      title: "Oud Elixirs Collection",
      description:
        "A fragrance collection thoughtfully crafted and curated for the Mindful man. Where each scent embodies a unique blend of sophistication and tranquility, Crafted to enhance your daily ritual. Experience the essence of mindfulness with fragrances that inspire confidence ",
    },
    {
      src: "https://static.vecteezy.com/system/resources/thumbnails/024/761/839/small_2x/concentrated-perfume-in-a-mini-bottle-with-pink-scented-tea-rose-on-the-black-background-photo.jpg",
      title: "The Mindful Men",
      description:
        "A fragrance collection thoughtfully crafted and curated for the Mindful man. Where each scent embodies a unique blend of sophistication and tranquility, Crafted to enhance your daily ritual. Experience the essence of mindfulness with fragrances that inspire confidence ",
    },
    {
      src: "https://www.shutterstock.com/image-photo/antique-glass-bottle-filled-indian-600nw-1739233994.jpg",
      title: "Fragrance of Heaven",
      description:
        "A fragrance collection thoughtfully crafted and curated for the Mindful man. Where each scent embodies a unique blend of sophistication and tranquility, Crafted to enhance your daily ritual. Experience the essence of mindfulness with fragrances that inspire confidence ",
    },
    {
      src: "https://st2.depositphotos.com/1177973/11923/i/450/depositphotos_119231682-stock-photo-bottle-with-rose-petals.jpg",
      title: "Luxury Fragrance",
      description:
        "A fragrance collection thoughtfully crafted and curated for the Mindful man. Where each scent embodies a unique blend of sophistication and tranquility, Crafted to enhance your daily ritual. Experience the essence of mindfulness with fragrances that inspire confidence ",
    },
    {
      src: "https://img1.wsimg.com/isteam/ip/b6a3a7e0-fe6c-4191-b7b5-f63f697f7c1f/WhatsApp%20Image%202021-08-09%20at%2011.17.51%20PM.jpeg/:/cr=t:0%25,l:0.25%25,w:99.75%25,h:100%25/rs=w:360,h:270.6766917293233,cg=true",
      title: "Unique Blend",
      description:
        "A fragrance collection thoughtfully crafted and curated for the Mindful man. Where each scent embodies a unique blend of sophistication and tranquility, Crafted to enhance your daily ritual. Experience the essence of mindfulness with fragrances that inspire confidence ",
    },
  ];

  return (
    <>
      <div className="bg-white py-12 px-4 mt-2 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Embrace The Affordable Luxury
        </h2>
        <p className="text-base md:text-lg text-gray-600">
        Experience the Art of Scent. <br />
          The meticulous blending of various fragrance notes to encapsulate a
          unique and memorable olfactory experience
        </p>
      </div>

      <div className="flex flex-col md:hidden items-center px-4">
        {images.map((image, index) => (
          <div key={index} className="mb-6 w-full max-w-xs">
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-64 object-cover border border-black grayscale hover:grayscale-0 transition-transform transform hover:scale-105 "
            />
            <p className="text-gray-700 text-center text-md mt-2 px-2">
              {image.description}
            </p>
          </div>
        ))}
      </div>

      <div className="relative w-full flex-1 flex-col items-center justify-center py-7 hidden md:flex">
        <Swiper
          modules={[Navigation]}
          navigation={true}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          effect="coverflow"
          speed={800}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          coverflowEffect={{ rotate: 50, stretch: 10, depth: 100, modifier: 1 }}
          className="w-full max-w-7xl"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="text-center">
              <div className="overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-11/12 h-96 border border-black object-cover grayscale hover:grayscale-0 transition-transform transform hover:scale-105 mx-auto"
                />
                <p className="text-gray-600 text-sm mt-3 px-4 mb-2">
                  {image.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ShopNowSlider;
