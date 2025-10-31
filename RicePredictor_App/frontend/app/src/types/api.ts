import type { HyperparametersType, NeighborType } from "./knn";
import type { RiceInput } from "./rice";

// Xác suất theo lớp
export interface Probabilities {
  Cammeo: number;
  Osmancik: number;
}

// Dữ liệu chung cho mọi mô hình
export interface BaseResponseData {
  model: string;
  input: RiceInput;
  prediction: string;
}

// Dữ liệu riêng cho KNN
export interface KNNResponseData extends BaseResponseData {
  hyperparameters: HyperparametersType;
  neighbors: NeighborType[];
  probabilities: Probabilities;
  training_samples: number;
  
}

// Dữ liệu riêng cho Naive Bayes
export interface NBResponseData extends BaseResponseData {
  prior_probabilities: Probabilities;
  probabilities: Probabilities;
  var_smoothing: number,
  training_samples: number;
}

export interface DTResponseData extends BaseResponseData {
  probabilities: Probabilities;
  hyperparameters: {
    criterion: string;
    max_depth: number;
    min_samples_split: number;
    min_samples_leaf: number;
  };
  tree_text: string;
  feature_importances: Record<string, number>;
}


export interface LRResponseData extends BaseResponseData {
  hyperparameters: {
    C: number;
    penalty: string;
    solver: string;
  };
  coefficients: Record<string, number>;
  intercept: number;
  probabilities: Probabilities;
}

export interface SVMResponseData extends BaseResponseData {
  distance_to_boundary: number;
  certainty_score: number;
  hyperparameters: {
    C: number;
    kernel: string;
    gamma: string;
  };
  support_vectors: {
    total: number;
    by_class: {
      Cammeo: number;
      Osmancik: number;
    };
    indices: number[];
  };
}

export interface RFResponseData {
  model: string;
  input: RiceInput;
  prediction: string;
  probabilities: Probabilities;
  hyperparameters: {
    n_estimators: number;
    max_depth: number;
    min_samples_split: number;
    min_samples_leaf: number;
  };
  feature_importances: Record<string, number>;
}

export interface AdaBoostResponseData {
  model: string;
  input: Record<string, number>;
  prediction: string;
  probabilities: {
    Cammeo: number;
    Osmancik: number;
  };
  feature_importances: Record<string, number>;
  hyperparameters: {
    algorithm: string,
    learning_rate: number,
    n_estimators: number
  }
}

export interface MLPResponseData {
  model: string;
  input: Record<string, number>;
  prediction: string;
  probabilities: {
    Cammeo: number;
    Osmancik: number;
  };
  certainty_score: number;
  hyperparameters: {
    activation: string;
    alpha: number;
    hidden_layer_sizes: number | number[];
    learning_rate_init: number;
  };
}

// Kết quả có thể là của KNN hoặc NB
export type DataResponseType = KNNResponseData | NBResponseData | DTResponseData | RFResponseData | LRResponseData | SVMResponseData | AdaBoostResponseData | MLPResponseData;

// Toàn bộ response từ API
export interface ApiRes {
  success: boolean;
  message: string;
  data: DataResponseType;
}

