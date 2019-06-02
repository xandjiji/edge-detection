var fileInput = document.getElementById('file');

var img = new Image();
img.src = "image.jpg";

var uploadedImage = new Image();

img.onload = function () {

    update(img);

}

fileInput.onchange = function(event) {
    uploadedImage.src = window.URL.createObjectURL(event.target.files[0]);
};

uploadedImage.onload = function () {

    update(uploadedImage);

}

function update(img) {

    // drawing original image on canvas
    var originalCanvas = document.getElementById('original').getContext('2d');
    originalCanvas.canvas.width = img.width;
    originalCanvas.canvas.height = img.height;
    originalCanvas.drawImage(img, 0, 0);

    var data = originalCanvas.getImageData(0, 0, originalCanvas.canvas.width, originalCanvas.canvas.height);

    // drawing blurred image on canvas
    setImage('blurred', gaussianBlur(data));

    // drawing grayscale image on canvas
    setImage('grayscale', grayscale(data));

    // drawing sobel image on canvas
    setImage('sobel', sobel(data));

    // drawing prewitt image on canvas
    setImage('prewitt', prewitt(data));

    // drawing roberts image on canvas
    setImage('roberts', roberts(data));

    // drawing laplacian image on canvas
    setImage('laplacian', laplacian(data));

    // drawing blurred laplacian image on canvas
    setImage('blurredLaplacian', laplacian(gaussianBlur(data)));

    // drawing canny image on canvas
    setImage('canny', canny(data));

    renderTabela();

}

function setImage(canvasId, data) {
    let tempCanvas = document.getElementById(canvasId).getContext('2d');
    tempCanvas.canvas.width = data.width;
    tempCanvas.canvas.height = data.height;
    tempCanvas.putImageData(data, 0, 0);
}
