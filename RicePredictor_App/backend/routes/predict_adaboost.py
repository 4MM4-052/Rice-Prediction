from flask import Blueprint, request, jsonify
from models import adaboost_model
from utils.extract import extract_features, wrap_with_column_names

adaboost_route = Blueprint("adaboost_route", __name__)

@adaboost_route.route("/adaboost", methods=["POST"])
def predict_adaboost():
    try:
        data = request.json
        features = extract_features(data)
        df = wrap_with_column_names(features)
        result = adaboost_model.predict(df)[0]

        predict = "Cammeo" if result == 0 else "Osmancik"

        proba = adaboost_model.predict_proba(df)[0]
        classes = adaboost_model.classes_
        prob_dict = (
            {"Cammeo": float(proba[0]), "Osmancik": float(proba[1])}
            if classes[0] == 0
            else {"Osmancik": float(proba[0]), "Cammeo": float(proba[1])}
        )

        feature_names = [
            "Area", "Perimeter", "Major_Axis_Length",
            "Minor_Axis_Length", "Eccentricity", "Convex_Area","Extent"
        ]
        importances = adaboost_model.feature_importances_
        feature_importance_dict = {
            feature: float(imp)
            for feature, imp in zip(feature_names, importances)
        }

        # Lấy hyperparameters
        hyperparameters = {
            "algorithm": adaboost_model.algorithm,
            "learning_rate": adaboost_model.learning_rate,
            "n_estimators": adaboost_model.n_estimators
        }

        return jsonify({
            "success": True,
            "data": {
                "model": "AdaBoost",
                "input": data,
                "prediction": predict,
                "probabilities": prob_dict,
                "hyperparameters": hyperparameters,
                "feature_importances": feature_importance_dict
            },
            "message": "Dự đoán thành công"
        }), 200

    except Exception as e:
            return jsonify({
                "success": False,
                "data": None,
                "message": str(e)
            }), 400