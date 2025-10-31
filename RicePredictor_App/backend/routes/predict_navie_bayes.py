from flask import Blueprint, request, jsonify
from models import naive_bayes_model
from utils.extract import extract_features, wrap_with_column_names

navie_bayes_route = Blueprint("navie_bayes_route", __name__)

@navie_bayes_route.route("/naive-bayes", methods=["POST"])
def predict_navie_bayes():
    try:
        data = request.json
        features = extract_features(data)
        df = wrap_with_column_names(features)
        
        result = naive_bayes_model.predict(df)[0]
        
        probabilities = naive_bayes_model.predict_proba(df)[0]
        classes = naive_bayes_model.classes_
        
        # Xác suất tiên nghiệm (class prior)
        class_priors = naive_bayes_model.class_prior_

        # Mapping lớp 0 và 1 về tên Cammeo/Osmancik
        label_map = {0: "Cammeo", 1: "Osmancik"}

        prob_dict = {
            label_map[cls]: float(prob)
            for cls, prob in zip(classes, probabilities)
        }

        prior_dict = {
            label_map[cls]: float(prior)
            for cls, prior in zip(classes, class_priors)
        }

        return jsonify({
            "success": True,
            "message": "Dự đoán thành công",
            "data": {
                "model": "Naive Bayes",
                "input": data,
                "prediction": label_map[result],
                "probabilities": prob_dict,
                "prior_probabilities": prior_dict,
                "var_smoothing": naive_bayes_model.var_smoothing,
                "training_samples": int(naive_bayes_model.class_count_.sum())
            }
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "data": None,
            "message": str(e)
        }), 400