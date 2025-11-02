import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pickle
import re
import os

from scipy.stats import entropy
from config import DATA_PATH, TARGET_COLUMN, FEATURE_COLUMNS, DATA_OUTPUT, FEATURES_PATH, DESCRIPTION_PATH, SCALER_PATH
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split

save_dir = "RicecPredictor_Train/machine_learning/"

def clean_label(x):
    """Chuẩn hóa nhãn: Xóa khoảng trắng và chuyển về chữ in hoa"""
    x = str(x).strip()
    x = x.strip("'\"")
    return x.upper()

def clean_number(val):
    """Làm sạch giá trị số bị lỗi"""
    if pd.isna(val):
        return None
    if isinstance(val, str):
        cleaned = re.sub(r'[^\d.-]', '', val)
        if cleaned == '' or cleaned == '-':
            return None
        parts = cleaned.split('.')
        if len(parts) > 2:
            cleaned = parts[0] + '.' + ''.join(parts[1:])
        try:
            return float(cleaned)
        except:
            return None
    return val

def main():
    print(f"Đang tải dữ liệu từ {DATA_PATH}")
    try:
        data = pd.read_excel(DATA_PATH)
        print("Tải dữ liệu thành công!")
    except Exception as e:
        print(f"Lỗi khi tải dữ liệu: {e}")
        return

    # ===============================
    # 1. Chuẩn hóa nhãn (Class)
    # ===============================
    data[TARGET_COLUMN] = data[TARGET_COLUMN].apply(clean_label)
    data[TARGET_COLUMN] = data[TARGET_COLUMN].replace({'C': 'C', 'O': 'O', 'c': 'C', 'o': 'O'})

    # ===============================
    # 2. Xóa cột không cần thiết
    # ===============================
    cols_to_drop = ['Id', 'Nickname']
    data.drop(columns=[col for col in cols_to_drop if col in data.columns], inplace=True)

    # ===============================
    # 3. Làm sạch dữ liệu số
    # ===============================
    for col in data.columns:
        if col in FEATURE_COLUMNS:
            data[col] = data[col].apply(clean_number)

    # ===============================
    # 4. Xử lý tương quan Convex_Area và Convex_Area_2
    # ===============================
    def calc_entropy(col):
        counts, _ = np.histogram(col.dropna(), bins=30)
        return entropy(counts, base=2)

    if "Convex_Area" in data.columns and "Convex_Area_2" in data.columns:
        corr = data["Convex_Area"].corr(data["Convex_Area_2"])
        print(f"Tương quan Convex_Area vs Convex_Area_2: {corr:.2f}")
        e1 = calc_entropy(data["Convex_Area"])
        e2 = calc_entropy(data["Convex_Area_2"])
        print(f"Entropy Convex_Area: {e1:.2f}")
        print(f"Entropy Convex_Area_2: {e2:.2f}")
        if corr > 0.95:
            drop_col = "Convex_Area_2" if e1 >= e2 else "Convex_Area"
            data.drop(drop_col, axis=1, inplace=True)
            if drop_col in FEATURE_COLUMNS:
                FEATURE_COLUMNS.remove(drop_col)
            print(f"Đã loại bỏ '{drop_col}' do tương quan cao và entropy thấp hơn.")
        else:
            print("Không có cặp cột nào cần loại bỏ (tương quan < 0.95).")

    # ===============================
    # 5. Xử lý missing value
    # ===============================
    imputer = SimpleImputer(strategy='mean')
    data[FEATURE_COLUMNS] = imputer.fit_transform(data[FEATURE_COLUMNS])

    # ===============================
    # 6. Xử lý ngoại lệ (IQR Clipping)
    # ===============================
    for col in FEATURE_COLUMNS:
        Q1 = data[col].quantile(0.25)
        Q3 = data[col].quantile(0.75)
        IQR = Q3 - Q1
        if IQR == 0: 
            continue
        lower = Q1 - 1.5 * IQR
        upper = Q3 + 1.5 * IQR
        data[col] = np.clip(data[col], lower, upper)

    # ===============================
    # 7. Chuẩn bị X và y
    # ===============================
    X = data[FEATURE_COLUMNS].copy()
    y = data[TARGET_COLUMN].copy()

    # ===============================
    # 8. Chắc chắn loại bỏ cột Convex_Area trước train
    # ===============================
    if 'Convex_Area' in X.columns:
        X.drop('Convex_Area', axis=1, inplace=True)
        if 'Convex_Area' in FEATURE_COLUMNS:
            FEATURE_COLUMNS.remove('Convex_Area')
        print("Đã loại bỏ cột 'Convex_Area' trước khi huấn luyện.")

    # ===============================
    # 9. Mã hóa nhãn
    # ===============================
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)

    # ===============================
    # 10. Chia train/test
    # ===============================
    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, test_size=0.2, random_state=42
    )

    # ===============================
    # 11. Chuẩn hóa dữ liệu
    # ===============================
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # ===============================
    # 12. Lưu scaler và dữ liệu pickle
    # ===============================
    os.makedirs(save_dir, exist_ok=True)

    with open(SCALER_PATH, 'wb') as f:
        pickle.dump(scaler, f)

    data_processed = pd.concat([
        pd.DataFrame(X_train_scaled, columns=X.columns),
        pd.Series(y_train, name=TARGET_COLUMN)
    ], axis=1)

    with open(DATA_OUTPUT, 'wb') as f:
        pickle.dump(data_processed, f)

    with open(FEATURES_PATH, 'wb') as f:
        pickle.dump(list(X.columns), f)

    with open(DESCRIPTION_PATH, 'wb') as f:
        pickle.dump(X.describe(), f)

    pd.DataFrame(X_test_scaled, columns=X.columns).to_pickle(os.path.join(save_dir, "X_test_scaled.pkl"))
    pd.Series(y_test, name=TARGET_COLUMN).to_pickle(os.path.join(save_dir, "y_test.pkl"))

    print("\nDữ liệu đã được xử lý và lưu thành công!")

if __name__ == "__main__":
    main()
