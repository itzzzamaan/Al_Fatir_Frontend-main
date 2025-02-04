import React from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";
import { CARTITEMS } from "../config/api";

export default function CartDrawer() {
    const testimonialsData = [
        {
          id: 1,
          image: "/assets/img/img-testimonials1.png",
          name: "John Doe",
          testimonial:
            "The courses offered through this LMS have been incredibly engaging and informative. I now feel more confident in my skills! - Green Valley High School",
        },
        {
          id: 2,
          image: "/assets/img/img-testimonials2.png",
          name: "Jane Smith",
          testimonial:
            "This platform helped me stay organized and complete my lessons on time. I love the interactive content! - Westbrook Academy",
        },]
  return (
   
    <div>
        {testimonialsData.map((item) => (
  <div key={item.id} className="px-3">
    <div className="card card-bordered testimonial-card rounded-0 shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="testimonial-image">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover"
        />
      </div>
      <div className="testimonial-body p-4 bg-white">
        <p className="testimonial-text text-gray-700 italic mb-3">
          "{item.testimonial}"
        </p>
        <h5 className="font-bold text-gray-900 text-lg">{item.name}</h5>
        <p className="text-gray-500 text-sm">{item.role}</p>
      </div>
    </div>
  </div>
))}

     
    </div>
  );
}
