from flask import Blueprint

from .predict_knn import knn_route
from .predict_navie_bayes import navie_bayes_route
from .predict_logistic_regression import logistic_regression_route
from .predict_rf import rf_route
from .predict_decision_tree import dt_route
from .predict_mlp import mlp_route
from .predict_svm import svm_route
from .predict_adaboost import adaboost_route

def register_router(app):
    # app.register_blueprint(knn_route)
    # app.register_blueprint(navie_bayes_route)

    api_v1 = Blueprint("api_v1", __name__, url_prefix="/api/v1")

    # Gắn các route con vào blueprint gốc
    api_v1.register_blueprint(knn_route, url_prefix="/predict")
    api_v1.register_blueprint(navie_bayes_route, url_prefix="/predict")
    api_v1.register_blueprint(dt_route, url_prefix="/predict")
    api_v1.register_blueprint(rf_route, url_prefix="/predict")
    api_v1.register_blueprint(svm_route, url_prefix="/predict")
    api_v1.register_blueprint(mlp_route, url_prefix="/predict")
    api_v1.register_blueprint(logistic_regression_route, url_prefix="/predict")
    api_v1.register_blueprint(adaboost_route, url_prefix="/predict")

    app.register_blueprint(api_v1)