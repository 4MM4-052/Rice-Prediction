import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import re
import pickle

from collections import Counter
from sklearn.decomposition import PCA
from sklearn.impute import SimpleImputer
from sklearn.model_selection import GridSearchCV
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report
from sklearn.metrics import confusion_matrix

from imblearn.over_sampling import SMOTE

# Các mô hình học máy
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neural_network import MLPClassifier

# Cấu hình (đọc từ file config.py)
from config import DATA_OUTPUT, FEATURES_PATH, TARGET_COLUMN, SCALER_PATH, MODEL_PATHS

# ====== Tải dữ liệu đã xử lý ======
print("🔹 Đang tải dữ liệu đã xử lý...")
try:
    # Mở file pickle chứa dữ liệu đã xử lý
    with open(DATA_OUTPUT, 'rb') as f:
        data = pickle.load(f)
    with open(FEATURES_PATH, 'rb') as f:
        FEATURE_COLUMNS = pickle.load(f)
except Exception as e:
    print(f"Error: {e}")
    print("Lỗi: Hãy chạy preprocess.py trước!")
    exit()

# Chia dữ liệu thành X (features) và y (target)
X = data[FEATURE_COLUMNS]
y = data[TARGET_COLUMN]

# ====== Chia dữ liệu thành bộ train và test ======
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# ====== Chuẩn hóa dữ liệu bằng StandardScaler ======
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)  # Chuẩn hóa dữ liệu train
X_test_scaled = scaler.transform(X_test)  # Chuẩn hóa dữ liệu test (dùng cùng scaler với train)

# Lưu scaler để dùng lại sau
with open(SCALER_PATH, 'wb') as f:
    pickle.dump(scaler, f)

# ====== Áp dụng SMOTE để giải quyết mất cân bằng lớp ======
smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train_scaled, y_train)

# ====== Định nghĩa các mô hình học máy ======
models = {
    "kNN": KNeighborsClassifier(metric='minkowski', n_neighbors=11, weights='distance'),
    "Decision_Tree": DecisionTreeClassifier(class_weight='balanced', max_depth=4, min_samples_split=2),
    "Logistic_Regression": LogisticRegression(C=100, class_weight='balanced', solver='lbfgs'),
    "SVM": SVC(C=10, class_weight='balanced', gamma='scale', kernel='linear'),
    "MLP": MLPClassifier(activation='relu', hidden_layer_sizes=(100, 50), max_iter=300, solver='adam'),
    "Random_Forest": RandomForestClassifier(n_estimators=100, class_weight='balanced', random_state=42),
    "Naive_Bayes": GaussianNB(),
    "Adaboost": AdaBoostClassifier(DecisionTreeClassifier(max_depth=1), n_estimators=50, random_state=42),
}

# ====== Huấn luyện và lưu mô hình ======
for name, model in models.items():
    print(f"\nĐang huấn luyện mô hình: {name}")
    model.fit(X_train_resampled, y_train_resampled)  # Huấn luyện mô hình trên dữ liệu đã cân bằng lại

    # Dự đoán trên dữ liệu test
    y_pred = model.predict(X_test_scaled)

    # Đánh giá mô hình bằng các chỉ số như Accuracy, Precision, Recall, F1-Score
    acc = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {acc:.4f}")
    print(classification_report(y_test, y_pred))  # In báo cáo chi tiết về độ chính xác của mô hình

    # Lưu mô hình vào file pickle để sử dụng sau này
    model_path = MODEL_PATHS.get(name)  # Lấy đường dẫn lưu mô hình từ config
    if model_path:
        with open(model_path, 'wb') as f:
            pickle.dump(model, f)
        print(f"Mô hình '{name}' đã được lưu tại: {model_path}")
    else:
        print(f"Error: Đường dẫn lưu mô hình '{name}' không được định nghĩa!")
