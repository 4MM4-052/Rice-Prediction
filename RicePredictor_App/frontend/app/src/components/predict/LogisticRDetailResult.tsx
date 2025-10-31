import React from "react";
import type { LRResponseData } from "../../types/api";
// import ConfidenceScore from "../ui/ConfidenceScore";
// import ModelInfo from "../ui/ModelInfo";
// import ModelInputInfo from "../ui/ModelInput";
import CoefficientTable from "../ui/CoeficientTable";

interface Props {
  data: LRResponseData;
}

const LogisticRDetailResult: React.FC<Props> = ({ data }) => {
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
            key: "Penalty",
            value: data.hyperparameters.penalty,
          },
          { key: "Solver", value: data.hyperparameters.solver },
          { key: "C", value: data.hyperparameters.C },
        ]}
      /> */}

      {/* <ModelInputInfo inputs={data.input} /> */}

      <CoefficientTable
        coefficients={data.coefficients}
        intercept={data.intercept}
      />
    </>
  );
};

export default LogisticRDetailResult;
