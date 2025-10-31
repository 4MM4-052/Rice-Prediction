import React from "react";
import GaugeChart from "../chart/GaugeChart";

interface ClassProbability {
  label: string;
  percentage: number;
}

interface ConfidenceScoreProps {
  confidenceScore: number;
  classProbabilities: ClassProbability[];
}

const ConfidenceScore: React.FC<ConfidenceScoreProps> = ({
  confidenceScore,
  classProbabilities,
}) => {
  // const [animatedScore, setAnimatedScore] = useState(0);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setAnimatedScore(confidenceScore);
  //   }, 100); // Delay nhẹ để kích hoạt animation

  //   return () => clearTimeout(timeout);
  // }, [confidenceScore]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-0 gap-x-0 md:gap-x-6 max-w-6xl mx-auto mt-5">
      {/* LEFT - Confidence Score */}
      <div className="h-full bg-gray-200 dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl p-6">
        <h3 className="text-lg font-semibold">Xác xuất mô hình</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-5 items-center">
  <div className="flex justify-center">
    <GaugeChart value={confidenceScore} label={"Xác suất"} />
  </div>

  <p className="text-sm italic text-gray-800 dark:text-gray-400">
    Giá trị thể hiện độ tin cậy tổng thể của mô hình dựa trên phân bố xác suất các lớp.
    Đây là kết quả xác suất của lớp có xác suất cao nhất.
  </p>
</div>

        {/* <div className="flex items-center">
          <span className="text-[#0ea5e9]  dark:text-[#7dd3fc] text-xl font-bold min-w-[60px] text-right">
            {confidenceScore.toFixed(2)}%
          </span>

          <div className="flex-1 bg-[#364153] rounded h-6">
            <div
              className="bg-[#7dd3fc]  dark:bg-[#7dd3fc] h-6 rounded transition-all duration-700 ease-out"
              style={{ width: `${animatedScore}%` }}
            ></div>
          </div>

          
        </div>
        <p className="mt-3 text-sm italic text-gray-800 dark:text-gray-400">
          Giá trị thể hiện độ tin cậy tổng thể của mô hình dựa trên phân bố xác
          suất các lớp.
        </p> */}
      </div>

      {/* RIGHT - Gauge Charts */}
      <div className="h-full bg-gray-200 dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-1">Xác suất mỗi lớp</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-15 md:gap-y-0 gap-x-0 md:gap-x-8">
          {classProbabilities.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full pb-5">
                <GaugeChart value={item.percentage} label={item.label} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfidenceScore;
