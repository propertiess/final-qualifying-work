import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS

sys.path.insert(1, os.path.join(sys.path[0], '../utils'))

import get_predict_by_moving_average

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
  data = request.files['file']

  # get query
  print(request.args.get('type'))
  
  response = get_predict_by_moving_average(data)

  json_response = {}
  for key, value in response.items():
    json_response[key] = value.to_json()
    
  return jsonify(json_response)