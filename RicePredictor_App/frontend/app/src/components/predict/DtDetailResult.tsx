import React from "react";
import type { DTResponseData } from "../../types/api";
// import ModelInputInfo from "../ui/ModelInput";
// import ModelInfo from "../ui/ModelInfo";
// import ConfidenceScore from "../ui/ConfidenceScore";
import TreeFlowFromText from "../ui/TreeFlowFromText";
// import DtText from "../ui/DtText";
// import FeatureImportances from "../ui/FeatureImpotances";

interface Props {
  data: DTResponseData;
}

const DtDetailResult: React.FC<Props> = ({ data }) => {
  console.log(data.tree_text)
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
        modelName={data.model}
        parameters={[
          {
            key: "Tiêu chí (criterion)",
            value: data.hyperparameters.criterion,
          },
          {
            key: "Độ sâu tối đa (max_depth)",
            value: data.hyperparameters.max_depth,
          },
          {
            key: "Số mẫu tối thiểu (min_samples_split)",
            value: data.hyperparameters.min_samples_split,
          },
          {
            key: "Số mẫu tối thiểu ở lá (min_samples_leaf)",
            value: data.hyperparameters.min_samples_leaf,
          },
        ]}
      /> */}

      {/* <ModelInputInfo inputs={data.input} /> */}

      {/* <DtText
        treeText={data.tree_text}
      /> */}

      {/* <FeatureImportances feature_importances={data.feature_importances} /> */}

      <TreeFlowFromText treeText={data.tree_text} />
    </>
  );
};

export default DtDetailResult;
