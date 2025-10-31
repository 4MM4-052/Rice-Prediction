from flask import Blueprint, request, jsonify
from models import random_forest_model
from utils.extract import extract_features, wrap_with_column_names

rf_route = Blueprint("rf_route", __name__)

@rf_route.route("/random-forest", methods=["POST"])
def predict_rf():
    try:
        data = request.json
        features = extract_features(data)
        df = wrap_with_column_names(features)

        result = random_forest_model.predict(df)[0]

        probabilities = random_forest_model.predict_proba(df)[0]
        classes = random_forest_model.classes_

        prob_dict = {
            "Cammeo": float(probabilities[0]),
            "Osmancik": float(probabilities[1])
        } if classes[0] == 0 else {
            "Osmancik": float(probabilities[0]),
            "Cammeo": float(probabilities[1])
        }

        hyperparams = {
            "n_estimators": random_forest_model.n_estimators,
            "max_depth": random_forest_model.max_depth,
            "min_samples_split": random_forest_model.min_samples_split,
            "min_samples_leaf": random_forest_model.min_samples_leaf,
        }

        predict = "Cammeo" if result == 0 else "Osmancik"

        feature_importances = random_forest_model.feature_importances_
        feature_names = df.columns.tolist()

        importances_dict = {
            name: float(importance)
            for name, importance in zip(feature_names, feature_importances)
        }
        return jsonify({
            "success": True,
            "message": "Dự đoán thành công",
            "data": {
                "model": "Random Forest",
                "input": data,
                "prediction": predict,
                "probabilities": prob_dict,
                "hyperparameters": hyperparams,
                "feature_importances": importances_dict,
            }
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "data": None,
            "message": str(e)
        }), 400