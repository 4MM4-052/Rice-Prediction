import React from "react";
import type { RFResponseData } from "../../types/api";
import ConfidenceScore from "../ui/ConfidenceScore";
// import ModelInfo from "../ui/ModelInfo";
// import ModelInputInfo from "../ui/ModelInput";
// import FeatureImportances from "../ui/FeatureImpotances";

interface Props {
  data: RFResponseData;
}

const RfDetailResult: React.FC<Props> = ({ data }) => {
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

      {/* <ModelInfo
        modelName={data.model}
        parameters={[
          {
            key: "Số cây (n_estimators)",
            value: data.hyperparameters.n_estimators,
          },
          {
            key: "Độ sâu tối đa (max_depth)",
            value: data.hyperparameters.max_depth,
          },
          {
            key: "Tối thiểu mẫu để tách (min_samples_split)",
            value: data.hyperparameters.min_samples_split,
          },
          {
            key: "Tối thiểu mẫu ở lá (min_samples_leaf)",
            value: data.hyperparameters.min_samples_leaf,
          },
        ]}
      /> */}

      {/* <ModelInputInfo inputs={data.input} /> */}

      {/* <FeatureImportances feature_importances={data.feature_importances} /> */}
    </>
  );
};

export default RfDetailResult;
