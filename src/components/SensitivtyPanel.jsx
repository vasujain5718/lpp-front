export default function SensitivityPanel({ data }) {
  if (!data || !data.results) return null;

  const {
    vars = [],
    reduced_costs = [],
    shadow_prices = [],
    rhs_ranges = [],
    objective_ranges = [],
  } = data.results;

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto">

      {/* HEADER */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Analysis
        </p>
       
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

      {/* VARIABLES */}
      {vars.length > 0 && (
        <div>
          <p className="text-sm text-gray-400 mb-2">Variable Analysis</p>

          <div className="overflow-auto border border-cyan-400/10 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-800/60 text-cyan-300">
                <tr>
                  <th className="p-2">Var</th>
                  <th className="p-2">Value</th>
                  <th className="p-2">Reduced Cost</th>
                  <th className="p-2">Type</th>
                </tr>
              </thead>

              <tbody>
                {vars.map((v, i) => (
                  <tr key={i} className="text-center border-t border-gray-700">
                    <td className="p-2">x{i + 1}</td>
                    <td className="p-2">{v.toFixed(2)}</td>
                    <td className="p-2">
                      {reduced_costs[i]?.toFixed(2) ?? "—"}
                    </td>
                    <td className="p-2">
                      {Math.abs(v) > 1e-6 ? (
                        <span className="text-green-400">Basic</span>
                      ) : (
                        <span className="text-gray-400">Non-basic</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* OBJECTIVE */}
      {objective_ranges.length > 0 && (
        <div>
          <p className="text-sm text-gray-400 mb-2">
            Objective Sensitivity
          </p>

          <div className="overflow-auto border border-cyan-400/10 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-800/60 text-cyan-300">
                <tr>
                  <th className="p-2">Var</th>
                  <th className="p-2">Increase</th>
                  <th className="p-2">Decrease</th>
                </tr>
              </thead>

              <tbody>
                {objective_ranges.map((r, i) => (
                  <tr key={i} className="text-center border-t border-gray-700">
                    <td className="p-2">x{i + 1}</td>
                    <td className="p-2">
                      {r?.allowable_increase?.toFixed(2) ?? "—"}
                    </td>
                    <td className="p-2">
                      {r?.allowable_decrease?.toFixed(2) ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RHS */}
      {rhs_ranges.length > 0 && (
        <div>
          <p className="text-sm text-gray-400 mb-2">
            RHS Sensitivity
          </p>

          <div className="overflow-auto border border-cyan-400/10 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-800/60 text-cyan-300">
                <tr>
                  <th className="p-2">Constraint</th>
                  <th className="p-2">Shadow Price</th>
                  <th className="p-2">Increase</th>
                  <th className="p-2">Decrease</th>
                </tr>
              </thead>

              <tbody>
                {rhs_ranges.map((r, i) => (
                  <tr key={i} className="text-center border-t border-gray-700">
                    <td className="p-2">C{i + 1}</td>
                    <td className="p-2">
                      {shadow_prices[i]?.toFixed(2) ?? "—"}
                    </td>
                    <td className="p-2">
                      {r?.allowable_increase?.toFixed(2) ?? "—"}
                    </td>
                    <td className="p-2">
                      {r?.allowable_decrease?.toFixed(2) ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}