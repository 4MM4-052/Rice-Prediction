import { CircleIcon } from "lucide-react";
import React, { useState } from "react";

interface SupportVectorInfoProps {
  total: number;
  byClass: {
    Cammeo: number;
    Osmancik: number;
  };
  indices: number[];
}

const SupportVectorInfo: React.FC<SupportVectorInfoProps> = ({
  total,
  byClass,
  indices,
}) => {
  const [expanded, setExpanded] = useState(false);

  const displayedIndices = expanded ? indices : indices.slice(0, 50);

  const cammeoPercent = (byClass.Cammeo / total) * 100;
  const osmancikPercent = (byClass.Osmancik / total) * 100;

  return (
    <div className="max-w-6xl mx-auto mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 rounded-2xl bg-gray-200 dark:bg-[#0F1727] shadow dark:border dark:border-gray-600 space-y-4 transition-colors duration-300 text-black dark:text-[#ececf1]">
        <h3 className="text-xl font-semibold">Thông tin vector hỗ trợ</h3>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CircleIcon className="w-3 h-3 text-[#0ea5e9] dark:text-[#7DD3FC]" />
            <span>
              Tổng: <strong>{total}</strong> (
              {100}%)
            </span>
          </div>
          <div className="w-full bg-gray-400 dark:bg-gray-700 h-2 rounded">
            <div
              className="bg-[#0ea5e9] dark:bg-[#7DD3FC] h-2 rounded"
              style={{ width: `${100}%` }}
            />
          </div>

          <div className="flex items-center gap-2">
            <CircleIcon className="w-3 h-3 text-teal-400" />
            <span>
              Cammeo: <strong>{byClass.Cammeo}</strong> (
              {cammeoPercent.toFixed(1)}%)
            </span>
          </div>
          <div className="w-full bg-gray-400 dark:bg-gray-700 h-2 rounded">
            <div
              className="bg-teal-400 h-2 rounded"
              style={{ width: `${cammeoPercent}%` }}
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <CircleIcon className="w-3 h-3 text-rose-400" />
            <span>
              Osmancik: <strong>{byClass.Osmancik}</strong> (
              {osmancikPercent.toFixed(1)}%)
            </span>
          </div>
          <div className="w-full bg-gray-400 dark:bg-gray-700 h-2 rounded">
            <div
              className="bg-rose-400 h-2 rounded"
              style={{ width: `${osmancikPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gray-200 dark:bg-[#0F1727] shadow dark:border dark:border-gray-600 transition-colors duration-300 text-black dark:text-[#ececf1]">
        <h3 className="text-xl font-semibold mb-3">Chỉ số vector hỗ trợ</h3>
        <div className="bg-white dark:bg-gray-800 rounded-md p-3 border border-gray-400 dark:border-gray-600 text-sm leading-relaxed max-h-40 overflow-y-auto">
          {displayedIndices.join(", ")}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm underline text-teal-500 hover:text-teal-800 dark:text-teal-200 dark:hover:text-teal-100"
        >
          {expanded ? "Ẩn bớt" : `Hiển thị tất cả (${indices.length})`}
        </button>
      </div>
    </div>
  );
};

export default SupportVectorInfo;
