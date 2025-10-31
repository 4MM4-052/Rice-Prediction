from flask import Blueprint, request, jsonify
from models import mlp_model
from utils.extract import extract_features, scale_data

mlp_route = Blueprint("mlp_route", __name__)

@mlp_route.route("/multilayer-perceptron", methods=["POST"])
def predict_mlp():
    try:
        data = request.json

        features = extract_features(data)
        features = scale_data(features)

        # Dự đoán lớp
        result = mlp_model.predict(features)[0]
        predict = "Cammeo" if result == 0 else "Osmancik"

        # Tính xác suất (nếu có)
        proba = mlp_model.predict_proba(features)[0]
        classes = mlp_model.classes_

        prob_dict = (
            {
                "Cammeo": float(proba[0]),
                "Osmancik": float(proba[1])
            }
            if classes[0] == 0 else
            {
                "Osmancik": float(proba[0]),
                "Cammeo": float(proba[1])
            }
        )

        # Xác định độ tin tưởng = xác suất cao nhất
        certainty_score = float(max(proba))

        # Thông số mô hình (hyperparameters)
        hyperparams = {
            "activation": mlp_model.activation,
            "alpha": mlp_model.alpha,
            "hidden_layer_sizes": mlp_model.hidden_layer_sizes,
            "learning_rate_init": mlp_model.learning_rate_init
        }

        return jsonify({
            "success": True,
            "message": "Dự đoán thành công",
            "data": {
                "model": "Multilayer Perceptron",
                "input": data,
                "prediction": predict,
                "probabilities": prob_dict,
                "certainty_score": certainty_score,
                "hyperparameters": hyperparams,
            }
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "data": None,
            "message": str(e)
        }), 400
