import React from "react";

interface NeighborCardProps {
  index: number;
  label: string;
  distance: number;
  prediction: string;
  highlight: boolean;
}

const NeighborCard: React.FC<NeighborCardProps> = ({
  index,
  label,
  distance,
  prediction,
  highlight
}) => {
  const isMatch = label === prediction;
  return (
    <div
      className={`p-4 rounded-xl shadow-md w-full space-y-1 border dark:border-gray-600 bg-white dark:bg-gray-800
        ${
          highlight && isMatch
            ? "border-teal-400 dark:border-teal-200"
            : highlight
            ? "border-rose-400 dark:border-rose-300"
            : ""
        }
        text-black dark:text-white transition-all duration-300`}
    >
      <div className="text-sm text-gray-800 dark:text-gray-400">
        Láng giềng #{index + 1}
      </div>
      <div className="text-md font-semibold">{label}</div>
      <div className="text-sm text-gray-600 dark:text-gray-500">
        Khoảng cách: {distance.toFixed(4)}
      </div>
    </div>
  );
};

export default NeighborCard;
