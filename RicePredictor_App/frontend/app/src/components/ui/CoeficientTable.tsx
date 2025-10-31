import React from "react";

interface CoefficientTableProps {
  coefficients: Record<string, number>;
  intercept: number;
}

const CoefficientTable: React.FC<CoefficientTableProps> = ({ coefficients, intercept }) => {
  return (
    <div className="max-w-6xl mx-auto mt-5 p-6 space-y-6 bg-gray-200 dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl">
      {/* Coefficients */}
      <div>
        <h3 className="font-semibold text-lg mb-2">
          Hệ số của thuộc tính (Coefficient)
        </h3>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-400 dark:border-gray-600 text-sm rounded bg-gray-500 dark:bg-gray-700 ">
            <thead className="bg-gray-300 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Tên thuộc tính</th>
                <th className="px-4 py-2 text-left">Hệ số</th>
              </tr>
            </thead>
            <tbody className="dark:bg-[#0F1727] bg-white">
              {Object.entries(coefficients).map(([feature, value]) => (
                <tr key={feature} className="border-t border-gray-400 dark:border-gray-600">
                  <td className="px-4 py-2">{feature}</td>
                  <td className="px-4 py-2">{value.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm">
        <strong>Hệ số chặn (intercept):</strong> {intercept}
      </div>
    </div>
  );
};

export default CoefficientTable;
