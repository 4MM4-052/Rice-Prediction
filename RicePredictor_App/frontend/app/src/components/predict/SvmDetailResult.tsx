import React from "react";
import type { SVMResponseData } from "../../types/api";
// import ModelInfo from "../ui/ModelInfo";
// import ModelInputInfo from "../ui/ModelInput";
// import CertaintyScore from "../ui/CertaintyScore";
import SupportVectorInfo from "../ui/SupportVectorInfo";

interface Props {
  data: SVMResponseData;
}

const SvmDetailResult: React.FC<Props> = ({ data }) => {
  const {
    support_vectors,
  } = data;

  return (
    <>
      {/* <CertaintyScore
        certainty_score={data.certainty_score}
        distance_to_boundary={data.distance_to_boundary}
      /> */}


      {/* <ModelInfo
        modelName={data.model}
        parameters={[
          {
            key: "Kernel",
            value: data.hyperparameters.kernel,
          },
          {
            key: "C (Penalty)",
            value: data.hyperparameters.C,
          },
          {
            key: "Gamma",
            value: data.hyperparameters.gamma,
          },
        ]}
      /> */}

      {/* <ModelInputInfo inputs={data.input} /> */}

      <SupportVectorInfo
        total={support_vectors.total}
        byClass={{ Cammeo: support_vectors.by_class.Cammeo, Osmancik: support_vectors.by_class.Osmancik }}
        indices={support_vectors.indices}
      />
    </>
  );
};

export default SvmDetailResult;
