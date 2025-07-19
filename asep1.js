document.getElementById('translate-btn').addEventListener('click', async function () {
    const inputText = document.getElementById('input-text').value.toUpperCase(); // Get user input
    const videoContainer = document.getElementById('video-container'); // Container for displaying the final video
    videoContainer.innerHTML = ''; // Clear any previous video output

    if (!inputText) {
        alert('Please enter some text!');
        return;
    }

    const words = inputText.split(' '); // Split input into words
    const videoPaths = []; // Array to hold the paths of videos to combine

    for (const word of words) {
        const wordVideoPath = `videos/words/${word}.mp4`; // Check for word video
        if (await videoExists(wordVideoPath)) {
            videoPaths.push(wordVideoPath);
        } else if (!isNaN(word)) {
            // If the word is a number, check for videos of individual digits
            for (const digit of word) {
                const numberVideoPath = `videos/numbers/${digit}.mp4`;
                if (await videoExists(numberVideoPath)) {
                    videoPaths.push(numberVideoPath);
                } else {
                    console.error(`Video for number "${digit}" not found.`);
                }
            }
        } else {
            // If word video is not found, fallback to letter videos
            for (const letter of word) {
                const letterVideoPath = `videos/letters/${letter}.mp4`;
                if (await videoExists(letterVideoPath)) {
                    videoPaths.push(letterVideoPath);
                } else {
                    console.error(`Video for letter "${letter}" not found.`);
                }
            }
        }
    }
    

    if (videoPaths.length === 0) {
        alert('No videos found for the entered text!');
        return;
    }

    // Combine videos into one
    const combinedVideo = await createCombinedVideo(videoPaths);
    videoContainer.appendChild(combinedVideo); // Display the final combined video
});

/**
 * Checks if a video file exists by sending a HEAD request.
 * @param {string} url - The URL to the video file.
 * @returns {Promise<boolean>} True if the file exists, false otherwise.
 */
async function videoExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (err) {
        console.error(`Error checking video existence: ${url}`, err);
        return false;
    }
}

/**
 * Creates a single video combining all input video paths.
 * @param {string[]} videoPaths - Array of video paths to combine.
 * @returns {Promise<HTMLVideoElement>} The combined video element.
 */
async function createCombinedVideo(videoPaths) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const outputVideo = document.createElement('video');
    const tempVideos = videoPaths.map(createVideoElement); // Create video elements

    // Wait for the first video to load to set canvas dimensions
    const firstVideo = tempVideos[0];
    await loadVideo(firstVideo);
    canvas.width = firstVideo.videoWidth;
    canvas.height = firstVideo.videoHeight;

    // Create a MediaRecorder to capture canvas output
    const stream = canvas.captureStream();
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        outputVideo.src = URL.createObjectURL(blob);
        outputVideo.controls = true; // Add playback controls
        outputVideo.autoplay = true; // Autoplay video
       /*  outputVideo.style.width = '100%'; */
       outputVideo.style.width = '50%'; // Adjust width to 50% of the container
outputVideo.style.height = 'auto'; // Maintain aspect ratio
outputVideo.style.maxHeight = '800px'; // Limit the maximum height
outputVideo.style.margin = '0 auto'; // Center the video horizontally
outputVideo.style.display = 'block'; // Ensure proper centering
outputVideo.style.border = '2px solid #ccc'; // Optional: Add a border for better visibility
outputVideo.style.borderRadius = '8px'; // Optional: Add rounded corners

    };

    mediaRecorder.start();

    // Play each video and draw it onto the canvas
    for (const video of tempVideos) {
        await playVideoOnCanvas(video, canvas, ctx);
    }

    mediaRecorder.stop();
    return outputVideo;
}

/**
 * Creates a video element for a given path.
 * @param {string} src - The video path.
 * @returns {HTMLVideoElement} The video element.
 */
function createVideoElement(src) {
    const video = document.createElement('video');
    video.src = src;
    video.crossOrigin = 'anonymous'; // Avoid CORS issues
    video.muted = true;
    return video;
}

/**
 * Loads a video and waits for it to be ready.
 * @param {HTMLVideoElement} video - The video element.
 * @returns {Promise<void>} Resolves when the video is loaded.
 */
function loadVideo(video) {
    return new Promise((resolve) => {
        video.onloadeddata = () => resolve();
        video.load();
    });
}

/**
 * Plays a video on a canvas and waits for it to finish.
 * @param {HTMLVideoElement} video - The video element.
 * @param {HTMLCanvasElement} canvas - The canvas element.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {Promise<void>} Resolves when the video finishes playing.
 */
function playVideoOnCanvas(video, canvas, ctx) {
    return new Promise((resolve) => {
        video.onplay = () => {
            function drawFrame() {
                if (!video.paused && !video.ended) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    requestAnimationFrame(drawFrame);
                }
            }
            requestAnimationFrame(drawFrame);
        };
        video.onended = () => resolve();
        video.play();
    });
}
