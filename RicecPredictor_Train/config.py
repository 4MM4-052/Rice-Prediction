# config.py

# File dữ liệu gốc
DATA_PATH = "RicecPredictor_Train/data/Rice2025.xlsx"

# Cột nhãn và đặc trưng
TARGET_COLUMN = "Class"
FEATURE_COLUMNS = [
    "Area",
    "Perimeter",
    "Major_Axis_Length",
    "Minor_Axis_Length",
    "Eccentricity",
    "Convex_Area",
    "Convex_Area_2",
    "Extent"
]

# File dữ liệu xử lý
DATA_OUTPUT = "RicecPredictor_Train/machine_learning/rice_processed.pkl"
FEATURES_PATH = "RicecPredictor_Train/machine_learning/rice_feature_columns.pkl"
DESCRIPTION_PATH = "RicecPredictor_Train/machine_learning/rice_data_description.pkl"
SCALER_PATH = "RicecPredictor_Train/machine_learning/scaler.pkl"

# Tên mô hình và file lưu tương ứng
MODEL_NAMES = [
    "Random_Forest",
    "kNN",
    "Naive_Bayes",
    "Decision_Tree",
    "Logistic_Regression",
    "SVM",
    "MLP",
    "Adaboost"
]
MODEL_PATHS = {name: f"RicecPredictor_Train/machine_learning/models/{name}.pkl" for name in MODEL_NAMES}
