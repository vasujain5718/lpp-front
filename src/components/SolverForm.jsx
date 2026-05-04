import { useState } from "react";
import { solveLPP } from "../services/api";
import ShinyText from "./ShinyText";
export default function SolverForm({ onSolve }) {
  const [vars, setVars] = useState(2);
  const [cons, setCons] = useState(2);

  const [A, setA] = useState([]);
  const [b, setB] = useState([]);
  const [c, setC] = useState([]);
  const [types, setTypes] = useState([]);

  const generateGrid = () => {
    setA(Array.from({ length: cons }, () => Array(vars).fill(0)));
    setB(Array(cons).fill(0));
    setC(Array(vars).fill(0));
    setTypes(Array(cons).fill("<="));
  };

  const handleSolve = async () => {
    const parsedA = A.map(row => row.map(val => Number(val)));
    const parsedB = b.map(val => Number(val));
    const parsedC = c.map(val => Number(val));

    const res = await solveLPP({
      c: parsedC,
      A: parsedA,
      b: parsedB,
      constraint_types: types,
    });

    console.log("API Response:", res);
    onSolve(res);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 text-xs text-gray-400">

  
</div>
      {/* HEADER */}
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold text-cyan-300">
          <ShinyText
            text="Linear Programming Solver"
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
          
        </h2>
        <p className="text-sm text-gray-400">
          Define variables, constraints and optimize your objective
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* VAR + CONS */}
        <div className="flex gap-4">
          <input
            type="number"
            value={vars}
            min={1}
            onChange={(e) => setVars(Number(e.target.value))}
            className="bg-gray-800 p-3 rounded-lg w-full focus:ring-2 focus:ring-cyan-400 outline-none"
            placeholder="Variables"
          />
          <input
            type="number"
            value={cons}
            min={1}
            onChange={(e) => setCons(Number(e.target.value))}
            className="bg-gray-800 p-3 rounded-lg w-full focus:ring-2 focus:ring-cyan-400 outline-none"
            placeholder="Constraints"
          />
        </div>

        <button
          onClick={generateGrid}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-lg font-semibold transition"
        >
          Generate Grid
        </button>

        {/* GRID AREA (FIXED SPACE) */}
        <div className="min-h-[280px] transition-all duration-500">

          {A.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              Grid will appear here
            </div>
          ) : (
            <div className="space-y-3">

              {A.map((row, i) => (
                <div key={i} className="flex gap-2 items-center">

                  {row.map((val, j) => (
                    <input
                      key={j}
                      type="number"
                      value={A[i][j]}
                      onChange={(e) => {
                        const newA = A.map((r) => [...r]);
                        newA[i][j] = e.target.value;
                        setA(newA);
                      }}
                      className="w-16 p-2 bg-gray-700 rounded"
                    />
                  ))}

                  <select
                    value={types[i]}
                    onChange={(e) => {
                      const newT = [...types];
                      newT[i] = e.target.value;
                      setTypes(newT);
                    }}
                    className="bg-gray-800 p-2 rounded"
                  >
                    <option value="<=">{"<="}</option>
                    <option value=">=">{">="}</option>
                    <option value="=">{"="}</option>
                  </select>

                  <input
                    type="number"
                    value={b[i]}
                    onChange={(e) => {
                      const newB = [...b];
                      newB[i] = e.target.value;
                      setB(newB);
                    }}
                    className="w-20 p-2 bg-gray-700 rounded"
                  />
                </div>
              ))}

              {/* OBJECTIVE */}
              <div>
                <p className="text-cyan-300 mb-2">Maximize Z</p>
                <div className="flex gap-2">
                  {c.map((val, j) => (
                    <input
                      key={j}
                      type="number"
                      value={c[j]}
                      onChange={(e) => {
                        const newC = [...c];
                        newC[j] = e.target.value;
                        setC(newC);
                      }}
                      className="w-16 p-2 bg-gray-700 rounded"
                    />
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-6 border-t border-gray-800">
        <button
          onClick={handleSolve}
          disabled={A.length === 0}
          className="w-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-black py-3 rounded-lg font-semibold hover:scale-105 transition disabled:opacity-50"
        >
          Solve Optimization
        </button>
      </div>

    </div>
  );
}