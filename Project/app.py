import os
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS  # ✅ Import Flask-CORS

app = Flask(__name__)
CORS(app)  # ✅ Enable CORS for all routes

# ✅ Define absolute paths to video folders inside ASEP 1\Project\Videos
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
VIDEO_BASE_PATH = os.path.join(BASE_DIR, "Videos")  # UPDATE THIS PATH

LETTER_VIDEO_PATH = os.path.join(VIDEO_BASE_PATH, "letters")
WORD_VIDEO_PATH = os.path.join(VIDEO_BASE_PATH, "words")
NUMBER_VIDEO_PATH = os.path.join(VIDEO_BASE_PATH, "numbers")

@app.route('/download_video/<filename>')
def download_video(filename):
    """Serve the requested video file"""
    filename = filename.upper() + ".mp4"  # Convert input to uppercase and add .mp4 extension

    # ✅ Check for word videos
    word_video = os.path.join(WORD_VIDEO_PATH, filename)
    if os.path.exists(word_video):
        return send_file(word_video, mimetype='video/mp4')

    # ✅ Check for letter videos
    letter_video = os.path.join(LETTER_VIDEO_PATH, filename)
    if os.path.exists(letter_video):
        return send_file(letter_video, mimetype='video/mp4')

    # ✅ Check for number videos
    number_video = os.path.join(NUMBER_VIDEO_PATH, filename)
    if os.path.exists(number_video):
        return send_file(number_video, mimetype='video/mp4')

    return jsonify({"status": "error", "message": "Video not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
