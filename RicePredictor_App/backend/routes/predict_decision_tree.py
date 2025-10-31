from flask import Blueprint, request, jsonify
from sklearn.tree import export_text

from models import decision_tree_model
from utils.extract import extract_features, wrap_with_column_names

dt_route = Blueprint("dt_route", __name__)

@dt_route.route("/decision-tree", methods=["POST"])
def predict_decision_tree():
    try:
        data = request.json
        features = extract_features(data)
        df = wrap_with_column_names(features)
        result = decision_tree_model.predict(df)[0]

        proba = decision_tree_model.predict_proba(df)[0]
        classes = decision_tree_model.classes_

        prob_dict = {
            "Cammeo": float(proba[0]),
            "Osmancik": float(proba[1])
        } if classes[0] == 0 else {
            "Osmancik": float(proba[0]),
            "Cammeo": float(proba[1])
        }

        predict = "Cammeo" if result == 0 else "Osmancik"

        feature_names = df.columns.tolist()
        tree_text = export_text(decision_tree_model, feature_names=feature_names)

        feature_importances = decision_tree_model.feature_importances_

        importances_dict = {
            name: float(importance)
            for name, importance in zip(feature_names, feature_importances)
        }

        return jsonify({
            "success": True,
            "message": "Dự đoán thành công",
            "data": {
                "model": "Decision Tree",
                "input": data,
                "prediction": predict,
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