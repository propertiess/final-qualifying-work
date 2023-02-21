from flask import Flask, request
from flask_cors import CORS
import json

import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
import get_predict_by_moving_average

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
  data = request.files['file']

  # get query
  print(request.args.get('type'))
  
  response = get_predict_by_moving_average(data)
  return json.dumps(response, default=str)
