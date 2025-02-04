import { useNavigate } from "react-router-dom";


const ShopMoreSection = () => {
  const navigate = useNavigate();

  return (
    <>
    <h1 className="text-6xl mb-3 text-center"> WHAT IS FATIR ?</h1>
    <div
      className="relative md:min-h-[600px] min-h-[300px] w-full bg-cover bg-center flex items-center justify-center">
      <video
        src="https://video.wixstatic.com/video/b6bc2e_65cdc655e45f4236967243cce79bbec6/1080p/mp4/file.mp4"
        className="absolute inset-0 w-full h-full object-cover "
        autoPlay={true}
        loop
        muted
      ></video>
      <div className="absolute inset-0 flex justify-center items-center flex-col text-center space-y-6 bg-black/40">
        <p className="text-white text-3xl md:text-4xl lg:text-5xl font-normal">
          Discover the Latest Trends
        </p>
        <button
          onClick={() => navigate("/all-products")}
          className="px-8 py-3 border border-white text-white text-lg font-medium rounded-md shadow-lg transition-transform duration-300 transform hover:scale-105"
        >
          Shop More
        </button>
      </div>
    </div>
    </>
  );
};

export default ShopMoreSection;
