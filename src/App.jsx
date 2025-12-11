import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  const [showContent, setShowContent] = useState(false);

  // Intro animation
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "power4.inOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "expo.inOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg")?.remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  // Parallax mouse movement
  useGSAP(() => {
    if (!showContent) return;

    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 30;
      gsap.to(".parallax-bg", { x: xMove });
      gsap.to(".parallax-mid", { x: xMove * 0.5 });
      gsap.to(".parallax-front", { x: xMove * 0.8 });
    });
  }, [showContent]);

  // Scroll-based animation
  useEffect(() => {
    if (!showContent) return;

    const sections = document.querySelectorAll(".section");
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      sections.forEach((sec) => {
        if (sec.offsetTop < scrollPos) sec.classList.add("active");
        else sec.classList.remove("active");
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [showContent]);

  return (
    <>
      {/* Intro Loader */}
      <div className="svg fixed inset-0 z-[100] flex items-center justify-center bg-black">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="10vw"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image href="./bg.png" width="100%" height="100%" mask="url(#viMask)" />
        </svg>
      </div>

      {showContent && (
        <div className="main w-full overflow-x-hidden">
          {/* Navbar */}
<nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 md:p-12 bg-black/70 backdrop-blur-md">
  <h1 className="text-2xl md:text-4xl font-bold text-white hover:text-orange-500 transition-colors duration-300 cursor-pointer">Rockstar</h1>
  <ul className="flex gap-6 md:gap-10 text-white font-semibold">
    <li><a href="#hero" className="hover:text-orange-500 transition-colors duration-300">Home</a></li>
    <li><a href="#features" className="hover:text-orange-500 transition-colors duration-300">Features</a></li>
    <li><a href="#download" className="hover:text-orange-500 transition-colors duration-300">Download</a></li>
  </ul>
</nav>


          {/* Hero Section */}
          <section id="hero" className="section relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
            <img
              src="./sky.png"
              alt="sky"
              className="parallax-bg absolute w-full h-full object-cover scale-150 rotate-[-20deg]"
            />
            <img
              src="./bg.png"
              alt="bg"
              className="parallax-mid absolute w-full h-full object-cover scale-110 rotate-[-3deg]"
            />
            <img
              src="./girlbg.png"
              alt="character"
              className=" bggirl parallax-front absolute bottom-0 left-1/2 -translate-x-1/2 scale-125 rotate-[-15deg]"
            />

            <div className="text-center z-20 text-white scale-110 md:scale-100">
              <h1 className="text-6xl md:text-[10rem] font-bold leading-none">Grand</h1>
              <h1 className="text-6xl md:text-[10rem] font-bold leading-none">Theft</h1>
              <h1 className="text-6xl md:text-[10rem] font-bold leading-none">Auto</h1>
              <button className="mt-10 px-6 py-3 md:px-10 md:py-5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-transform transform hover:scale-105">
                Play Now
              </button>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="section min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 p-6 md:p-20 bg-gradient-to-b from-black to-gray-900 text-white">
            <div className="feature w-full md:w-1/3 p-6 bg-black/50 backdrop-blur-md rounded-xl hover:scale-105 transition-transform duration-500">
              <h2 className="text-3xl font-bold mb-4">Open World</h2>
              <p>Explore a vast, dynamic city with endless possibilities and missions.</p>
            </div>
            <div className="feature w-full md:w-1/3 p-6 bg-black/50 backdrop-blur-md rounded-xl hover:scale-105 transition-transform duration-500">
              <h2 className="text-3xl font-bold mb-4">Vehicles & Customization</h2>
              <p>Drive, fly, or ride anything. Customize your character and gear.</p>
            </div>
            <div className="feature w-full md:w-1/3 p-6 bg-black/50 backdrop-blur-md rounded-xl hover:scale-105 transition-transform duration-500">
              <h2 className="text-3xl font-bold mb-4">Multiplayer</h2>
              <p>Join your friends in online heists and challenges across the city.</p>
            </div>
          </section>

          {/* Download / CTA Section */}
          <section id="download" className="section relative h-screen flex flex-col items-center justify-center bg-black text-white">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">Ready to Play?</h2>
            <p className="text-lg md:text-2xl mb-8 text-center max-w-2xl">
              Join the adventure now and experience the ultimate open-world action.
            </p>
            <button className="px-8 md:px-16 py-4 md:py-6 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-transform transform hover:scale-105">
              Download Now
            </button>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
