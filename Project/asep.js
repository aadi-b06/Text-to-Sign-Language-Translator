// Speech recognition button logic (unchanged)
document.getElementById('speechButton').addEventListener('click', function() {
    alert("Real-time speech recognition started!");
    // Call your Python backend to handle speech recognition
});

// Text input button logic (unchanged)
document.getElementById('textButton').addEventListener('click', function() {
    document.getElementById('textInput').classList.remove('hidden');
});

document.getElementById('submitText').addEventListener('click', async function () {
    const userInput = document.getElementById('userInput').value.toUpperCase(); // Get user input
    const videoContainer = document.getElementById('output'); // Container for video output
    const outputVideo = document.getElementById('outputVideo'); // Output video element
    const loader = document.getElementById('loader'); // Loader element
    videoContainer.classList.add('hidden'); // Hide the video container initially
    loader.classList.remove('hidden'); // Show the loader

    if (!userInput) {
        alert('Please enter some text!');
        loader.classList.add('hidden'); // Hide loader if no input is provided
        return;
    }

    try {
        // Send the input text to the Flask API
        const response = await fetch('http://127.0.0.1:5000/process_text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: userInput }) // Send input text as JSON
        });

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); // Parse the JSON response

        if (data.status === 'success') {
            alert('Video processed successfully!');
            loader.classList.add('hidden'); // Hide loader
            videoContainer.classList.remove('hidden'); // Show video container
            outputVideo.src = `http://127.0.0.1:5000/download_video`; // Set video source
            outputVideo.autoplay = true;
            outputVideo.controls = true;
        } else {
            alert(`Error: ${data.message}`);
            loader.classList.add('hidden'); // Hide loader
        }
    } catch (error) {
        console.error('Error occurred:', error);
        loader.classList.add('hidden'); // Hide loader
        alert('An error occurred while processing your request.');
    }
});


// Speech recognition button logic (unchanged)
document.getElementById('speechButton').addEventListener('click', function() {
    alert("Real-time speech recognition started!");
    // Call your Python backend to handle speech recognition
});

// Text input button logic (unchanged)
document.getElementById('textButton').addEventListener('click', function() {
    document.getElementById('textInput').classList.remove('hidden');
});

// Submit button logic for sending input to Flask
document.getElementById('submitText').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    const videoContainer = document.getElementById('output');
    const outputVideo = document.getElementById('outputVideo');
    const loader = document.getElementById('loader'); // Add a loader element in your HTML
    const backendUrl = '/process_text'; // Update this to match your backend's base URL

    if (userInput) {
        alert("Processing input: " + userInput);

        // Show the loading spinner
        loader.classList.remove('hidden');

        // Send the input text to the Flask backend
        fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: userInput }) // Sending text as JSON to the Flask backend
        })
        .then(response => {
            // Check for HTTP errors
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            loader.classList.add('hidden'); // Hide the loading spinner

            if (data.status === 'success') {
                // If the video is successfully created, update the video source
                videoContainer.classList.remove('hidden');
                outputVideo.src = '/download_video'; // Flask endpoint for video download
                outputVideo.play(); // Autoplay the video when loaded
            } else {
                // Display an error message if the backend returns an error
                alert("Error: " + data.message);
            }
        })
        .catch(error => {
            loader.classList.add('hidden'); // Hide the loading spinner
            console.error('Error:', error);
            alert("An error occurred while processing your request.");
        });
    } else {
        alert("Please enter some text.");
    }
});

