import sys, os
from flask import Flask, request, jsonify
from flask_cors import CORS


sys.path.insert(1, os.path.join(sys.path[0], '..'))
from services.predict import get_predict_by_moving_average

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
  file = request.files['file']


  # get query
  print(request.args.get('type'))
  
  response = get_predict_by_moving_average(file)
  return jsonify(response)
