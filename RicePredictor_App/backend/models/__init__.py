import pickle

knn_model = pickle.load(open("models/kNN.pkl", "rb"))
naive_bayes_model = pickle.load(open("models/Naive_Bayes.pkl", "rb"))
adaboost_model = pickle.load(open("models/AdaBoost.pkl", "rb"))
decision_tree_model = pickle.load(open("models/Decision_Tree.pkl", "rb"))
logistic_regression_model = pickle.load(open("models/Logistic_Regression.pkl", "rb"))
mlp_model = pickle.load(open("models/MLP.pkl", "rb"))
random_forest_model = pickle.load(open("models/Random_Forest.pkl", "rb"))
svm_model = pickle.load(open("models/SVM.pkl", "rb"))

# import joblib

# knn_model = joblib.load("models/kNN.pkl")
# naive_bayes_model = joblib.load("models/Naive_Bayes.pkl")
# adaboost_model = joblib.load("models/AdaBoost.pkl")
# decision_tree_model = joblib.load("models/Decision_Tree.pkl")
# logistic_regression_model = joblib.load("models/Logistic_Regression.pkl")
# mlp_model = joblib.load("models/MLP.pkl")
# random_forest_model = joblib.load("models/Random_Forest.pkl")
# svm_model = joblib.load("models/SVM.pkl")
