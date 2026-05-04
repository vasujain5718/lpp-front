import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function GraphPanel({ data }) {
    if (!data?.results || !data?.input) return null;

    const { A, b } = data.input;

    // =========================
    // 🔥 1. Generate constraint lines
    // =========================
    const generateLines = () => {
        const lines = [];

        for (let i = 0; i < A.length; i++) {
            const a1 = Number(A[i][0]);
            const a2 = Number(A[i][1]);
            const rhs = Number(b[i]);

            const points = [];
            const maxBound = 20;

            if (a2 === 0) {
                const x = rhs / a1;
                if (x >= 0 && x <= maxBound) {
                    points.push({ x, y: 0, constraint: `Constraint ${i + 1}` });
                    points.push({ x, y: maxBound, constraint: `Constraint ${i + 1}` });
                }
            } else {
                const xIntercept = a1 !== 0 ? rhs / a1 : maxBound;

                for (let x = 0; x <= maxBound; x += 0.05) {
                    const y = (rhs - a1 * x) / a2;
                    if (y >= 0) points.push({ x, y, constraint: `Constraint ${i + 1}` });
                }

                if (xIntercept >= 0 && xIntercept <= maxBound) {
                    points.push({ x: xIntercept, y: 0, constraint: `Constraint ${i + 1}` });
                }
            }

            points.sort((p1, p2) => p1.x - p2.x);
            const uniquePoints = points.filter(
                (v, idx, arr) => idx === 0 || v.x !== arr[idx - 1].x
            );

            lines.push(uniquePoints);
        }

        return lines;
    };

    const lines = generateLines();

    const optimal = {
        x: Number(data.results.vars[0]),
        y: Number(data.results.vars[1]),
        constraint: "Optimal",
    };

    // =========================
    // 🔥 2. Intersection & Feasibility
    // =========================
    const intersect = (a1, b1, c1, a2, b2, c2) => {
        a1 = Number(a1); b1 = Number(b1); c1 = Number(c1);
        a2 = Number(a2); b2 = Number(b2); c2 = Number(c2);

        const det = a1 * b2 - a2 * b1;
        if (Math.abs(det) < 1e-6) return null;

        return {
            x: (c1 * b2 - c2 * b1) / det,
            y: (a1 * c2 - a2 * c1) / det,
        };
    };

    const isFeasible = (x, y) => {
        if (x < -1e-6 || y < -1e-6) return false;

        for (let i = 0; i < A.length; i++) {
            const a1 = Number(A[i][0]);
            const a2 = Number(A[i][1]);
            const rhs = Number(b[i]);

            if (a1 * x + a2 * y > rhs + 1e-6) return false;
        }

        return true;
    };

    let region = [];

    for (let i = 0; i < A.length; i++) {
        for (let j = i + 1; j < A.length; j++) {
            const p = intersect(
                A[i][0], A[i][1], b[i],
                A[j][0], A[j][1], b[j]
            );
            if (p && isFeasible(p.x, p.y)) region.push(p);
        }
    }

    for (let i = 0; i < A.length; i++) {
        const a1 = Number(A[i][0]);
        const a2 = Number(A[i][1]);
        const rhs = Number(b[i]);

        if (a1 !== 0) {
            const x = rhs / a1;
            if (isFeasible(x, 0)) region.push({ x, y: 0 });
        }
        if (a2 !== 0) {
            const y = rhs / a2;
            if (isFeasible(0, y)) region.push({ x: 0, y });
        }
    }

    if (isFeasible(0, 0)) region.push({ x: 0, y: 0 });

    const seen = new Set();
    region = region.filter((p) => {
        const key = `${p.x.toFixed(4)}-${p.y.toFixed(4)}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    const center = {
        x: region.reduce((s, p) => s + p.x, 0) / Math.max(1, region.length),
        y: region.reduce((s, p) => s + p.y, 0) / Math.max(1, region.length),
    };

    region.sort(
        (a, b) =>
            Math.atan2(a.y - center.y, a.x - center.x) -
            Math.atan2(b.y - center.y, b.x - center.x)
    );

    // =========================
    // 🔥 3. THE FIX: Render Polygon via Scatter Shape
    // =========================
    const renderShadedPolygon = (props) => {
        // Recharts inherently passes accurate, updated scales to Scatter shapes
        const { xAxis, yAxis } = props;

        if (!xAxis || !yAxis || !region || region.length < 3) return null;

        try {
            const pointsStr = region
                .map((p) => `${xAxis.scale(p.x)},${yAxis.scale(p.y)}`)
                .join(" ");

            return (
                <polygon
                    points={pointsStr}
                    fill="#22d3ee"
                    fillOpacity={0.4} 
                    stroke="#22d3ee"
                    strokeWidth={1}
                    pointerEvents="none" 
                />
            );
        } catch (error) {
            console.error("Scale mapping failed:", error);
            return null;
        }
    };

    // =========================
    // 🎯 RENDER
    // =========================
    return (
        <div className="w-full h-[400px]">
            {/* Added explicit 100% dimensions to force the container to size correctly */}
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />

                    <XAxis
                        type="number"
                        dataKey="x"
                        stroke="#67e8f9"
                        label={{
                            value: "x1",
                            position: "insideBottom",
                            fill: "#67e8f9",
                            offset: -5,
                        }}
                    />

                    <YAxis
                        type="number"
                        dataKey="y"
                        stroke="#67e8f9"
                        label={{
                            value: "x2",
                            angle: -90,
                            position: "insideLeft",
                            fill: "#67e8f9",
                        }}
                    />

                    <Tooltip
                        cursor={{ strokeDasharray: "3 3", stroke: "#4b5563" }}
                        content={({ active, payload }) => {
                            if (!active || !payload || !payload.length) return null;
                            const point = payload[0].payload;
                            return (
                                <div className="bg-[#0f172a] border border-cyan-400/20 p-2 rounded text-sm z-50 relative">
                                    <p className="text-cyan-300 font-bold">
                                        {point.constraint || "Point"}
                                    </p>
                                    <p className="text-cyan-300">x: {point.x.toFixed(2)}</p>
                                    <p className="text-cyan-300">y: {point.y.toFixed(2)}</p>
                                </div>
                            );
                        }}
                    />

                    {/* 🔥 HACK: Pass the polygon inside a dummy Scatter point anchored to the center */}
                    {region.length >= 3 && (
                        <Scatter
                            data={[{ x: center.x, y: center.y }]}
                            shape={renderShadedPolygon}
                            isAnimationActive={false}
                        />
                    )}

                    {/* CONSTRAINT LINES */}
                    {lines.map((line, i) => (
                        <Scatter
                            key={i}
                            data={line}
                            fill="#22d3ee"
                            line={{ stroke: "#22d3ee", strokeWidth: 2 }}
                            shape="circle"
                            opacity={0.6}
                            isAnimationActive={false}
                        />
                    ))}

                    {/* OPTIMAL POINT */}
                    <Scatter
                        data={[optimal]}
                        fill="#34d399"
                        shape="circle"
                        isAnimationActive={false}
                    />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}