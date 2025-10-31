from flask import Blueprint, request, jsonify
from models import logistic_regression_model
from utils.extract import extract_features, scale_data

logistic_regression_route = Blueprint("logistic_regression_route", __name__)

@logistic_regression_route.route("/logistic-regression", methods=["POST"])
def predict_logistic_regression():
    try:
        data = request.json

        # B1: Trích xuất và scale
        features = extract_features(data)
        scaled_features = scale_data(features)

        # B2: Dự đoán nhãn
        result = logistic_regression_model.predict(scaled_features)[0]
        predict = "Cammeo" if result == 0 else "Osmancik"

        # B3: Xác suất dự đoán
        proba = logistic_regression_model.predict_proba(scaled_features)[0]
        classes = logistic_regression_model.classes_

        prob_dict = {
            "Cammeo": float(proba[0]),
            "Osmancik": float(proba[1])
        } if classes[0] == 0 else {
            "Osmancik": float(proba[0]),
            "Cammeo": float(proba[1])
        }

        # B4: Lấy tên đặc trưng thủ công (không dùng DataFrame)
        feature_names = [
            "Area", "Convex_Area","Eccentricity", "Extent",
            "Major_Axis_Length", "Minor_Axis_Length", "Perimeter"
        ]

        # B5: Hệ số đặc trưng
        coefs = logistic_regression_model.coef_[0]
        coef_dict = {
            feature: float(coef)
            for feature, coef in zip(feature_names, coefs)
        }

        intercept = logistic_regression_model.intercept_[0]

        # B6: Siêu tham số
        hyperparameters = {
            "C": logistic_regression_model.C,
            "penalty": logistic_regression_model.penalty,
            "solver": logistic_regression_model.solver
        }

        return jsonify({
            "success": True,
            "message": "Dự đoán thành công",
            "data": {
                "model": "Logistic Regression",
                "input": data,
                "prediction": predict,
                "probabilities": prob_dict,
                "hyperparameters": hyperparameters,
                "coefficients": coef_dict,
                "intercept": intercept,
            }
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "data": None,
            "message": str(e)
        }), 400
