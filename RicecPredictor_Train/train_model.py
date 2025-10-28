import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import MinMaxScaler
from imblearn.over_sampling import SMOTE

# Models
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neural_network import MLPClassifier

# Config
from config import DATA_OUTPUT, FEATURES_PATH, TARGET_COLUMN, SCALER_PATH, MODEL_PATHS

# ====== Tải dữ liệu đã xử lý ======
print("🔹 Đang tải dữ liệu đã xử lý...")
try:
    with open(DATA_OUTPUT, 'rb') as f:
        data = pickle.load(f)
    with open(FEATURES_PATH, 'rb') as f:
        FEATURE_COLUMNS = pickle.load(f)
except:
    print("Lỗi: Hãy chạy preprocess.py trước!")
    exit()

X = data[FEATURE_COLUMNS]
y = data[TARGET_COLUMN]

# ====== Chia dữ liệu ======
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# ====== Chuẩn hóa bằng MinMaxScaler ======
scaler = MinMaxScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Lưu scaler
with open(SCALER_PATH, 'wb') as f:
    pickle.dump(scaler, f)

# ====== Áp dụng SMOTE ======
smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train_scaled, y_train)

# ====== Danh sách mô hình ======
models = {
    "Random_Forest": RandomForestClassifier(n_estimators=100, random_state=42),
    "kNN": KNeighborsClassifier(n_neighbors=10, weights='distance'),
    "Naive_Bayes": GaussianNB(),
    "Decision_Tree": DecisionTreeClassifier(max_depth=10, class_weight='balanced', random_state=42),
    "Logistic_Regression": LogisticRegression(max_iter=1000, class_weight='balanced', random_state=42),
    "SVM": SVC(probability=True, class_weight='balanced', random_state=42),
    "MLP": MLPClassifier(hidden_layer_sizes=(100,), max_iter=500, random_state=42),
    "Adaboost": AdaBoostClassifier(n_estimators=50, random_state=42)
}

# ====== Huấn luyện & Lưu mô hình ======
for name, model in models.items():
    print(f"\nĐang huấn luyện mô hình: {name}")
    model.fit(X_train_resampled, y_train_resampled)

    # Dự đoán
    y_pred = model.predict(X_test_scaled)

    # Đánh giá
    acc = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {acc:.4f}")
    print(classification_report(y_test, y_pred))

    # Lưu mô hình
    model_path = MODEL_PATHS[name]
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    print(f"Mô hình '{name}' đã được lưu tại: {model_path}")
