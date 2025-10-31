import React from "react";
import riceImage from "../../assets/Osmancik-and-Cammeo-rice.png";
import ModelSummaryAll from "../../components/predict/ModelSummary";
import FeatureDetail from "../../components/predict/FeatureDetail";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-20 text-gray-900 dark:text-gray-100 space-y-20">
        {/* Hero Section */}
        <section className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-center">
              Hệ Thống Phân Loại Giống Gạo{" "}
              <span className="text-red-600">Cammeo</span> &{" "}
              <span className="text-yellow-400">Osmancik</span>
            </h1>
             {/* Detailed Description */}
            <p className="text-lg leading-relaxed max-w-xl mx-auto">
              Trong số các giống gạo được chứng nhận trồng tại Thổ Nhĩ Kỳ, hai giống hai giống gạo phổ biến <strong>Cammeo</strong> và <strong>Osmancik</strong> đã được chọn để nghiên cứu.  
              Hơn <span className="font-semibold text-cyan-500 dark:text-cyan-400">3,800 ảnh</span> hạt gạo đã được xử lý và phân tích dựa trên <span className="font-semibold">8 đặc trưng hình học</span>.
            </p>

            <section className="px-6 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Card 1 - Thông tin giống gạo */}
                <div className="col-span-1 lg:col-span-4 bg-white dark:bg-[#011a21] p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-cyan-500 space-y-8">
                  <h2 className="text-2xl font-semibold text-sky-400 dark:text-sky-500 text-center">Thông Tin Giống Gạo</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card Osmancik */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                      <h3 className="text-2xl font-semibold text-yellow-400 dark:text-yellow-400 text-center">Osmancik</h3>
                      <p className="text-yellow-100 dark:text-yellow-100 mt-2 text-center">Trồng từ <strong>năm 1997</strong>. Hạt dài, rộng, bề mặt bóng, mờ đục.</p>
                      <ul className="space-y-2 pl-6 mt-4">
                        <li><strong className="text-gray-800 dark:text-gray-200">Đặc điểm:</strong> Hạt dài, rộng, bề mặt bóng, mờ đục.</li>
                        <li><strong className="text-gray-800 dark:text-gray-200">Đặc điểm khác biệt:</strong> Hạt thon dài hơn.</li>
                      </ul>
                    </div>

                    {/* Card Cammeo */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                      <h3 className="text-2xl font-semibold text-red-600 dark:text-red-550 text-center">Cammeo</h3>
                      <p className="text-red-100 dark:text-red-200 mt-2 text-center">Trồng từ <strong>năm 2014</strong>, có đặc điểm tương tự.</p>
                      <ul className="space-y-2 pl-6 mt-4">
                        <li><strong className="text-gray-800 dark:text-gray-200">Đặc điểm:</strong> Hạt dài, rộng, bề mặt bóng, mờ đục.</li>
                        <li><strong className="text-gray-800 dark:text-gray-200">Đặc điểm khác biệt:</strong> Hạt to hơn, dài hơn, tròn hơn, nặng hơn.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Quy trình phân tích (phía dưới) */}
              <div className="bg-white dark:bg-[#011a21] p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-sky-500 mt-10">
                <h2 className="text-2xl font-semibold text-sky-400 dark:text-sky-500 text-center mb-2">Quy Trình Phân Tích</h2>
                <ul className="space-y-6 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-500 dark:text-cyan-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg">Tìm hiểu dữ liệu</span>
                  </li>
                  <li className="flex items-start gap-2 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-500 dark:text-cyan-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg">Tiền xử lý dữ liệu</span>
                  </li>
                  <li className="flex items-start gap-2 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-500 dark:text-cyan-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg">Phân tích trực quan</span>
                  </li>
                  <li className="flex items-start gap-2 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-500 dark:text-cyan-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg">Huấn luyện mô hình dựa trên các đặc trưng</span>
                  </li>
                  <li className="flex items-start gap-2 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-500 dark:text-cyan-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg">Đánh giá và cải tiến mô hình</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-500 dark:text-cyan-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg">Xây dựng website để dự đoán loại gạo</span>
                  </li>
                </ul>
              </div>
            </section>

            <a
              href="/predict"
              className="inline-block mt-4 px-10 py-5 text-cyan-400 text-lg font-semibold rounded-lg relative
                        border border-cyan-400
                        shadow-[0_0_8px_cyan]
                        transition duration-300
                        hover:text-white hover:shadow-[0_0_15px_cyan] hover:scale-105"
            >
              Dự đoán ngay →
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-cyan-400 transition-all duration-300 hover:w-full"></span>
            </a>
          </div>
          {/* Right Image */}
          <div className="flex-1">
            <img
              src={riceImage}
              alt="Rice Morphology AI"
              className="
                w-full max-w-md mx-auto rounded-xl shadow-lg
                transition-transform duration-300 ease-in-out
                scale-130 hover:scale-140 translate-y-10 translate-y-[-150px]
              "
            />
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto px-6">
          {[
            { value: '3822', label: 'Ảnh gạo đã xử lý', color: 'text-cyan-500', hoverColor: 'text-cyan-400' },
            { value: '7', label: 'Đặc trưng hình thái', color: 'text-green-500', hoverColor: 'text-green-400' },
            { value: '2', label: 'Giống gạo', color: 'text-yellow-500', hoverColor: 'text-yellow-400' },
            { value: 'AI', label: 'Ứng dụng học máy', color: 'text-pink-500', hoverColor: 'text-pink-400' },
          ].map(({ value, label, color, hoverColor }, idx) => (
            <div
              key={idx}
              className="p-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-shadow transform hover:scale-105 cursor-pointer flex flex-col items-center"
            >
              <p className={`text-5xl font-extrabold mb-2 drop-shadow-sm transition-colors duration-300 ${color} hover:${hoverColor}`}>
                {value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium text-center">{label}</p>
            </div>
          ))}
        </section>
      </div>

      <div>
        <FeatureDetail />
      </div>
      <div>
        <ModelSummaryAll />
      </div>

    </>
  );
};

export default HomePage;
