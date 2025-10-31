import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pickle

from config import DATA_PATH, TARGET_COLUMN, FEATURE_COLUMNS, DATA_OUTPUT, FEATURES_PATH, DESCRIPTION_PATH, SCALER_PATH
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import re


def clean_label(x):
    """Chuẩn hóa nhãn: Xóa khoảng trắng và chuyển về chữ in hoa"""
    x = str(x).strip()
    x = x.strip("'\"")
    return x.upper()


def clean_number(val):
    """Làm sạch giá trị số bị lỗi (ví dụ: '429,,,,0830078125')"""
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

    # 1. Thông tin dữ liệu
    print("\nThông tin về dataset:")

    # 2. Chuẩn hóa nhãn (Class)
    print("\n2. Chuẩn hóa nhãn (Class)...")
    data[TARGET_COLUMN] = data[TARGET_COLUMN].apply(clean_label)
    data[TARGET_COLUMN] = data[TARGET_COLUMN].replace({'C': 'C', 'O': 'O', 'c': 'C', 'o': 'O'})

    # 3. Xóa các cột không cần thiết
    cols_to_drop = ['Id', 'Nickname']
    data.drop(columns=[col for col in cols_to_drop if col in data.columns], inplace=True)

    # 4. Làm sạch dữ liệu số
    print("4. Làm sạch dữ liệu số...")
    for col in data.columns:
        if col in FEATURE_COLUMNS:
            data[col] = data[col].apply(clean_number)

    # 5. Xử lý tương quan Convex_Area và Convex_Area_2
    if "Convex_Area" in data.columns and "Convex_Area_2" in data.columns:
        corr = data["Convex_Area"].corr(data["Convex_Area_2"])
        if corr > 0.9:
            data.drop(columns="Convex_Area_2", inplace=True)
            if "Convex_Area_2" in FEATURE_COLUMNS:
                FEATURE_COLUMNS.remove("Convex_Area_2")
            print("- Đã loại bỏ 'Convex_Area_2' do tương quan cao.")

    # 6. Xử lý giá trị thiếu bằng SimpleImputer (sử dụng phương pháp 'mean')
    print("6. Xử lý giá trị thiếu (Impute Mean)...")
    imputer = SimpleImputer(strategy='mean')
    data[FEATURE_COLUMNS] = imputer.fit_transform(data[FEATURE_COLUMNS])

    # 6.5. Xử lý ngoại lệ (IQR Clipping) - BƯỚC QUAN TRỌNG
    print("6.5. Xử lý ngoại lệ bằng IQR Clipping...")
    for col in FEATURE_COLUMNS:
        Q1 = data[col].quantile(0.25)
        Q3 = data[col].quantile(0.75)
        IQR = Q3 - Q1
        
        if IQR == 0: 
            continue
            
        lower = Q1 - 1.5 * IQR
        upper = Q3 + 1.5 * IQR
        
        data[col] = np.clip(data[col], lower, upper)

    print("Hoàn thành xử lý ngoại lệ.")

    # 7. Tách đặc trưng (X) và nhãn (y)
    X = data[FEATURE_COLUMNS]
    y = data[TARGET_COLUMN]

    # 8. Mã hóa nhãn (C, O) → (0, 1)
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)

    # 9. Chia dữ liệu thành train/test
    X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

    # 10. Chuẩn hóa dữ liệu đầu vào (StandardScaler)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # 11. Gộp lại và lưu dữ liệu đã xử lý
    # Lưu SCALER vào file PICKLE (BƯỚC BẠN ĐANG THIẾU)
    print(f"Đang lưu StandardScaler tại: {SCALER_PATH}")
    with open(SCALER_PATH, 'wb') as f:
        pickle.dump(scaler, f)
    
    # Lưu dữ liệu training đã xử lý
    data_processed = pd.concat([
        pd.DataFrame(X_train_scaled, columns=FEATURE_COLUMNS), 
        pd.Series(y_train, name=TARGET_COLUMN)
    ], axis=1)

    with open(DATA_OUTPUT, 'wb') as f:
        pickle.dump(data_processed, f)

    # Lưu tập test và các file khác
    with open(FEATURES_PATH, 'wb') as f:
        pickle.dump(FEATURE_COLUMNS, f)

    with open(DESCRIPTION_PATH, 'wb') as f:
        pickle.dump(X.describe(), f)
    
    pd.DataFrame(X_test_scaled, columns=FEATURE_COLUMNS).to_pickle("X_test_scaled.pkl")
    pd.Series(y_test, name=TARGET_COLUMN).to_pickle("y_test.pkl")


    print("\nDữ liệu đã được xử lý và lưu thành công!")


if __name__ == "__main__":
    main()