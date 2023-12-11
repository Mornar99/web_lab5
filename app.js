document.addEventListener("DOMContentLoaded", function () {
  const videoElement = document.getElementById("camera-preview");
  const startButton = document.getElementById("start-camera");
  const stopButton = document.getElementById("stop-camera");

  let stream;

  //Paljenje kamere
  startButton.addEventListener("click", async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });

      videoElement.srcObject = stream;
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  });

  //Gasenje kamere
  stopButton.addEventListener("click", () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoElement.srcObject = null;
    }
  });
});
