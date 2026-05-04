
import GradientText from "./GradientText";
import ShinyText from "./ShinyText";
import BorderGlow from "./BorderGlow";
import { useState } from "react";
import FloatingLines from "./FloatingLines";
import LetterGlitch from "./LetterGlitch";
export default function Hero() {
  const [startGlow, setStartGlow] = useState(false);
const [hoverGlow, setHoverGlow] = useState(false);

  const handleClick = () => {
    // reset first
    setStartGlow(false);

    // trigger again next frame
    requestAnimationFrame(() => {
      setStartGlow(true);
    });

    setTimeout(() => {
      document
        .getElementById("solver")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 1250);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-10" >
        <LetterGlitch
          glitchSpeed={80}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
          characters={"1234567890[]{}!@#$%^&*()_+-=|;:'\",.<>/?\\ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center">

        <h1 className="text-5xl font-bold text-white mb-4">
          <GradientText
            colors={["#00FFC6", "#00E5FF", "#7DF9FF"]}
            animationSpeed={8}
            showBorder={false}
            className="custom-class"
          >
            LPP SOLVER
          </GradientText>
        </h1>

        <p className="text-gray-300 mb-6">
          <ShinyText
            text="Solve Linear Programming Problems visually"
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
        </p>

        <BorderGlow

          animated={startGlow || hoverGlow}  // 👈 CHANGED
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="#120F17"
          borderRadius={28}
          glowRadius={40}
          glowIntensity={1}
          coneSpread={25}
          colors={['#c084fc', '#f472b6', '#38bdf8']}
        >
          <button
            onClick={handleClick}
            className="bg-grey-500 px-6 py-3 rounded-lg"
          >
            Get Started
          </button>
        </BorderGlow>

      </div>
      <div className="absolute bottom-0 left-0 w-full h-40 
bg-gradient-to-b from-transparent via-black/40 to-black" />
    </div>
  );
}