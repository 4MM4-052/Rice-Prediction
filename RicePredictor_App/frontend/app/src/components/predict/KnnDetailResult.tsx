import React, { useState } from "react";
import type { KNNResponseData } from "../../types/api";
// import ConfidenceScore from "../ui/ConfidenceScore";
// import ModelInfo from "../ui/ModelInfo";
import NeighborCard from "../ui/NeighbirCard";
// import ModelInputInfo from "../ui/ModelInput";

interface Props {
  data: KNNResponseData;
}

const KnnDetailResult: React.FC<Props> = ({ data }) => {
  const [highlight, setHighlight] = useState(false);

  const labelCounts = data.neighbors.reduce((acc, curr) => {
    acc[curr.label] = (acc[curr.label] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      {/* <ConfidenceScore
        confidenceScore={
          Math.max(data.probabilities.Cammeo, data.probabilities.Osmancik) * 100
        }
        classProbabilities={[
          { label: "Cammeo", percentage: data.probabilities.Cammeo * 100 },
          { label: "Osmancik", percentage: data.probabilities.Osmancik * 100 },
        ]}
      /> */}

      {/* <ModelInfo
        modelName="K-Nearest Neighbors"
        parameters={[
          {
            key: "Số láng giềng (n_neighbors)",
            value: data.hyperparameters.n_neighbors,
          },
          { key: "Trọng số (weights)", value: data.hyperparameters.weights },
          { key: "Khoảng cách (metric)", value: data.hyperparameters.metric },
          { key: "Số mẫu huấn luyện", value: data.training_samples },
        ]}
      /> */}

      {/* <ModelInputInfo inputs={data.input} /> */}

      <div className="max-w-6xl mx-auto mt-5 p-6 space-y-6 bg-gray-200 dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg mb-2">
            Các láng giềng gần nhất (k = {data.hyperparameters.n_neighbors}, {data.hyperparameters.metric}, {data.hyperparameters.weights})
          </h3>
          <button
            onClick={() => setHighlight((prev) => !prev)}
            className={`px-3 py-1 text-sm rounded transition font-medium
            ${
              highlight
                ? "bg-teal-200 text-black hover:bg-teal-300"
                : "bg-rose-300 text-black hover:bg-rose-400"
            }
            `}
          >
            Highlight
          </button>
        </div>
        {highlight && (
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {Object.entries(labelCounts).map(([label, count]) => (
              <span key={label} className="mr-4">
                <strong>{label}</strong>: {count}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.neighbors.map((neighbor, idx) => (
            <NeighborCard
              key={idx}
              index={idx}
              label={neighbor.label}
              distance={neighbor.distance}
              prediction={data.prediction}
              highlight={highlight}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default KnnDetailResult;
