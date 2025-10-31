import React from "react";
import type { NBResponseData } from "../../types/api";
import ConfidenceScore from "../ui/ConfidenceScore";
// import ModelInfo from "../ui/ModelInfo";
// import ModelInputInfo from "../ui/ModelInput";

interface Props {
  data: NBResponseData;
}

const NbDetailResult: React.FC<Props> = ({ data }) => {
  return (
    <>
      <ConfidenceScore
        confidenceScore={
          Math.max(data.probabilities.Cammeo, data.probabilities.Osmancik) * 100
        }
        classProbabilities={[
          { label: "Cammeo", percentage: data.probabilities.Cammeo * 100 },
          { label: "Osmancik", percentage: data.probabilities.Osmancik * 100 },
        ]}
      />
{/* 
      <ModelInfo
        modelName={data.model}
        parameters={[
          {
            key: "Xác suất tiên nghiệm (prior)",
            value: `Cammeo: ${(data.prior_probabilities.Cammeo * 100).toFixed(
              2
            )}%, Osmancik: ${(data.prior_probabilities.Osmancik * 100).toFixed(
              2
            )}%`,
          },
          {
            key: "var_smoothing",
            value: data.var_smoothing,
          },
        ]}
      /> */}

      {/* <ModelInputInfo inputs={data.input} /> */}
    </>
  );
};

export default NbDetailResult;
