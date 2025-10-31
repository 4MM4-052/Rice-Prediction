from flask import Blueprint, request, jsonify
from models import svm_model
from utils.extract import extract_features, scale_data

svm_route = Blueprint("svm_route", __name__)

@svm_route.route("/support-vector-machine", methods=["POST"])
def predict_mpl():
    try:
        data = request.json

        features = extract_features(data)
        features = scale_data(features)

        result = svm_model.predict(features)[0]
        predict = "Cammeo" if result == 0 else "Osmancik"

        distance = svm_model.decision_function(features)[0]
        certainty_score = abs(distance)

        hyperparams = {
            "C": svm_model.C,
            "kernel": svm_model.kernel,
            "gamma": svm_model.gamma
        }

        support_info = {
            "total": len(svm_model.support_),
            "by_class": {
                "Cammeo": int(svm_model.n_support_[0]),
                "Osmancik": int(svm_model.n_support_[1]),
            },
            "indices": svm_model.support_.tolist()
        }

        return jsonify({
            "success": True,
            "message": "Dự đoán thành công",
            "data": {
                "model": "SVM (Support Vector Machine)",
                "input": data,
                "prediction": predict,
                "distance_to_boundary": distance,
                "certainty_score": certainty_score,
                "hyperparameters": hyperparams,
                "support_vectors": support_info
            }
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "data": None,
            "message": str(e)
        }), 400
