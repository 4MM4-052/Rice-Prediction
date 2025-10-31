import numpy as np
import pickle
import pandas as pd

def extract_features(data):
    try:
        return [
            data["area"],
            data["perimeter"],
            data["major_axis_length"],
            data["minor_axis_length"],
            data["eccentricity"],
            data["convex_area"],
            data["extent"]
        ]
    except KeyError as e:
        raise ValueError(f"Thiếu trường: {e.args[0]}")


# scaler = pickle.load(open("models/scaler.pkl", "rb"))

def scale_data(features):
    scaler = pickle.load(open("models/scaler.pkl", "rb"))

    FEATURE_COLUMNS = [
        "Area",
        "Perimeter",
        "Major_Axis_Length",
        "Minor_Axis_Length",
        "Eccentricity",
        "Convex_Area",
        "Extent"
    ]

    df = pd.DataFrame([features], columns=FEATURE_COLUMNS)

    # print("DEBUG DataFrame:", df)
    # print("SHAPE:", df.shape)

    return scaler.transform(df)

def wrap_with_column_names(features):
    FEATURE_COLUMNS = [
        "Area",
        "Perimeter",
        "Major_Axis_Length",
        "Minor_Axis_Length",
        "Eccentricity",
        "Convex_Area",
        "Extent"
    ]
    return pd.DataFrame([features], columns=FEATURE_COLUMNS)