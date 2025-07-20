import os
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

# Define absolute paths to video folders
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
LETTER_VIDEO_PATH = os.path.join(BASE_DIR, "videos", "letters")
WORD_VIDEO_PATH = os.path.join(BASE_DIR, "videos", "words")
NUMBER_VIDEO_PATH = os.path.join(BASE_DIR, "videos", "numbers")

@app.route('/process_text', methods=['POST'])
def process_text():
    data = request.json
    text = data.get('text', '').upper()  # Convert text to uppercase

    print(f"Received text: {text}")

    # Check for a matching word video
    word_video = f"{text}.mp4"
    if os.path.exists(os.path.join(WORD_VIDEO_PATH, word_video)):
        return jsonify({"status": "success", "video": f"/download_video/words/{word_video}"})

    # Check for individual letter videos
    video_paths = []
    for letter in text:
        letter_video = f"{letter}.mp4"
        if os.path.exists(os.path.join(LETTER_VIDEO_PATH, letter_video)):
            video_paths.append(f"/download_video/letters/{letter_video}")

    if not video_paths:
        return jsonify({"status": "error", "message": "No matching videos found for the input text."})

    return jsonify({"status": "success", "videos": video_paths})

@app.route('/download_video/<folder>/<filename>')
def download_video(folder, filename):
    folder_path = os.path.join(BASE_DIR, "videos", folder)
    return send_from_directory(folder_path, filename)

if __name__ == '__main__':
    app.run(debug=True)
