from flask import Blueprint, request, jsonify
from sklearn.tree import export_text
import pickle, os

from models import decision_tree_model
from utils.extract import extract_features, wrap_with_column_names

dt_route = Blueprint("dt_route", __name__)

# ===== Load scaler trực tiếp từ thư mục models =====
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # thư mục routes/
SCALER_PATH = os.path.join(BASE_DIR, "..", "models", "scaler.pkl")

if os.path.exists(SCALER_PATH):
    with open(SCALER_PATH, "rb") as f:
        scaler = pickle.load(f)
    print(f"[INFO] Scaler loaded from {SCALER_PATH}")
else:
    scaler = None
    print("[WARNING] Scaler not found! Predictions sẽ không chuẩn hóa!")

@dt_route.route("/decision-tree", methods=["POST"])
def predict_decision_tree():
    try:
        # --- Nhận dữ liệu JSON từ frontend ---
        data = request.json
        features = extract_features(data)
        df = wrap_with_column_names(features)

        # --- Áp dụng StandardScaler nếu có ---
        if scaler is not None:
            df_scaled = scaler.transform(df)
        else:
            df_scaled = df.values

        # --- Dự đoán ---
        result = decision_tree_model.predict(df_scaled)[0]
        proba = decision_tree_model.predict_proba(df_scaled)[0]
        classes = decision_tree_model.classes_

        # --- Mapping xác suất theo thứ tự class ---
        prob_dict = {str(classes[i]): float(proba[i]) for i in range(len(classes))}

        # --- Mapping nhãn dự đoán ---
        predict_label = "Cammeo" if result == 0 else "Osmancik"

        # --- Xuất cấu trúc cây ---
        feature_names = df.columns.tolist()
        tree_text = export_text(decision_tree_model, feature_names=feature_names)

        importances_dict = {
            name: float(importance)
            for name, importance in zip(feature_names, decision_tree_model.feature_importances_)
        }

        # --- Trả kết quả ---
        return jsonify({
            "success": True,
            "message": "Dự đoán thành công",
            "data": {
                "model": "Decision Tree",
                "input": data,
                "prediction": predict_label,
                "probabilities": prob_dict,
                "hyperparameters": {
                    "criterion": decision_tree_model.criterion,
                    "max_depth": decision_tree_model.max_depth,
                    "min_samples_split": decision_tree_model.min_samples_split,
                    "min_samples_leaf": decision_tree_model.min_samples_leaf,
                },
                "tree_text": tree_text,
                "feature_importances": importances_dict,
            }
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "data": None,
            "message": str(e)
        }), 400
