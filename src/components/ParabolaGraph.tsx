import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface ParabolaGraphProps {
  a: number;
  b: number;
  c: number;
  roots: number[];
}

const ParabolaGraph: React.FC<ParabolaGraphProps> = ({ a, b, c, roots }) => {
  const generateData = () => {
    const data = [];
    const vertexX = a !== 0 ? -b / (2 * a) : 0;
    const start = vertexX - 5;
    const end = vertexX + 5;
    
    for (let x = start; x <= end; x += 0.2) {
      const y = a * x * x + b * x + c;
      data.push({
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
      });
    }
    return data;
  };

  const data = generateData();

  return (
    <div className="w-full h-[300px] md:h-[400px] bg-white rounded-xl shadow-inner p-4">
      <h3 className="text-center text-gray-600 mb-4 font-medium">Đồ thị hàm số y = {a}x² + {b}x + {c}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="x" 
            type="number" 
            domain={['auto', 'auto']} 
            stroke="#94a3b8"
          />
          <YAxis 
            type="number" 
            domain={['auto', 'auto']} 
            stroke="#94a3b8"
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            formatter={(value: any) => [value, 'y']}
            labelFormatter={(label) => `x: ${label}`}
          />
          <ReferenceLine y={0} stroke="#475569" strokeWidth={2} />
          <ReferenceLine x={0} stroke="#475569" strokeWidth={2} />
          {roots.map((root, idx) => (
            <ReferenceLine key={idx} x={root} stroke="#ef4444" strokeDasharray="3 3" label={`x${idx+1}`} />
          ))}
          <Line 
            type="monotone" 
            dataKey="y" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            dot={false}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParabolaGraph;
