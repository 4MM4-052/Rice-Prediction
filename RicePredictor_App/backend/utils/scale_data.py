import pickle
import pandas as pd

scaler = pickle.load(open("models/scaler.pkl", "rb"))

FEATURE_COLUMNS = [
    "area",
    "perimeter",
    "major_axis_length",
    "minor_axis_length",
    "eccentricity",
    "convex_area",
    "extent"
]


def scale_data(features):
    # Đảm bảo đúng DataFrame đầu vào với tên cột
    df = pd.DataFrame([features], columns=FEATURE_COLUMNS)
    return scaler.transform(df)

# def scale_data(features):
#     return scaler.transform(features)