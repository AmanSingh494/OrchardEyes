from flask import Flask, request, jsonify, send_file
from auth import generate_token, token_required
from ai.server.utils.utils import log_request_info, allowed_file
from ai.models.image_processing.yolo_detections.plant_part_detect import get_predictions_with_annotations
import io
from ai.models.image_processing.ocr_tesseract import SoilHealthOCR
app = Flask(__name__)

# Health Check
@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'API is running'}), 200

# Login Endpoint (Simple Auth for demonstration)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username == 'admin' and password == 'password':  # Dummy auth
        token = generate_token(user_id=username)
        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

# Prediction Endpoint (JWT Protected)
@app.route('/predict', methods=['POST'])
@token_required
def predict(current_user):
    log_request_info(request)

    if 'image' not in request.files:
        return jsonify({'message': 'No image provided'}), 400

    file = request.files['image']

    if file and allowed_file(file.filename):
        image_bytes = file.read()
        predictions, annotated_image_bytes = get_predictions_with_annotations(image_bytes)

        return jsonify({
            'user': current_user,
            'predictions': predictions
        }), 200
    else:
        return jsonify({'message': 'Invalid file format'}), 400

# Endpoint to download annotated image
@app.route('/download', methods=['POST'])
@token_required
def download(current_user):
    log_request_info(request)

    if 'image' not in request.files:
        return jsonify({'message': 'No image provided'}), 400

    file = request.files['image']

    if file and allowed_file(file.filename):
        image_bytes = file.read()
        _, annotated_image_bytes = get_predictions_with_annotations(image_bytes)

        return send_file(
            io.BytesIO(annotated_image_bytes),
            mimetype='image/jpeg',
            as_attachment=True,
            download_name='annotated_image.jpg'
        )
    else:
        return jsonify({'message': 'Invalid file format'}), 400


# OCR Processing for Soil Health Reports
@app.route('/process-soil-report', methods=['POST'])
@token_required
def process_soil_report(current_user):
    log_request_info(request)

    if 'image' not in request.files:
        return jsonify({'message': 'No image provided'}), 400

    file = request.files['image']

    if file and allowed_file(file.filename):
        image_path = f"/tmp/{file.filename}"
        file.save(image_path)

        json_data = SoilHealthOCR.process_image(image_path)

        return jsonify({
            'user': current_user,
            'soil_health_data': json_data
        }), 200
    else:
        return jsonify({'message': 'Invalid file format'}), 400
    

# Initialize chatbot
# chatbot = initialize_chatbot(index_name="apple-chatbot", k=2)

# @app.route("/ask", methods=["POST"])
# def ask():
#     try:
#         data = request.json
#         query = data.get("query")
        
#         if not query:
#             return jsonify({"error": "Query is required"}), 400
        
#         # Get response from chatbot
#         result = chatbot.ask(query)
#         return jsonify(result), 200
    
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
