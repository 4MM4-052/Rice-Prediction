import React from "react";
import featureImage from "../../assets/rice1.png";

interface Feature {
  name: string;
  description: string;
  range: string;
  unit?: string;
}

const features: Feature[] = [
  {
    name: "Area",
    description: "Diện tích của hạt gạo",
    range: "7500 – 19000 px",   
  },
  {
    name: "Perimeter",
    description: "Chu vi của hạt",
    range: "300 – 600 px",
  },
  {
    name: "Major axis length",
    description: "Độ dài trục lớn nhất",
    range: "140 – 250 px",
  },
  {
    name: "Minor axis length",
    description: "Độ dài trục nhỏ nhất",
    range: "50 – 110 px",
  },
  {
    name: "Convex_Area",
    description: "Diện tích vùng lồi (vùng bao ngoài)",
    range: "7700 – 19000 px",
  },
  {
    name: "Eccentricity",
    description: "Độ lệch tâm (giá trị từ 0 đến 1, càng gần 1 thì hình dạng càng thuôn dài)",
    range: "0.70 – 1",
  },
  {
    name: "Extent",
    description: "Tỷ lệ diện tích hạt gạo trên diện tích hình chữ nhật bao quanh",
    range: "0.50 – 0.90",
  },
];

const FeatureDetail: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto mt-5 p-6 space-y-6 bg-gray-200 dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl">
      <h2 className="text-2xl font-bold text-center">
        Chi tiết các thuộc tính
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
<div className="flex flex-col items-center py-8 px-4 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md">
  <img
    src={featureImage}
    alt="Cấu trúc hạt gạo Osmancik và Cammeo"
    className="w-[1600px] min-h-[500px] h-auto rounded-lg shadow-lg transition-transform duration-300 scale-110 hover:scale-115"
  />
</div>
        <div className="md:col-span-1 space-y-4">
          <div className="overflow-x-auto rounded-sm overflow-hidden border border-gray-300 dark:border-gray-600">
            <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600 text-xs sm:text-sm md:text-base">
              <thead className="bg-gray-300 dark:bg-gray-700 text-left">
                <tr>
                  <th className="border dark:border-gray-600 px-4 py-2">
                    Tên thuộc tính
                  </th>
                  <th className="border dark:border-gray-600 px-4 py-2">
                    Mô tả
                  </th>
                  <th className="border dark:border-gray-600 px-4 py-2">
                    Khoảng giá trị
                  </th>
              
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#0F1727]">
                {features.map((f) => (
                  <tr
                    key={f.name}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <td className="border dark:border-gray-600 px-4 py-2 font-medium text-sm sm:text-base md:text-lg">
                      {f.name}
                    </td>
                    <td className="border dark:border-gray-600 px-4 py-2 text-sm sm:text-base md:text-lg">
                      {f.description}
                    </td>
                    <td className="border dark:border-gray-600 px-4 py-2 text-sm sm:text-base md:text-lg">
                      {f.range}
                    </td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default FeatureDetail;
