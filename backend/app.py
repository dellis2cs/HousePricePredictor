from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "*"}})

# Load the model
model = pickle.load(open('ml_model.pkl', 'rb'))

@app.route('/', methods=['GET'])
def get_data():
    return jsonify({"message": "API is Running"})

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        response = jsonify({"status": "CORS preflight check"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response

    try:
        data = request.get_json()
        query_df = pd.DataFrame([data])
        prediction = model.predict(query_df)
        rounded_prediction = round(prediction[0])
        
        response = jsonify({'Prediction': rounded_prediction})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    except Exception as e:
        response = jsonify({'error': str(e)})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

if __name__ == '__main__':
    app.run(debug=True, port=5000)
