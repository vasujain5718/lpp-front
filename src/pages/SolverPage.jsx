import SolverForm from "../components/SolverForm";
import ResultsPanel from "../components/ResultsPanel";
import StepsViewer from "../components/StepsViewer";
import SensitivityPanel from "../components/SensitivtyPanel";
import GraphPanel from "../components/GraphPanel";   // 👈 NEW
import { useState, useRef, useEffect } from "react";

export default function SolverPage() {
  const [showSensitivity, setShowSensitivity] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const handleSolve = (res) => {
    setLoading(true);
    setTimeout(() => {
      setData(res);
      setLoading(false);
    }, 80);
  };

  return (
    <div className="w-full">

      {/* 🔥 MAIN SECTION */}
      <section
        id="solver"
        className="h-screen flex items-center justify-center 
        bg-gradient-to-b from-transparent via-black/20 to-transparent"
      >

        {/* subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-[700px] h-[700px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* 🔥 GRID LAYOUT */}
        <div className="relative z-10 w-full max-w-[1400px] px-6 h-[85vh] 
grid grid-cols-2 gap-8">

          {/* 🟢 LEFT: INPUT */}
          <div className="h-full rounded-2xl border border-cyan-400/10 
          bg-gray-900/50 backdrop-blur-sm shadow-2xl flex flex-col overflow-hidden">

            <SolverForm onSolve={handleSolve} />

          </div>

          {/* 🟣 RIGHT: RESULTS (ALWAYS PRESENT) */}
          <div className="h-full rounded-2xl border border-cyan-400/10 
          bg-gray-900/40 backdrop-blur-sm shadow-2xl p-6 flex flex-col justify-center">

            {/* EMPTY STATE */}
            {!data && !loading && (
              <div className="text-center text-gray-500">
                <p className="text-sm">Results will appear here</p>
                <p className="text-xs mt-1">Run optimization to view output</p>
              </div>
            )}

            {/* LOADING */}
            {loading && (
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-cyan-300 text-sm">Solving...</p>
              </div>
            )}

            {/* RESULTS */}
            {data && !loading && (
              <div className="transition-all duration-700 opacity-100 translate-y-0">

                <ResultsPanel
                  results={data.results}
                  status={data.status}
                  steps={data.steps}
                  onShowSteps={() => setShowSteps(true)}
                  onShowSensitivity={() => setShowSensitivity(true)}
                  onShowGraph={() => setShowGraph(true)}   // 👈 NEW
                />

              </div>
            )}

          </div>

        </div>
      </section>

      {/* 🔥 STEPS DRAWER (UNCHANGED) */}
      {showSteps && (
        <div className="fixed inset-0 z-50 flex">

          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSteps(false)}
          />

          <div className="relative ml-auto w-[500px] h-full bg-gray-900 p-4 overflow-y-auto shadow-2xl animate-slideIn">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-cyan-300">Steps</h2>
              <button onClick={() => setShowSteps(false)}>✕</button>
            </div>

            <StepsViewer
              steps={data?.steps || []}
              colNames={data?.results?.col_names}
            />
          </div>
        </div>
      )}

      {showSensitivity && (
        <div className="fixed inset-0 z-50 flex">

          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSensitivity(false)}
          />

          {/* panel */}
          <div className="relative ml-auto w-[500px] h-full 
    bg-gray-900 p-4 overflow-y-auto shadow-2xl animate-slideIn">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-cyan-300">
                Sensitivity Analysis
              </h2>
              <button onClick={() => setShowSensitivity(false)}>✕</button>
            </div>

            <SensitivityPanel data={data} />
          </div>
        </div>
      )}
      {showGraph && (
  <div className="fixed inset-0 z-50 flex">

    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setShowGraph(false)}
    />

    <div className="relative m-auto w-[700px] h-[500px] 
    bg-gray-900 p-6 rounded-xl shadow-2xl border border-cyan-400/10">

      <div className="flex justify-between mb-4">
        <h2 className="text-cyan-300 font-semibold">
          Feasible Region
        </h2>
        <button onClick={() => setShowGraph(false)}>✕</button>
      </div>

      <GraphPanel data={data} />

    </div>
  </div>
)}
    </div>
  );
}