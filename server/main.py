from flask_cors import CORS
from flask import Flask, request, jsonify
import os

from services.predict import get_predict_by_moving_average, get_predict_by_linear_regression


app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']

    if request.args.get('type') == 'moving-average':
        response = get_predict_by_moving_average(file)
    else:
        response = get_predict_by_linear_regression(file)

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=False, port=os.getenv("PORT", default=5000))
