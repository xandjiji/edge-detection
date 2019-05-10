var img = new Image();
img.src = "image.jpg";

img.onload = function () {

    // height and width of loaded image
    var w = img.width;
    var h = img.height;

    // drawing original image on canvas
    var originalCanvas = document.getElementById('original').getContext('2d');
    originalCanvas.canvas.width = w;
    originalCanvas.canvas.height = h;
    originalCanvas.drawImage(img, 0, 0);

    // drawing grayscale image on canvas
    var grayscaleCanvas = document.getElementById('grayscale').getContext('2d');
    grayscaleCanvas.canvas.width = w;
    grayscaleCanvas.canvas.height = h;
    var data = originalCanvas.getImageData(0, 0, w, h);
    grayscaleCanvas.putImageData(grayscale(data), 0, 0);

    // drawing sobel image on canvas
    var sobelCanvas = document.getElementById('sobel').getContext('2d');
    sobelCanvas.canvas.width = w;
    sobelCanvas.canvas.height = h;
    var data2 = originalCanvas.getImageData(0, 0, w, h);

    var sobelData = Sobel(data2);
    var sobelImageData = sobelData.toImageData();

    sobelCanvas.putImageData(sobelImageData, 0, 0);

}