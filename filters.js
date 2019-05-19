function grayscale(imgData) {

        for(var i = 0; i < imgData.data.length; i += 4){

        var r = imgData.data[i];
        var g = imgData.data[i+1];
        var b = imgData.data[i+2];

        var v = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
        imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = v
    }    

    return imgData;
}

function sobel(pixels) {

    var operatorX = [
        1, 2, 1,
        0, 0, 0,
        -1, -2, -1]

    var operatorY = [
        1, 0, -1,
        2, 0, -2,
        1, 0, -1]

    pixels = grayscale(pixels)
    pixels = xyConvolution(pixels, operatorX, operatorY)
    
    return pixels
}

function prewitt(pixels) {

    var operatorX = [
        -1, -1, -1,
        0, 0, 0,
        1, 1, 1]

    var operatorY = [
        -1, 0, 1,
        -1, 0, 1,
        -1, 0, 1]

    pixels = grayscale(pixels)
    pixels = xyConvolution(pixels, operatorX, operatorY)
    
    return pixels
}

function roberts(pixels) {

    var operatorX = [
        1, 0,
        0, -1]

    var operatorY = [
        0, 1,
        -1, 0]

    pixels = grayscale(pixels)
    pixels = xyConvolution(pixels, operatorX, operatorY)
    
    return pixels
}

function laplacian(pixels) {

    var operator = [
        0, 0, 1, 0, 0,
        0, 1, 2, 1, 0,
        1, 2, -16, 2, 1,
        0, 1, 2, 1, 0,
        0, 0, 1, 0, 0]

    pixels = grayscale(pixels)
    pixels = convolution(pixels, operator)
    
    return pixels
}

function gaussianBlur(pixels) {

    var divider = 159

    var operator = [
        2/divider, 4/divider, 5/divider, 4/divider, 2/divider,
        4/divider, 9/divider,12/divider, 9/divider, 4/divider,
        5/divider,12/divider,15/divider,12/divider, 5/divider,
        4/divider, 9/divider,12/divider, 9/divider, 4/divider,
        2/divider, 4/divider, 5/divider, 4/divider, 2/divider]

    pixels = convolution(pixels, operator)
    
    return pixels
}