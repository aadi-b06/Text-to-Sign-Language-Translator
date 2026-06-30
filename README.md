# Text-to-Sign-Language Translator 🤟

A real-time system that translates English text into Indian Sign Language (ISL) gestures, built to make digital communication more accessible for the hearing-impaired community.

This project formed the basis of a peer-reviewed paper presented at **SciTePress ICRDICCT '25**.

## Overview

The translator takes English text as input and maps it to corresponding ISL signs, rendering them through pre-recorded gesture clips so a hearing-impaired user can visually follow the translated message in real time.

Key highlights:
- Recognizes and translates **80+ ISL words**
- Built on a custom-trained **CNN model** for gesture classification
- Automated pipeline assembled from **100+ sign video clips**
- Web-based interface for real-time text input and sign playback

## How It Works

1. **Text Input** — User enters English text through the web interface.
2. **Text Processing** — Input is parsed and mapped to known ISL vocabulary.
3. **Gesture Lookup** — Each recognized word/phrase is matched to its corresponding sign clip from the trained dataset.
4. **CNN-Based Recognition** — A convolutional neural network, trained on the ISL gesture dataset, handles gesture classification and validation.
5. **Animated Output** — Matched sign clips are played back sequentially, producing a fluid sign-language animation for the input text.

## Tech Stack

- **Python** — core logic, CNN model training and inference
- **HTML / CSS / JavaScript** — front-end interface for text input and video playback
- **OpenCV / Deep Learning libraries** — gesture data processing and CNN pipeline

## Project Structure

```
Text-to-Sign-Language-Translator/
├── Project/        # Core application logic and trained model files
├── Videos/         # ISL gesture video clips used for translation output
├── asep.html       # Main web interface
├── asep.js         # Front-end logic for text-to-sign mapping
├── asep1.html      # Secondary interface page
└── README.md
```

## Getting Started

### Prerequisites
- Python 3.8+
- pip

### Installation

```bash
git clone https://github.com/aadi-b06/Text-to-Sign-Language-Translator.git
cd Text-to-Sign-Language-Translator
pip install -r requirements.txt
```

### Running the project

```bash
# Run the core translation script
python Project/main.py
```

Then open `asep.html` in your browser to use the web interface.

## Research Publication

This work is documented in:

**"English Text to Indian Sign Language Translation"** — SciTePress, ICRDICCT '25

The paper covers the dataset construction, CNN architecture, and evaluation methodology behind the gesture recognition pipeline in more detail.

## Future Improvements

- Expand vocabulary beyond 80+ words toward full ISL coverage
- Move from clip-based playback to real-time 3D avatar animation
- Add speech-to-sign support (voice input → ISL)
- Deploy as a hosted web app for public use

## Author

**Aadi Bhangdiya**
[LinkedIn](https://www.linkedin.com/in/aadi-bhangdiya/) · [GitHub](https://github.com/aadi-b06)

---

*If you find this project useful, consider giving it a ⭐*
