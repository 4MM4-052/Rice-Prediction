from flask import Blueprint, request, jsonify
from models import knn_model
from utils.extract import extract_features, scale_data

knn_route = Blueprint("knn_route", __name__)

@knn_route.route("/k-nearest-neighbors", methods=["POST"])
def predict_knn():
    try:
        data = request.json

        features = extract_features(data)
        features = scale_data(features)

        result = knn_model.predict(features)[0]
        proba = knn_model.predict_proba(features)[0]

        # predict = "O" if result == 1 else "C"

        distances, indices = knn_model.kneighbors(features, n_neighbors=knn_model.n_neighbors)
        neighbors = []
        for i in range(len(indices[0])):
            label = knn_model.classes_[knn_model._y[indices[0][i]]]
            neighbors.append({
                "label": "Osmancik" if label == 1 else "Cammeo",
                "distance": round(float(distances[0][i]), 4)
            })

        return jsonify({
            "success": True,
            "message": "Dự đoán thành công",
            "data": {
                "model": "K-Nearest Neighbors",
                "input": data,
                "prediction": "Osmancik" if result == 1 else "Cammeo",
                "probabilities": {
                    "Cammeo": round(float(proba[0]), 4),
                    "Osmancik": round(float(proba[1]), 4)
                },
                "neighbors": neighbors,
                "hyperparameters": {
                    "n_neighbors": knn_model.n_neighbors,
                    "weights": knn_model.weights,
                    "metric": knn_model.metric
                },
                "training_samples": len(knn_model._fit_X),
            }
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "data": None,
            "message": str(e)
        }), 400