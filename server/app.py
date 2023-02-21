from flask import Flask, request,jsonify
from flask_cors import CORS
import pandas as pd

import get_predict_by_moving_average

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
  data = request.get_json()
  print(data)
  response = get_predict_by_moving_average('./dataset.xlsx')
  
  print(response['АО Ланит'])
  # print(response_data)

  json_response = {}
  for key, value in response.items():
    json_response[key] = value.to_json()
    
  return jsonify(json_response)

