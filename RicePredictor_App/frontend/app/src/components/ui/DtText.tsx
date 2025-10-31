import React from "react";

interface DecisionTreeViewerProps {
  treeText: string;
}

const DtText: React.FC<DecisionTreeViewerProps> = ({
  treeText,
}) => {
  return (
    <div className="max-w-6xl mx-auto mt-6 space-y-6 bg-gray-200 dark:bg-[#0F1727] text-black dark:text-white rounded-2xl p-6 dark:border dark:border-gray-700 transition-colors duration-300">
      {/* Cây quyết định dạng text */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          Cây quyết định (mô tả dạng text)
        </h3>
        <pre className="bg-white text-black dark:bg-[#1E2939] dark:text-white border border-gray-400 dark:border-gray-600 text-sm p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
          {treeText}
        </pre>
      </div>
    </div>
  );
};

export default DtText;
