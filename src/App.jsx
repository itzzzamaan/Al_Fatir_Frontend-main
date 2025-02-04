import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AppRoutes from "./routes/approutes";
import { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init()

const App = () => {
  const [intro, setIntro] = useState(true);

  // const tl = gsap.timeline({
  //   onComplete: () => {
  //     setIntro(true);
  //   },
  // });

  // useGSAP(() => {
  //   tl.to(".show", {
  //     height: "100%",
  //     duration: 1,
  //     ease: "circ.inOut",
  //   })
  //     .to(".heading", {
  //       opacity: 1,
  //       y: -30,
  //       duration: 3,
  //     })

  //     .to(".show", {
  //       x: -10000,
  //       duration: 8,
  //       display: "none",
  //     });
  // }, []);
  return (
    <>
      {!intro && (
        <>
          <div className="line  show bg-white bg-primary/90  h-screen fixed inset-0  z-[10000] flex justify-center items-center overflow-hidden w-screen ">
            <div className="flex gap-2 sm:text-[3vw] font-medium heading opacity-100 block-head text-2xl  absolute top-[50%] left-[50%] -translate-x-[50%]  -translate-y-[50%] text-white dark:text-[#060C1B]">
              <img
                src="fatir-logo.png"
                className="opacity-1"
                alt=""
              />
            </div>
          </div>
        </>
      )}
      <AppRoutes />
    </>
  );
};

export default App;
