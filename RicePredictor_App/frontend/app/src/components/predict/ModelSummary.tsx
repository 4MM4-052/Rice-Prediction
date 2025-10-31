import React from "react";

interface ModelInfo {
  key: string;
  name: string;
  abbr: string;
  desc: string;
  link: string;
}

const modelInfos: ModelInfo[] = [
  {
    key: "k-nearest-neighbors",
    name: "------ K-Nearest Neighbors ------",
    abbr: "KNN",
    desc: "Phân loại một điểm dữ liệu dựa trên số lượng “K” điểm gần nhất trong không gian đặc trưng. Kết quả được xác định theo đa số của các điểm lân cận.",
    link: "https://scikit-learn.org/stable/modules/neighbors.html#classification",
  },
  // {
  //   key: "naive-bayes",
  //   name: "Naive Bayes",
  //   abbr: "NB",
  //   desc: "Áp dụng định lý Bayes để ước lượng xác suất và phân loại đầu vào.",
  //   link: "https://scikit-learn.org/stable/modules/naive_bayes.html",
  // },
  {
    key: "decision-tree",
    name: "------ Decision Tree ------",
    abbr: "DT",
    desc: "Xây dựng một cây quyết định, trong đó mỗi nút phân chia dữ liệu theo thuộc tính, giúp đưa ra kết luận phân loại cuối cùng.",
    link: "https://scikit-learn.org/stable/modules/tree.html",
  },
  // {
  //   key: "random-forest",
  //   name: "Random Forest",
  //   abbr: "RF",
  //   desc: "Tổng hợp nhiều cây quyết định để cải thiện độ chính xác và giảm overfitting.",
  //   link: "https://scikit-learn.org/stable/modules/ensemble.html#forest",
  // },
  {
    key: "support-vector-machine",
    name: "------ Support Vector Machine ------",
    abbr: "SVM",
    desc: "Tìm siêu phẳng tối ưu để phân tách các lớp dữ liệu, tối đa hóa khoảng cách giữa các lớp.",
    link: "https://scikit-learn.org/stable/modules/svm.html",
  },
  {
    key: "logistic-regression",
    name: "------ Logistic Regression ------",
    abbr: "LR",
    desc: "Mô hình ước lượng xác suất để phân loại đầu ra, thường dùng cho các bài toán nhị phân.",
    link: "https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression",
  },
  {
    key: "multilayer-perceptron",
    name: "------ Multilayer Perceptron ------",
    abbr: "MLP",
    desc: "Một mạng neural nhiều tầng (deep learning), có khả năng học các quan hệ phi tuyến giữa các đặc trưng.",
    link: "https://scikit-learn.org/stable/modules/neural_networks_supervised.html",
  },
  // {
  //   key: "adaboost",
  //   name: "Adaboost",
  //   abbr: "AB",
  //   desc: "Tăng cường nhiều mô hình yếu để tạo ra mô hình mạnh hơn.",
  //   link: "https://scikit-learn.org/stable/modules/ensemble.html#adaboost",
  // },
];

const ModelSummaryAll: React.FC = () => {
  return (
<div className="max-w-6xl mx-auto mt-10 p-8 backdrop-blur-lg bg-white/20 dark:bg-white/10 rounded-3xl border border-white/30 shadow-2xl">
  <div className="flex justify-center">
    <h2 className="text-3xl font-extrabold text-white text-center mb-10">
      Tóm tắt các giải thuật
    </h2>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {modelInfos.map(({ key, abbr, name, desc, link }) => (
      <div
        key={key}
        onClick={() => window.open(link, "_blank")}
        className="p-6 bg-white/30 dark:bg-gray-800/40 rounded-2xl border border-white/40 hover:scale-105 transition-all duration-300 cursor-pointer"
      >
        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-3 inline-block ">
            {abbr}
        </span>
        <h3 className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-400 to-green-500 mb-2 block w-fit">
          {name}
        </h3>
        <p className="text-gray-800 dark:text-gray-100 text-base leading-relaxed">
          {desc}
        </p>
      </div>
    ))}
  </div>
</div>


    
  );
};

export default ModelSummaryAll;
