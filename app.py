from flask import Flask, request, jsonify, send_from_directory
import os
import json
from datetime import datetime

app = Flask(__name__, static_folder='dist')

# Path to the data file (mirroring the PHP logic)
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'feedback.json')

# Ensure the data directory exists
os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)

@app.route('/ping')
def ping():
    return 'pong'

@app.route('/api/feedback', methods=['POST'])
def feedback():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'status': 'error', 'message': 'Invalid JSON'}), 400

        # Load existing feedback
        current_data = []
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, 'r') as f:
                try:
                    current_data = json.load(f)
                except json.JSONDecodeError:
                    current_data = []

        # Append new entry
        data['timestamp'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        data['ip'] = request.remote_addr
        current_data.append(data)

        # Save
        with open(DATA_FILE, 'w') as f:
            json.dump(current_data, f, indent=4)

        return jsonify({'status': 'success', 'message': 'Feedback received'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Serve static assets and cleaner URLs
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    
    # Clean URL support: if /about is requested, serve about.html
    html_path = path + ".html"
    if os.path.exists(os.path.join(app.static_folder, html_path)):
        return send_from_directory(app.static_folder, html_path)
    
    # Default to index.html
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    # Use environment port for deployment compatibility
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
