from flask import Flask, request, jsonify, make_response
import pandas as pd
import pickle

app = Flask(__name__)

def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/predict', methods=['OPTIONS'])
def handle_options():
    response = make_response()
    return add_cors_headers(response)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        query_df = pd.DataFrame([data])
        prediction = model.predict(query_df)
        rounded_prediction = round(prediction[0])
        
        response = make_response(jsonify({'Prediction': rounded_prediction}))
        return add_cors_headers(response)
    except Exception as e:
        response = make_response(jsonify({'error': str(e)}), 400)
        return add_cors_headers(response)

# Load the model
model = pickle.load(open('ml_model.pkl', 'rb'))

if __name__ == '__main__':
    # Make sure no other process is using port 5000
    app.run(debug=True, port=5000)