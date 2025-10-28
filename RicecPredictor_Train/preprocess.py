import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import pickle

from config import DATA_PATH, TARGET_COLUMN, FEATURE_COLUMNS, DATA_OUTPUT, FEATURES_PATH, DESCRIPTION_PATH
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder


def clean_label(x):
    x = str(x).strip()
    x = x.strip("'\"")
    return x.upper()


def clean_number(val):
    if isinstance(val, str):
        val = val.replace(',', '')
    try:
        return float(val)
    except:
        return None


def main():
    print(f"Đang tải dữ liệu từ {DATA_PATH}")
    try:
        data = pd.read_excel(DATA_PATH)
        print("Tải dữ liệu thành công!")
    except Exception as e:
        print(f"Lỗi khi tải dữ liệu: {e}")
        return

    # Chuẩn hóa tên lớp
    data[TARGET_COLUMN] = data[TARGET_COLUMN].apply(clean_label)

    # Xóa cột không cần thiết
    for col in ['Id', 'Nickname']:
        if col in data.columns:
            data.drop(columns=col, inplace=True)

    # Tách đặc trưng và nhãn
    X = data.drop(columns=TARGET_COLUMN)
    y = data[TARGET_COLUMN]

    # Làm sạch dữ liệu số
    for col in X.columns:
        X[col] = X[col].apply(clean_number)

    # Kiểm tra và xử lý tương quan giữa Convex_Area và Convex_Area_2
    if "Convex_Area" in X.columns and "Convex_Area_2" in X.columns:
        corr = X["Convex_Area"].corr(X["Convex_Area_2"])
        print("Hệ số tương quan giữa Convex_Area và Convex_Area_2:", round(corr, 2))
        if corr > 0.9:
            X.drop(columns="Convex_Area_2", inplace=True)
            if "Convex_Area_2" in FEATURE_COLUMNS:
                FEATURE_COLUMNS.remove("Convex_Area_2")
            print("Tương quan cao, đã bỏ 'Convex_Area_2'")
        else:
            print("Tương quan thấp, giữ lại cả hai cột.")

    # Xử lý giá trị thiếu
    imputer = SimpleImputer(strategy='mean')
    X = pd.DataFrame(imputer.fit_transform(X), columns=X.columns)

    # Kiểm tra xem tất cả các cột đặc trưng có tồn tại không
    missing_cols = [col for col in FEATURE_COLUMNS if col not in X.columns]
    if missing_cols:
        print(f"Lỗi: Thiếu cột trong dữ liệu: {missing_cols}")
        return

    # Chỉ giữ các cột cần thiết
    X = X[FEATURE_COLUMNS]

    # Mã hóa nhãn
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)

    # Trực quan hóa phân bố lớp
    sns.countplot(x=y_encoded, hue=y_encoded, palette="Set2", legend=False)
    plt.title("Phân bố lớp sau mã hóa")
    plt.xlabel("Mã lớp")
    plt.ylabel("Số lượng")
    plt.tight_layout()
    plt.savefig("class_distribution.png")
    plt.close()

    # Gộp lại để lưu
    data_processed = pd.concat([X, pd.Series(y_encoded, name=TARGET_COLUMN)], axis=1)

    # Lưu dữ liệu đã xử lý
    with open(DATA_OUTPUT, 'wb') as f:
        pickle.dump(data_processed, f)

    with open(FEATURES_PATH, 'wb') as f:
        pickle.dump(FEATURE_COLUMNS, f)

    with open(DESCRIPTION_PATH, 'wb') as f:
        pickle.dump(X.describe(), f)

    print("Dữ liệu đã được xử lý và lưu thành công.")


if __name__ == "__main__":
    main()
