export default function ResultsPanel({ results, status, steps, onShowSteps, onShowSensitivity,onShowGraph }) {
  if (!status) return null;

  const statusColor = {
    Optimal: "text-green-400 bg-green-400/10",
    Unbounded: "text-yellow-400 bg-yellow-400/10",
    Infeasible: "text-red-400 bg-red-400/10",
  };
  const is2D = results?.vars?.length === 2;
  const finalStep = steps?.[steps.length - 1];

  return (
    <div className="flex flex-col h-full">

      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Output
          </p>
          <h2 className="text-lg font-semibold text-cyan-300">
            Optimization Result
          </h2>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[status]}`}>
          {status}
        </span>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6" />

      {results && (
        <>
          {/* OBJECTIVE */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-1">
              Objective Value
            </p>
            <p className="text-4xl font-bold text-cyan-400">
              Z = {results.max_z.toFixed(2)}
            </p>
          </div>

          {/* VARIABLES */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {results.vars.map((v, i) => (
              <div
                key={i}
                className="bg-gray-800/70 p-4 rounded-xl border border-cyan-400/10"
              >
                <p className="text-gray-400 text-sm mb-1">x{i + 1}</p>
                <p className="text-white text-lg font-semibold">
                  {v.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* 🔥 FINAL TABLEAU */}
          {finalStep && (
            <div>
              <p className="text-sm text-gray-400 mb-2">
                Final Simplex Tableau
              </p>

              <div className="overflow-auto border border-cyan-400/10 rounded-lg">
                <table className="text-sm w-full border-collapse">

                  {/* 🔥 COLUMN HEADERS */}
                  {results?.col_names && (
                    <thead>
                      <tr className="bg-gray-800/60">
                        {results.col_names.map((name, idx) => (
                          <th
                            key={idx}
                            className="px-3 py-2 border border-gray-700 text-cyan-300 text-xs"
                          >
                            {name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}

                  <tbody>
                    {finalStep.tableau.map((row, i) => (
                      <tr key={i}>
                        {row.map((val, j) => (
                          <td
                            key={j}
                            className="px-3 py-2 border border-gray-700 text-center"
                          >
                            {val.toFixed(2)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
      <div className="mt-auto pt-6 flex justify-center gap-4">

        <button
          onClick={onShowSteps}
          className="bg-gradient-to-r from-cyan-400 to-emerald-400 
    text-black px-5 py-2 rounded-lg font-semibold hover:scale-105 transition shadow-lg"
        >
          Step-by-Step
        </button>

        <button
          onClick={onShowSensitivity}
          className="bg-gradient-to-r from-cyan-400 to-emerald-400 
    text-black px-5 py-2 rounded-lg font-semibold hover:scale-105 transition shadow-lg"
        >
          Sensitivity
        </button>

        {is2D && (
          <button
            onClick={onShowGraph}
             className="bg-gradient-to-r from-cyan-400 to-emerald-400 
    text-black px-5 py-2 rounded-lg font-semibold hover:scale-105 transition shadow-lg"
          >
            Graph
          </button>
        )}

      </div>
    </div>
  );
}