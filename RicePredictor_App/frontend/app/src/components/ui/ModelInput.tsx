import React from "react";

interface ModelInputInfoProps {
  inputs: Record<string, number>; 
}

const ModelInputInfo: React.FC<ModelInputInfoProps> = ({ inputs }) => {
  const entries = Object.entries(inputs);

  return (
    <div className="max-w-6xl mx-auto mt-5 p-6 bg-gray-200 dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl">
      <h3 className="text-xl font-semibold mb-4">Đầu vào của mô hình</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {entries.map(([key, value], index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-600 rounded-xl p-4 shadow-sm"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-bold">{key}</div>
            <div className="text-md font-semibold text-[#0ea5e9] dark:text-[#7dd3fc]">
              {value.toFixed(4)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelInputInfo;
