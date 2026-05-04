import Hero from "./components/Hero";
import SolverPage from "./pages/SolverPage";

export default function App() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* 🌑 BASE BACKGROUND (slightly off-black) */}
      <div className="fixed inset-0 bg-[#05070a] z-0" />

      {/* ✨ VERY SUBTLE RADIAL GLOW */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      {/* 🧩 MICRO GRID TEXTURE (almost invisible) */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none 
        bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] 
        bg-[size:40px_40px]" 
      />

      {/* 🌐 CONTENT */}
      <div className="relative z-10">
        <Hero />
        <SolverPage />
      </div>

    </div>
  );
}