import React from "react";

interface FTProps {
  feature_importances: Record<string, number>;
}

const FeatureImportances: React.FC<FTProps> = ({ feature_importances }) => {
  return (
    <div className="max-w-6xl mx-auto mt-6 space-y-6 bg-gray-200 dark:bg-[#0F1727] text-black dark:text-white rounded-2xl p-6 dark:border dark:border-gray-700 transition-colors duration-300">
      <div>
        <div>
          <h3 className="font-semibold text-lg mb-2">
            Mức độ quan trọng của các thuộc tính
          </h3>
          <div className="space-y-3">
            {Object.entries(feature_importances)
              .sort(([, a], [, b]) => b - a) 
              .map(([feature, value]) => (
                <div key={feature}>
                  <div className="flex justify-between mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span>{feature}</span>
                    <span>{(value * 100).toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-gray-400 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className="h-4 rounded-full bg-[#7dd3fc] transition-all duration-500"
                      style={{ width: `${value * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureImportances;
