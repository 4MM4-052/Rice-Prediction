import pandas as pd
import numpy as np
import pickle
import os

from sklearn.metrics import accuracy_score, classification_report
from imblearn.combine import SMOTETomek

# ML models
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neural_network import MLPClassifier

# Config
from config import DATA_OUTPUT, FEATURES_PATH, TARGET_COLUMN, MODEL_PATHS
load_dir = "RicecPredictor_Train/machine_learning/"

# =======================
# 1. Load dữ liệu
# =======================
print("Đang tải dữ liệu đã xử lý...")
with open(DATA_OUTPUT, 'rb') as f:
    data = pickle.load(f)

with open(FEATURES_PATH, 'rb') as f:
    FEATURE_COLUMNS = pickle.load(f)

# Load test set (scaled)
X_test_scaled = pd.read_pickle(os.path.join(load_dir, "X_test_scaled.pkl")).values
y_test = pd.read_pickle(os.path.join(load_dir, "y_test.pkl")).values

X_train_scaled = data[FEATURE_COLUMNS].values
y_train = data[TARGET_COLUMN].values

# =======================
# 2. SMOTE-Tomek
# =======================
print("Đang áp dụng SMOTE-Tomek...")
smote_tomek = SMOTETomek(random_state=42)
X_train_resampled, y_train_resampled = smote_tomek.fit_resample(X_train_scaled, y_train)
print(f"Dữ liệu training sau SMOTE-Tomek: {X_train_resampled.shape[0]} mẫu.")

# =======================
# 3. Định nghĩa model
# =======================
models = {
    "SVM": SVC(C=10, class_weight='balanced', gamma='auto', kernel='rbf', random_state=42), 
    "Decision_Tree": DecisionTreeClassifier(class_weight='balanced', max_depth=5,
                                            min_samples_split=2, min_samples_leaf=4,
                                            random_state=42), 
    "Logistic_Regression": LogisticRegression(C=0.01, class_weight='balanced',
                                              solver='lbfgs', random_state=42),
    "kNN": KNeighborsClassifier(metric='minkowski', n_neighbors=11, weights='distance'), 
    "MLP": MLPClassifier(activation='relu', learning_rate='constant',
                         hidden_layer_sizes=(100, 50), max_iter=800,
                         solver='adam', random_state=42), 
    "Random_Forest": RandomForestClassifier(n_estimators=200, class_weight='balanced', random_state=42), 
    "Naive_Bayes": GaussianNB(),
    "Adaboost": AdaBoostClassifier(DecisionTreeClassifier(max_depth=1),
                                   n_estimators=50, random_state=42)
}

# =======================
# 4. Train, Predict và Save
# =======================
for name, model in models.items():
    print("\n==========================================")
    print(f"Đang huấn luyện mô hình: {name}")
    
    # Train trên 6 feature gốc sau SMOTE-Tomek
    model.fit(X_train_resampled, y_train_resampled)
    
    # Predict trên X_test_scaled (6 feature gốc)
    y_pred = model.predict(X_test_scaled)
    
    acc = accuracy_score(y_test, y_pred)
    print(f"Accuracy trên tập Test: {acc:.4f}")
    print(classification_report(y_test, y_pred))
    
    # Save model
    model_path = MODEL_PATHS[name]
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    print(f"Mô hình '{name}' đã được lưu tại: {model_path}")
