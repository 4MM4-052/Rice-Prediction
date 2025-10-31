import React from "react";

interface ModelInputInfoProps {
  certainty_score: number;
  distance_to_boundary: number;
}

const CertaintyScore: React.FC<ModelInputInfoProps> = ({
  certainty_score,
  distance_to_boundary,
}) => {
  const isPositive = distance_to_boundary >= 0;
  const directionLabel = isPositive ? "-> Osmancik" : "-> Cammeo";
  const directionColor = isPositive ? "text-teal-400" : "text-rose-400";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-0 gap-x-0 md:gap-x-6 max-w-6xl mx-auto mt-5">
      <div className="h-full bg-gray-200 dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-2">Khoảng cách đến biên quyết định</h3>
        <div className="flex items-center space-x-4">
          <span className="text-[#0ea5e9] dark:text-[#7dd3fc] font-semibold min-w-[60px] text-3xl">
            {certainty_score.toFixed(4)}
          </span>
        </div>
        <p className="mt-3 text-sm italic text-gray-800 dark:text-gray-400">
          Thể hiện độ chắc chắn của mô hình dựa trên khoảng cách đến biên quyết
          định.
        </p>
      </div>

      <div className="h-full bg-gray-200 dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-2">Dự đoán của mô hình</h3>
        <div className="flex items-center space-x-4">
          <span
            className={` text-3xl font-semibold ${directionColor}`}
            title={isPositive ? "Phía lớp Osmancik" : "Phía lớp Cammeo"}
          >
            {distance_to_boundary.toFixed(4)}
          </span>
           <span className={`italic text-xl ${directionColor}`}>
              {directionLabel}
            </span>
        </div>
        <p className="mt-3 text-sm italic text-gray-800 dark:text-gray-400">
            Khoảng cách đến siêu phẳng quyết định. Dương → lớp Osmancik, Âm → lớp Cammeo.
          </p>
      </div>

    </div>
  );
};

export default CertaintyScore;
