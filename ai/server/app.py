from flask import Flask, request, jsonify, send_file
from auth import generate_token, token_required
from ai.server.utils.utils import log_request_info, allowed_file
from plant_part_detect import get_predictions_with_annotations
import io

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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
