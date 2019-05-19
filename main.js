var img = new Image();
img.src = "image.jpg";

img.onload = function () {

    // height and width of loaded image
    var w = img.width;
    var h = img.height;
    var data;

    // drawing original image on canvas
    var originalCanvas = document.getElementById('original').getContext('2d');
    originalCanvas.canvas.width = w;
    originalCanvas.canvas.height = h;
    originalCanvas.drawImage(img, 0, 0);

    // drawing blurred image on canvas
    var blurredCanvas = document.getElementById('blurred').getContext('2d');
    blurredCanvas.canvas.width = w;
    blurredCanvas.canvas.height = h;
    data = originalCanvas.getImageData(0, 0, w, h);
    blurredCanvas.putImageData(gaussianBlur(data), 0, 0);

    // drawing grayscale image on canvas
    var grayscaleCanvas = document.getElementById('grayscale').getContext('2d');
    grayscaleCanvas.canvas.width = w;
    grayscaleCanvas.canvas.height = h;
    data = originalCanvas.getImageData(0, 0, w, h);
    grayscaleCanvas.putImageData(grayscale(data), 0, 0);

    // drawing sobel image on canvas
    var sobelCanvas = document.getElementById('sobel').getContext('2d');
    sobelCanvas.canvas.width = w;
    sobelCanvas.canvas.height = h;
    data = originalCanvas.getImageData(0, 0, w, h);
    sobelCanvas.putImageData(sobel(data), 0, 0);

    // drawing prewitt image on canvas
    var prewittCanvas = document.getElementById('prewitt').getContext('2d');
    prewittCanvas.canvas.width = w;
    prewittCanvas.canvas.height = h;
    data = originalCanvas.getImageData(0, 0, w, h);
    prewittCanvas.putImageData(prewitt(data), 0, 0);

    // drawing roberts image on canvas
    var robertsCanvas = document.getElementById('roberts').getContext('2d');
    robertsCanvas.canvas.width = w;
    robertsCanvas.canvas.height = h;
    data = originalCanvas.getImageData(0, 0, w, h);
    robertsCanvas.putImageData(roberts(data), 0, 0);

    // drawing laplacian image on canvas
    var laplacianCanvas = document.getElementById('laplacian').getContext('2d');
    laplacianCanvas.canvas.width = w;
    laplacianCanvas.canvas.height = h;
    data = originalCanvas.getImageData(0, 0, w, h);
    //data = blurredCanvas.getImageData(0, 0, w, h);
    laplacianCanvas.putImageData(laplacian(data), 0, 0);

}