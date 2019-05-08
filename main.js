var img = new Image();
img.src = "image.jpg";

var ctx = document.getElementById('imgInput').getContext('2d');
var ctx2 = document.getElementById('imgOutput').getContext('2d');

img.onload = function () {

    ctx.canvas.width = img.width;
    ctx.canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    var data = ctx.getImageData(0, 0, img.width, img.height);
    ctx2.canvas.width = img.width;
    ctx2.canvas.height = img.height;
    grayscale(data);

}

function grayscale(imgData) {
    

    for(var i = 0; i < imgData.data.length; i += 4){
    
        var r = imgData.data[i];
        var g = imgData.data[i+1];
        var b = imgData.data[i+2];
    
        var v = 0.2126*r + 0.7152*g + 0.0722*b;
        imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = v
    }    

    ctx2.putImageData(imgData, 0, 0);
}
