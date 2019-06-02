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

    //calcDiff();

}

function setImage(canvasId, data) {
    let tempCanvas = document.getElementById(canvasId).getContext('2d');
    tempCanvas.canvas.width = data.width;
    tempCanvas.canvas.height = data.height;
    tempCanvas.putImageData(data, 0, 0);
}


function calcDiff() {

    // carregando todos os dados
    var temp;

    temp = document.getElementById('sobel').getContext('2d');
    var sobeldata = temp.getImageData(0, 0, temp.canvas.width, temp.canvas.height);

    temp = document.getElementById('prewitt').getContext('2d');
    var prewittdata = temp.getImageData(0, 0, temp.canvas.width, temp.canvas.height);

    temp = document.getElementById('roberts').getContext('2d');
    var robertsdata = temp.getImageData(0, 0, temp.canvas.width, temp.canvas.height);

    temp = document.getElementById('laplacian').getContext('2d');
    var laplaciandata = temp.getImageData(0, 0, temp.canvas.width, temp.canvas.height);

    temp = document.getElementById('blurredLaplacian').getContext('2d');
    var blurredlaplaciandata = temp.getImageData(0, 0, temp.canvas.width, temp.canvas.height);

    temp = document.getElementById('canny').getContext('2d');
    var cannydata = temp.getImageData(0, 0, temp.canvas.width, temp.canvas.height);

    console.log(xfom(sobeldata, sobeldata));
    console.log(xfom(prewittdata, sobeldata));
    console.log(xfom(robertsdata, sobeldata));
    console.log(xfom(laplaciandata, sobeldata));
    console.log(xfom(blurredlaplaciandata, sobeldata));
    console.log(xfom(cannydata, sobeldata));

    console.log(xfom(sobeldata, prewittdata));
    console.log(xfom(prewittdata, prewittdata));
    console.log(xfom(robertsdata, prewittdata));
    console.log(xfom(laplaciandata, prewittdata));
    console.log(xfom(blurredlaplaciandata, prewittdata));
    console.log(xfom(cannydata, prewittdata));

    console.log(xfom(sobeldata, robertsdata));
    console.log(xfom(prewittdata, robertsdata));
    console.log(xfom(robertsdata, robertsdata));
    console.log(xfom(laplaciandata, robertsdata));
    console.log(xfom(blurredlaplaciandata, robertsdata));
    console.log(xfom(cannydata, robertsdata));

    console.log(xfom(sobeldata, laplaciandata));
    console.log(xfom(prewittdata, laplaciandata));
    console.log(xfom(robertsdata, laplaciandata));
    console.log(xfom(laplaciandata, laplaciandata));
    console.log(xfom(blurredlaplaciandata, laplaciandata));
    console.log(xfom(cannydata, laplaciandata));

    console.log(xfom(sobeldata, blurredlaplaciandata));
    console.log(xfom(prewittdata, blurredlaplaciandata));
    console.log(xfom(robertsdata, blurredlaplaciandata));
    console.log(xfom(laplaciandata, blurredlaplaciandata));
    console.log(xfom(blurredlaplaciandata, blurredlaplaciandata));
    console.log(xfom(cannydata, blurredlaplaciandata));

    console.log(xfom(sobeldata, cannydata));
    console.log(xfom(prewittdata, cannydata));
    console.log(xfom(robertsdata, cannydata));
    console.log(xfom(laplaciandata, cannydata));
    console.log(xfom(blurredlaplaciandata, cannydata));
    console.log(xfom(cannydata, cannydata));

}
