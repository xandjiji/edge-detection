function grayscale(imgData) {
    
    var tempData = imgData;

        for(var i = 0; i < tempData.data.length; i += 4){

        var r = tempData.data[i];
        var g = tempData.data[i+1];
        var b = tempData.data[i+2];

        var v = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
        tempData.data[i] = v;
        tempData.data[i+1] = v;
        tempData.data[i+2] = v;
    }    

    return tempData;
}

function thresholding(imgData, args) {
    
    for (var i = 0; i < imgData.data.length; i += 4) {
        
        var r = imgData.data[i];
        var g = imgData.data[i+1];
        var b = imgData.data[i+2];

        var v = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
        var thr = args || 128;

        imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = v > thr ? 255 : 0;
    }

    return imgData;
}

function sobel(imgData) {

    var operatorX = [
        1, 2, 1,
        0, 0, 0,
        -1, -2, -1];

    var operatorY = [
        1, 0, -1,
        2, 0, -2,
        1, 0, -1];

    imgData = grayscale(imgData);
    imgData = xyConvolution(imgData, operatorX, operatorY);
    
    return imgData;
}

function sobelHorizontal(imgData) {

    var divider = 4
    var operator =  [1/divider, 2/divider, 1/divider,
                    0, 0, 0,
                    -1/divider, -2/divider, -1/divider];

    imgData = convolution(imgData, operator);
    
    return imgData;
}

function sobelVertical(imgData) {

    var divider = 4;
    var operator =  [1/divider, 0, -1/divider,
                    2/divider, 0, -2/divider,
                    1/divider, 0, -1/divider];

    imgData = convolution(imgData, operator);
    
    return imgData;
}

function prewitt(imgData) {

    var operatorX = [
        -1, -1, -1,
        0, 0, 0,
        1, 1, 1];

    var operatorY = [
        -1, 0, 1,
        -1, 0, 1,
        -1, 0, 1];

    imgData = grayscale(imgData);
    imgData = xyConvolution(imgData, operatorX, operatorY);
    
    return imgData;
}

function roberts(imgData) {

    var operatorX = [
        1, 0,
        0, -1];

    var operatorY = [
        0, 1,
        -1, 0];

    imgData = grayscale(imgData);
    imgData = xyConvolution(imgData, operatorX, operatorY);
    
    return imgData;
}

function laplacian(imgData) {

    var operator = [
        0, 0, 1, 0, 0,
        0, 1, 2, 1, 0,
        1, 2, -16, 2, 1,
        0, 1, 2, 1, 0,
        0, 0, 1, 0, 0];

    imgData = grayscale(imgData);
    imgData = convolution(imgData, operator);
    
    return imgData;
}

function smallLaplacian(imgData) {

    var operator = [
        0, -1, 0,
        -1, 4, -1,
        0, -1, 0];
    
    return convolution(imgData, operator);
}

function gaussianBlur(imgData) {

    var divider = 159;

    var operator = [
        2/divider, 4/divider, 5/divider, 4/divider, 2/divider,
        4/divider, 9/divider,12/divider, 9/divider, 4/divider,
        5/divider,12/divider,15/divider,12/divider, 5/divider,
        4/divider, 9/divider,12/divider, 9/divider, 4/divider,
        2/divider, 4/divider, 5/divider, 4/divider, 2/divider];

    imgData = convolution(imgData, operator);
    
    return imgData;
}

function canny(imgData) {

    var tempData = imgData;
    
    tempData = gaussianBlur(tempData);

    var deltaX = sobelHorizontal(tempData);
    var deltaY = sobelVertical(tempData);

    var r = gradient(deltaX, deltaY);
    var lp = smallLaplacian(tempData);

    tempData = nonMaximumSuppression(lp, r.direction);

    return thresholding(tempData, 8);
}
