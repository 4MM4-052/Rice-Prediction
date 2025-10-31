import React from "react";

interface ModelParam {
  key: string;
  value: string | number;
}

interface ModelInfoProps {
  modelName: string;
  parameters: ModelParam[];
}

const ModelInfo: React.FC<ModelInfoProps> = ({ modelName, parameters }) => {
  return (
    <div className="max-w-6xl mx-auto mt-5 p-6 space-y-6 bg-gray-200 dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl">
      <h3 className="text-lg font-semibold mb-2">Thông tin mô hình</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-400 border-gray-200 dark:border-gray-600"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-bold">Tên mô hình</p>
            <p className="font-semibold text-[#0ea5e9] dark:text-[#7dd3fc]">{modelName}</p>
          </div>
        {parameters.map((param, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-400 shadow-sm border-gray-200 dark:border-gray-600"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-bold">{param.key}</p>
            <p className="font-semibold text-[#0ea5e9] dark:text-[#7dd3fc]">{param.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelInfo;
