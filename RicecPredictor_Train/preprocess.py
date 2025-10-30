import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import pickle

from config import DATA_PATH, TARGET_COLUMN, FEATURE_COLUMNS, DATA_OUTPUT, FEATURES_PATH, DESCRIPTION_PATH
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
        return None  # Nếu giá trị là NaN, trả về None
    if isinstance(val, str):
        # Dùng regex để loại bỏ tất cả ký tự không phải chữ số, dấu chấm hoặc dấu trừ
        cleaned = re.sub(r'[^\d.-]', '', val)
        if cleaned == '' or cleaned == '-':
            return None  # Nếu sau khi làm sạch còn trống hoặc chỉ có dấu '-', trả về None
        # Xử lý trường hợp có nhiều dấu chấm, giữ phần trước dấu chấm thứ hai
        parts = cleaned.split('.')
        if len(parts) > 2:
            cleaned = parts[0] + '.' + ''.join(parts[1:])
        try:
            return float(cleaned)  # Chuyển sang số thực
        except:
            return None
    return val  # Nếu giá trị không phải chuỗi, giữ nguyên


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
    data.info()  # In thông tin cơ bản của dataset

    # 2. Chuẩn hóa nhãn (Class)
    print("\nNHÃN TRƯỚC KHI XỬ LÝ:")
    print(data[TARGET_COLUMN].unique())
    
    # Chuẩn hóa nhãn: Chuyển về chữ in hoa và xoá khoảng trắng
    data[TARGET_COLUMN] = data[TARGET_COLUMN].apply(clean_label)

    print("\nNHÃN SAU KHI CHUẨN HÓA:")
    print(data[TARGET_COLUMN].unique())
    print("\nSố lượng mỗi nhãn:")
    print(data[TARGET_COLUMN].value_counts())

    # 3. Xóa các cột không cần thiết
    cols_to_drop = ['Id', 'Nickname']
    data.drop(columns=[col for col in cols_to_drop if col in data.columns], inplace=True)

    # 4. Làm sạch dữ liệu số
    for col in data.columns:
        if col in FEATURE_COLUMNS:
            data[col] = data[col].apply(clean_number)

    # 5. Kiểm tra và xử lý tương quan giữa Convex_Area và Convex_Area_2 (nếu có)
    if "Convex_Area" in data.columns and "Convex_Area_2" in data.columns:
        corr = data["Convex_Area"].corr(data["Convex_Area_2"])
        print(f"Tương quan Convex_Area vs Convex_Area_2: {corr:.2f}")
        if corr > 0.9:
            data.drop(columns="Convex_Area_2", inplace=True)
            if "Convex_Area_2" in FEATURE_COLUMNS:
                FEATURE_COLUMNS.remove("Convex_Area_2")
            print("Đã loại bỏ 'Convex_Area_2' do tương quan cao với 'Convex_Area'.")

    # 6. Xử lý giá trị thiếu bằng SimpleImputer (sử dụng phương pháp 'mean')
    imputer = SimpleImputer(strategy='mean')
    data[FEATURE_COLUMNS] = imputer.fit_transform(data[FEATURE_COLUMNS])

    # 7. Kiểm tra tính đầy đủ của các cột đặc trưng
    missing_cols = [col for col in FEATURE_COLUMNS if col not in data.columns]
    if missing_cols:
        print(f"Lỗi: Thiếu cột trong dữ liệu: {missing_cols}")
        return

    # 8. Tách đặc trưng (X) và nhãn (y)
    X = data[FEATURE_COLUMNS]
    y = data[TARGET_COLUMN]

    # 9. Mã hóa nhãn (C, O) → (0, 1)
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)

    # 10. Trực quan hóa phân bố lớp
    plt.figure(figsize=(8, 6))  
    ax = sns.countplot(x=y_encoded, hue=y_encoded, palette=["#FA731E", "#0044D5"], legend=False)
    for p in ax.patches:
        height = p.get_height()  
        x = p.get_x() + p.get_width() / 2  
        y = p.get_height()  
        ax.annotate(f'{int(height)}',  
                    (x, y), 
                    ha='center', va='bottom', fontsize=10, 
                    xytext=(0, 6), textcoords='offset points')  
    plt.title("Phân bố lớp sau mã hóa", fontsize=14, fontweight='bold')
    plt.xlabel("Class - Nhãn", fontsize=12)
    plt.ylabel("Số lượng mẫu", fontsize=12)
    plt.xticks(fontsize=11)
    plt.yticks(fontsize=11)
    plt.tight_layout() 
    # Lưu và hiển thị
    plt.savefig("class_distribution.png")
    plt.close()

    # 11. Chia dữ liệu thành train/test
    X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

    # 12. Chuẩn hóa dữ liệu đầu vào
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # 13. Gộp lại và lưu dữ liệu
    data_processed = pd.concat([pd.DataFrame(X_train_scaled, columns=FEATURE_COLUMNS), 
                                pd.Series(y_train, name=TARGET_COLUMN)], axis=1)

    # Lưu dữ liệu đã xử lý vào file
    with open(DATA_OUTPUT, 'wb') as f:
        pickle.dump(data_processed, f)

    with open(FEATURES_PATH, 'wb') as f:
        pickle.dump(FEATURE_COLUMNS, f)

    with open(DESCRIPTION_PATH, 'wb') as f:
        pickle.dump(X.describe(), f)

    print("Dữ liệu đã được xử lý và lưu thành công!")


if __name__ == "__main__":
    main()
