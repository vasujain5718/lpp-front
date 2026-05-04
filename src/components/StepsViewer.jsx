import { motion } from "framer-motion";
export default function StepsViewer({ steps, colNames }) {
  return (
    <div className="p-2">

      <h2 className="text-lg font-semibold mb-4 text-cyan-300">
        Step-by-Step Solution
      </h2>

      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
          className="mb-6 bg-gray-900/70 p-4 rounded-xl border border-cyan-400/10"
        >

          {/* Header */}
          <div className="flex justify-between mb-2">
            <p className="text-cyan-400 font-semibold">
              Step {idx + 1}
            </p>
            <p className="text-gray-400 text-sm">{step.phase}</p>
          </div>

          {/* Pivot */}
          {step.pivot_col !== null && (
            <div className="text-sm mb-2 flex gap-4">
              <p className="text-green-400">
                Entering: {step.entering}
              </p>
              <p className="text-red-400">
                Leaving: {step.leaving}
              </p>
            </div>
          )}

          {/* Table */}
          <div className="overflow-auto">
            <table className="text-sm w-full border-collapse">

              {/* 🔥 COLUMN HEADERS */}
              {colNames && (
                <thead>
                  <tr className="bg-gray-800/60">
                    {/* Add Basis Header */}
                    <th className="px-3 py-2 border border-gray-700 text-cyan-500 text-xs font-bold bg-gray-900">
                      Basis
                    </th>
                    {colNames.map((name, idx) => (
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
                {step.tableau.map((row, i) => (
                  <tr key={i}>
                    {/* Add Basis Cell for this row */}
                    <td className="px-3 py-2 border border-gray-700 font-bold text-cyan-500 bg-gray-800/50 text-center">
                      {step.basis ? step.basis[i] : ""}
                    </td>

                    {/* Existing cells */}
                    {row.map((val, j) => (
                      <td
                        key={j}
                        className={`px-3 py-2 border border-gray-700 text-center
                          ${i === step.pivot_row && j === step.pivot_col
                            ? "bg-yellow-400/50 text-black font-bold"
                            : ""
                          }
                          ${i === step.pivot_row ? "bg-red-900/100" : ""}
                          ${j === step.pivot_col ? "bg-green-900/100" : ""}
                        `}
                      >
                        {val.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </motion.div>
      ))}
    </div>
  );
}