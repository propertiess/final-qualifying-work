from flask_cors import CORS
from flask import Flask, request, jsonify
import os

from services.predict.predict import Predict


app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']
    type = request.args.get('type')

    if type == 'moving-average':
        response = Predict.by_moving_average(file)
    elif type == 'linear-regression':
        response = Predict.by_linear_regression(file)
    elif type == 'ffnn':
        response = Predict.by_ffnn(file)
    elif type == 'rnn':
        response = Predict.by_rnn(file)
    elif type == 'cnn':
        response = Predict.by_cnn(file)

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=False, port=os.getenv("PORT", default=5000))
