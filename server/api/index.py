from flask_cors import CORS
from flask import Flask, request, jsonify
import os
import sys

sys.path.insert(1, os.path.join(sys.path[0], '..'))
from services.predict import get_predict_by_moving_average, get_predict_by_linear_regression


app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']

    # get query
    print(request.args.get('type'))

    if request.args.get('type') == 'moving-average':
        response = get_predict_by_moving_average(file)
    else:
        response = get_predict_by_linear_regression(file)

    return jsonify(response)
