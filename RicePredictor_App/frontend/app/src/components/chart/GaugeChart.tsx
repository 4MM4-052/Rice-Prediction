import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface GaugeChartProps {
  value: number;
  label: string;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ 
  value, label
 }) => {
  const arcPercent = 0.7;
  const totalAngle = 360 * arcPercent; // 288°
  const centerAngle = 90; // Hướng lên
  const startAngle = centerAngle + totalAngle / 2; // 234°
  const endAngle = centerAngle - totalAngle / 2; // -54°
  const valueAngle = totalAngle * (value / 100);

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-[200px] h-[140px]">
        <PieChart width={200} height={200}>
          <Pie
            data={[{ value: 100 }]}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            stroke="none"
            isAnimationActive={false}
            cornerRadius={5}
          >
            <Cell fill="#364153" />
          </Pie>

          <Pie
            data={[{ value }]}
            startAngle={startAngle}
            endAngle={startAngle - valueAngle}
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            stroke="none"
            isAnimationActive={true}
            animationDuration={800}
            cornerRadius={5}
          >
            <Cell fill="#7dd3fc" />
          </Pie>

          <text
            x={100}
            y={95}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={18}
            fill="#7dd3fc"
            fontWeight="bold"
          >
            {value.toFixed(2)}%
          </text>
        </PieChart>

        <p className="absolute top-[110px] left-1/2 -translate-x-1/2 text-sm text-black dark:text-white">
          {label}
        </p>
      </div>
    </div>
  );
};

export default GaugeChart;
