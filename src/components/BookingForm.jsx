import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsappBtn from "./WhatsappBtn";

const BookingForm = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("3 February 2025");
  const [selectedTime, setSelectedTime] = useState("1:30 pm");
  const [currentMonth, setCurrentMonth] = useState(1);

  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
  ];

  const availableTimes = [
    "1:30 pm", "2:00 pm", "2:30 pm", "3:00 pm", "3:30 pm", "4:00 pm", "4:30 pm", "5:00 pm",
  ];

  const daysInMonth = new Date(2025, currentMonth + 1, 0).getDate();

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleMonthChange = (direction) => {
    setCurrentMonth((prev) => {
      let newMonth = prev + direction;
      if (newMonth < 0) newMonth = 11;
      if (newMonth > 11) newMonth = 0;
      return newMonth;
    });
  };

  return (
    <>
      <Header />
      <div className="p-6 mt-20 md:p-12 max-w-5xl mx-auto bg-white flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 w-full">
          <button onClick={() => navigate("/book-online")} className="text-lg text-gray-800 hover:text-gray-600 mb-7">❮ Back</button>
          <h2 className="text-3xl font-bold mb-4">Online Perfume Consultation</h2>
          <p className="text-gray-600 mb-6">Check out our availability and book the date and time that works for you.</p>

          <div className="border-b pb-6 mb-6">
            <div className="flex border-b items-center justify-between">
              <h3 className="text-xl font-semibold">Select a Date and Time</h3>
              <p className="text-gray-500"> India Standard Time (IST) </p>
            </div>

            <div className="flex items-center mt-3 justify-between mb-4">
              <button onClick={() => handleMonthChange(-1)} className="text-sm font-semibold">❮</button>
              <span className="text-md font-semibold">{months[currentMonth]} 2025</span>
              <button onClick={() => handleMonthChange(1)} className="text-sm font-semibold">❯</button>
              <p className="text-gray-500 ">{selectedDate}</p>
            </div>

            <div className="flex gap-5 flex-col md:flex-row">
              <div className="grid flex-1 grid-cols-7 h-6 gap-3 text-center text-gray-700 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="font-semibold">{day}</div>
                ))}
                {[...Array(daysInMonth)].map((_, index) => (
                  <button
                    key={index}
                    className={`p-2 ${selectedDate === `${index + 1} ${months[currentMonth]} 2025` ? "bg-black text-white" : "bg-gray-100"}`}
                    onClick={() => setSelectedDate(`${index + 1} ${months[currentMonth]} 2025`)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="grid flex-1 h-fit grid-cols-2 md:grid-cols-2 gap-4">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    className={`p-2 border ${selectedTime === time ? "bg-black/10 text-black" : "bg-gray-100"}`}
                    onClick={() => handleTimeSelection(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/3 w-full sm:mt-28 md:mt-32 p-6">
          <h3 className="text-xl font-semibold mb-3">Service Details</h3>
          <p className="text-gray-700 text-lg">Online Perfume Consultation</p>
          <p className="text-gray-500">{selectedDate} at {selectedTime}</p>
          <p className="text-gray-500 text-sm">Call</p>
          <p className="text-gray-500 text-sm">Staff Member #1</p>
          <p className="text-gray-700 text-sm">30 min</p>
          <p className="text-gray-900 text-sm mb-3 border-b ">₹109</p>
          <button className="mt-3 w-full h-fit bg-black text-white py-2 hover:bg-gray-800 transition duration-300">
            Next
          </button>
        </div>
      </div>
      <WhatsappBtn />
      <Footer />
    </>
  );
};

export default BookingForm;
