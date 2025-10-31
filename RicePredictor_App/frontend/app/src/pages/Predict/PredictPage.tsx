import { useEffect, useState } from "react";
import type { RiceInput } from "../../types/rice";
import { useFormik } from "formik";
import * as Yup from "yup";

import type {
  // AdaBoostResponseData,
  ApiRes,
  DTResponseData,
  KNNResponseData,
  LRResponseData,
  // LRResponseData,
  MLPResponseData,
  // NBResponseData,
  // RFResponseData,
  SVMResponseData,
} from "../../types/api";
import KnnDetailResult from "../../components/predict/KnnDetailResult";
// import NbDetailResult from "../../components/predict/NbDetailResult";
import DtDetailResult from "../../components/predict/DtDetailResult";
// import RfDetailResult from "../../components/predict/RfDetailResult";
// import LogisticRDetailResult from "../../components/predict/LogisticRDetailResult";
import SvmDetailResult from "../../components/predict/SvmDetailResult";
// import AdaboostDetailResult from "../../components/predict/AdaboostDetailResult";
import MlpDetailResult from "../../components/predict/MlpDetailResult";
import LogisticRDetailResult from "../../components/predict/LogisticRDetailResult";

const defaultForm: RiceInput = {
  area: 0,
  perimeter: 0,
  major_axis_length: 0,
  minor_axis_length: 0,
  eccentricity: 0,
  extent: 0,
  convex_area: 0,      // thêm
 
};

interface ModelType {
  value: string;
  label: string;
}

interface InputType {
  key: string;
  name: string;
  desc: string;
  hint?: string;
}

const PredictSchema = Yup.object().shape({
  area: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(7551.00, "Giá trị quá nhỏ (7551.00 - 18913.00 px)")
    .max(18913.00, "Giá trị quá lớn (7551.00 - 18913.00 px)")
    .required("Vui lòng nhập giá trị"),
  perimeter: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(359.10, "Giá trị quá nhỏ (359.10 - 548.45 px)")
    .max(548.45, "Giá trị quá lớn (359.10 - 548.45 px)")
    .required("Vui lòng nhập giá trị"),
  major_axis_length: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(145.26, "Giá trị quá nhỏ (145.26 - 239.01 px)")
    .max(239.01, "Giá trị quá lớn (145.26 - 239.01 px)")
    .required("Vui lòng nhập giá trị"),
  minor_axis_length: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(59.53, "Giá trị quá nhỏ (59.53 - 107.54 px)")
    .max(107.54, "Giá trị quá lớn (59.53 - 107.54 px)")
    .required("Vui lòng nhập giá trị"),
  eccentricity: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(0.78, "Giá trị quá nhỏ  (0.78 - 0.95)")
    .max(1, "Giá trị quá lớn (0.78 - 0.95)")
    .required("Vui lòng nhập giá trị"),
  convex_area: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(7723.00, "Giá trị quá nhỏ (7723.00 - 19099.00 px)")
    .max(19099.00, "Giá trị quá lớn (7723.00 - 19099.00 px)")
    .required("Vui lòng nhập giá trị"),
  extent: Yup.number()
    .typeError("Vui lòng nhập số")
    .positive("Giá trị âm không hợp lệ")
    .min(0.50, "Giá trị quá nhỏ  (0.50 - 0.86)")
    .max(0.86, "Giá trị quá lớn (0.50 - 0.86)")
    .required("Vui lòng nhập giá trị"),
});

const PredictPage: React.FC = () => {
  const [model, setModel] = useState<string>("k-nearest-neighbors");
  const [result, setResult] = useState<string | null>(null);
  const [dataRes, setDataRes] = useState<ApiRes | null>(null);

  const [err, setErr] = useState<string | null>(null);

  const modelOptions: ModelType[] = [
    { value: "k-nearest-neighbors", label: "K-Nearest Neighbors" },
    // { value: "naive-bayes", label: "Naive Bayes" },
    { value: "decision-tree", label: "Decision Tree" },
    // { value: "random-forest", label: "Random Forest" },
    { value: "support-vector-machine", label: "SVM (Support Vector Machine)" },
    { value: "logistic-regression", label: "Logistic Regression" },
    { value: "multilayer-perceptron", label: "Multilayer Perceptron" },
    // { value: "adaboost", label: "Adaboost" },
  ];

  const inputs: InputType[] = [
    {
      key: "area",
      name: "Area",
      desc: "Diện tích của hạt gạo (px)",
      hint: "7551.00 - 18913.00 px",
    },
    {
      key: "perimeter",
      name: "Perimeter",
      desc: "Chu vi của hạt gạo (px)",
      hint: "359.10 - 548.45 px",
    },
    {
      key: "major_axis_length",
      name: "Major axis length",
      desc: "Độ dài trục lớn của hạt gạo (px)",
      hint: "145.26 - 239.01 px",
    },
    {
      key: "minor_axis_length",
      name: "Minor axis length",
      desc: "Độ dài trục nhỏ của hạt gạo (px)",
      hint: "59.53 - 107.54 px",
    },
    {
      key: "eccentricity",
      name: "Eccentricity",
      desc: "Độ lệch tâm của hạt gạo",
      hint: "0.78 - 0.95",
    },
        {
      key: "convex_area",
      name: "Convex_Area",
      desc: "Độ lệch tâm của hạt gạo",
      hint: "7723.00 - 19099.00 px",
    },
    {
      key: "extent",
      name: "Extent",
      desc: "Extent (tỷ lệ diện tích vùng/diện tích hình chữ nhật bao ngoài)",
      hint: "0.50 – 0.86",
    },
  ];

  const formik = useFormik({
    initialValues: defaultForm,
    validationSchema: PredictSchema,
    onSubmit: async (values) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/predict/${model}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );

        // const data: ApiResponse = await res.json();
        const data: ApiRes = await res.json();
        if (data.success) {
          setDataRes(data);
          setResult(
            `Gạo ${data.data?.prediction}`
          );
          setErr(null);
        } else {
          setResult(null);
          setErr(`Lỗi: ${data.message}`);
        }
      } catch (err) {
        setErr("Không thể kết nối đến máy chủ");
        setResult(null);
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (
      Object.keys(formik.errors).length > 0 &&
      Object.keys(formik.touched).length > 0
    ) {
      setErr("Dữ liệu nhập vào chưa đúng. Vui lòng kiểm tra lại !!!");
      setResult(null);
    }
  }, [formik.errors, formik.touched]);

  const ellipsePerimeterRamanujan2 = (major: number, minor: number): number => {
    const a = major / 2;
    const b = minor / 2;

    const h = ((a - b) / (a + b)) ** 2;

    const perimeter =
      Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));

    return parseFloat(perimeter.toFixed(3)); // Giữ 3 chữ số thập phân
  };

  const fillRandomValues = () => {
    const random = (min: number, max: number, precision = 3) =>
      parseFloat((Math.random() * (max - min) + min).toFixed(precision));

    // Ràng buộc theo yêu cầu:
    const major = random(145.26, 239.01); // 100–300 px
    const minor = random(59.53, Math.min(107.54, major)); // 50–150 px và luôn ≤ major
    const convex_area = random(7723.00, 19099.00, 0);
   

    const area = parseFloat(((Math.PI * major * minor) / 4).toFixed(3));
    const perimeter = ellipsePerimeterRamanujan2(major, minor);
    const eccentricity = parseFloat(
      Math.sqrt(1 - minor ** 2 / major ** 2).toFixed(3)
    );
    // const extent = parseFloat((area / (major * minor)).toFixed(3));
    const boundingBoxArea = major * minor * random(1, 1.2);
    const extent = parseFloat((area / boundingBoxArea).toFixed(3));

    const randomValues: RiceInput = {
      area,
      perimeter,
      major_axis_length: major,
      minor_axis_length: minor,
      eccentricity,
      convex_area,
      extent,
    };

    formik.setValues(randomValues);
    setErr(null);
    setResult(null);
  };

  const clearForm = () => {
    formik.resetForm(); // Reset về initialValues
    setResult(null);
    setErr(null);
  };

  const renderModelDetail = () => {
    if (!result || !dataRes?.data) return null;

    switch (dataRes?.data.model) {
      case "K-Nearest Neighbors":
        return <KnnDetailResult data={dataRes?.data as KNNResponseData} />;
      // case "Naive Bayes":
      //   return <NbDetailResult data={dataRes?.data as NBResponseData} />;
      // case "Random Forest":
      //   return <RfDetailResult data={dataRes?.data as RFResponseData} />;
      case "Decision Tree":
        return <DtDetailResult data={dataRes?.data as DTResponseData} />;
      case "Logistic Regression":
        return <LogisticRDetailResult data={dataRes?.data as LRResponseData} />;
      case "SVM (Support Vector Machine)":
        return <SvmDetailResult data={dataRes?.data as SVMResponseData} />;
      // case "AdaBoost":
      //   return (
      //     <AdaboostDetailResult data={dataRes?.data as AdaBoostResponseData} />
      //   );
      case "Multilayer Perceptron":
        return <MlpDetailResult data={dataRes?.data as MLPResponseData} />;

      default:
        return <p></p>;
    }
  };

  return (
    <>
   <div className="max-w-6xl mx-auto mt-20 p-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0F1727] dark:to-[#1E2939] rounded-3xl shadow-2xl border border-gray-300 dark:border-gray-700 transition-all duration-300 space-y-10">
  {/* --- Tiêu đề --- */}
<div className="text-center space-y-3">
    <h2
      className="text-5xl font-extrabold tracking-wide text-transparent bg-clip-text 
      bg-[linear-gradient(90deg,_#FF6B6B,_#FFD93D,_#6BCB77,_#4D96FF,_#FF6B6B)]
      bg-[length:200%_auto] animate-[shine_3s_linear_infinite]"
    >
      AI Rice Classifier
    </h2>
    <style>
    {`
    @keyframes shine {
      to {
        background-position: -200% center;
      }
    }
    `}
    </style>
    <h3 className="text-gray-600 dark:text-gray-400 text-xl">
      🌾 Phân loại gạo <b>Cammeo</b> và <b>Osmancik</b> bằng mô hình học máy
    </h3>
  </div>

  <div className="flex flex-col lg:flex-row gap-10">
    {/* --- Form nhập liệu --- */}
    <div className="lg:w-2/3 space-y-8 bg-white dark:bg-[#1E2939] rounded-2xl shadow-lg p-6 border border-gray-300 dark:border-gray-700">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {inputs.map(({ key, name, desc, hint }) => (
            <div key={key} className="space-y-1">
              <label
                className="block font-semibold text-gray-700 dark:text-gray-200"
                title={desc}
              >
                {name} <span className="text-sm text-gray-500">({hint})</span>
              </label>
              <input
                type="number"
                name={key}
                value={formik.values[key as keyof RiceInput]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
                step="any"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-[#0F1727] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              {formik.touched[key as keyof RiceInput] &&
                formik.errors[key as keyof RiceInput] && (
                  <div className="text-sm text-red-400">
                    {formik.errors[key as keyof RiceInput]}
                  </div>
                )}
            </div>
          ))}
        </div>

        <div>
          <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">
            Chọn mô hình:
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-[#0F1727] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {modelOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* --- Buttons --- */}
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={fillRandomValues}
            className="
              px-7 py-3 rounded-lg font-semibold
              bg-white dark:bg-[#253341]
              text-gray-900 dark:text-gray-100
              border border-gray-300 dark:border-gray-500
              
              dark:hover:bg-[#225e59] dark:hover:border-[#34d399]
              transition-all duration-300 shadow-md
              text-lg
            "
          >
             Random
          </button>

          <button
            type="button"
            onClick={clearForm}
            className="
              px-7 py-3 rounded-lg font-semibold
              bg-white dark:bg-[#253341]
              text-gray-900 dark:text-gray-100
              border border-gray-300 dark:border-gray-500
              hover:bg-[#fff9db] hover:border-[#facc15]
              dark:hover:bg-[#5a4b14] dark:hover:border-[#fbbf24]
              transition-all duration-300 shadow-md
              text-lg
            "
          >
             Reset
          </button>

          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            className={`
              px-7 py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-md border
              ${
                formik.isValid && formik.dirty
                  ? "dark:bg-[#134b73] dark:border-[#3b82f6] text-white border-transparent hover:bg-sky-200 hover:text-blue-800 hover:border-sky-600"
                  : "bg-gray-400 text-white border-transparent cursor-not-allowed"
              }
            `}
          >
            Predict
          </button>


        </div>
      </form>
    </div>

    {/* --- Kết quả --- */}
    <div className="lg:w-1/3 space-y-6">
      <div className="p-6 bg-white dark:bg-[#1E2939] rounded-2xl shadow-lg border border-gray-300 dark:border-gray-600 text-center">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Kết quả dự đoán
        </h3>
        {result && (
        <div className="text-2xl font-semibold text-sky-400 dark:text-cyan-300 bg-sky-50 dark:bg-cyan-800/20 py-3 rounded-lg border border-cyan-400">
          {result}
        </div>
        )}

        {err && (
          <div className="text-base font-medium text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20 py-3 rounded-lg border border-red-500">
            ❌ {err}
          </div>
        )}

        {!result && !err && (
          <div className="text-gray-500 dark:text-gray-400 italic">
            Chưa có kết quả nào. Vui lòng nhập dữ liệu và chọn mô hình.
          </div>
        )}
      </div>

<div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0F1727] dark:to-[#1E293B] 
  border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
  <div className="flex items-center mb-4">
    <span className="text-yellow-400 text-2xl mr-3">💡</span>
    <h3 className="font-extrabold text-gray-800 dark:text-gray-100 text-2xl tracking-wide">
      Gợi ý sử dụng hệ thống
    </h3>
  </div>
  <ul className="list-disc list-inside space-y-3 text-gray-800 dark:text-gray-300 text-lg leading-relaxed">
    <li>
      Nhập các giá trị cho <b>thuộc tính</b>, sau đó chọn mô hình rồi nhấn 
      <span className="text-cyan-400 dark:text-cyan-300 font-semibold"> "Predict"</span>.
    </li>
    <li>
      Nút <span className="text-green-400 dark:text-green-400 font-semibold">"Random"</span> giúp 
      tự động điền ngẫu nhiên các tham số.
    </li>
    <li>
      Nút <span className="text-amber-400 dark:text-amber-300 font-semibold">"Reset"</span> sẽ 
      làm mới toàn bộ thuộc tính về giá trị mặc định.
    </li>
    <li>
      Kết quả hiển thị ở khung trên cùng là tên loại gạo 
      <b className="text-red-500 dark:text-red-500"> Cammeo</b> hoặc 
      <b className="text-sky-500 dark:text-sky-400"> Osmancik</b> dựa vào thuật toán bạn chọn.
    </li>
  </ul>
</div>

    </div>
  </div>
</div>



      {renderModelDetail()}
    </>
  );
};

export default PredictPage;
