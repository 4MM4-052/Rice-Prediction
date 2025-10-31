import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pickle

from collections import Counter
from sklearn.decomposition import PCA
from sklearn.impute import SimpleImputer
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler, MinMaxScaler
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
print("Đang tải dữ liệu đã xử lý...")

try:
    with open(DATA_OUTPUT, 'rb') as f:
        data = pickle.load(f)
    
    with open(FEATURES_PATH, 'rb') as f:
        FEATURE_COLUMNS = pickle.load(f)
    
    # Tải lại tập test (đã chuẩn hóa) để đánh giá mô hình
    X_test_scaled = pd.read_pickle("X_test_scaled.pkl").values
    y_test = pd.read_pickle("y_test.pkl").values
    
except Exception as e:
    print(f"Lỗi tải dữ liệu: {e}. Hãy đảm bảo chạy preprocess.py trước!")
    exit()

X = data[FEATURE_COLUMNS].values
y = data[TARGET_COLUMN].values

# Sử dụng dữ liệu training từ file đã xử lý
X_train_scaled = X
y_train = y

# ====== Áp dụng SMOTE ======
smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train_scaled, y_train)
print(f"Dữ liệu Training sau SMOTE: {X_train_resampled.shape[0]} mẫu.")

# ====== Danh sách mô hình (ĐÃ SỬA HYPERPARAMETERS) ======
models = {
    # Giảm C để tăng tính tổng quát hóa
    "SVM": SVC(C=10, class_weight='balanced', gamma='scale', kernel='linear', random_state=42), 
    "Decision_Tree": DecisionTreeClassifier(class_weight='balanced', max_depth=3, min_samples_split=2, random_state=42), 
    "Logistic_Regression": LogisticRegression(C=10, class_weight='balanced', solver='liblinear', random_state=42), 
    "kNN": KNeighborsClassifier(metric='manhattan', n_neighbors=14, weights='distance'), 
    "MLP": MLPClassifier(activation='tanh', hidden_layer_sizes=(100, 50), max_iter=500, solver='adam', random_state=42), 
    "Random_Forest": RandomForestClassifier(n_estimators=200, class_weight='balanced', random_state=42), 
    "Naive_Bayes": GaussianNB(),
    "Adaboost": AdaBoostClassifier(DecisionTreeClassifier(max_depth=1), n_estimators=50, random_state=42)
}

# ====== Huấn luyện và lưu mô hình ======
for name, model in models.items():
    print(f"\n==========================================")
    print(f"Đang huấn luyện mô hình: {name}")
    model.fit(X_train_resampled, y_train_resampled)

    # Dự đoán trên dữ liệu test
    y_pred = model.predict(X_test_scaled)

    # Đánh giá
    acc = accuracy_score(y_test, y_pred)
    print(f"Accuracy trên tập Test: {acc:.4f}")
    print(classification_report(y_test, y_pred))

    # Lưu mô hình
    model_path = MODEL_PATHS[name]
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    
    print(f"Mô hình '{name}' đã được lưu tại: {model_path}")