from flask import Flask, request, jsonify
import runpy as np
from flask_cors import CORS
app = Flask(__name__)
CORS(app, origins="*")

@app.route('/api/v1/')
def hello_world():  # put application's code here
    return 'Hello World! Kết nối backend thành công'

# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.json
#     return jsonify({"prediction": data})

# import routes
from routes import register_router
register_router(app)
@app.route('/')
def home():
    return 'Đây là trang chủ (hoặc redirect sang frontend nếu cần)'

if __name__ == '__main__':
    app.run()