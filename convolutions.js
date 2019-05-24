function convolution(imgData, weights) {
    
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side/2);
    
    var src = imgData.data;
    var canvasWidth = imgData.width;
    var canvasHeight = imgData.height;

    var temporaryCanvas = document.createElement('canvas');
    var temporaryCtx = temporaryCanvas.getContext('2d');
    var outputData = temporaryCtx.createImageData(canvasWidth, canvasHeight);

    for (var y = 0; y < canvasHeight; y++) {
        for (var x = 0; x < canvasWidth; x++) {

            var dstOff = (y * canvasWidth + x) * 4;
            var sumReds = 0;
            var sumGreens = 0;
            var sumBlues = 0;

            for (var kernelY = 0; kernelY < side; kernelY++) {
                for (var kernelX = 0; kernelX < side; kernelX++) {

                    var currentKernelY = y + kernelY - halfSide;
                    var currentKernelX = x + kernelX - halfSide;

                    if (currentKernelY >= 0 && currentKernelY < canvasHeight && currentKernelX >= 0 && currentKernelX < canvasWidth) {

                        var offset = (currentKernelY * canvasWidth + currentKernelX) * 4;
                        var weight = weights[kernelY * side + kernelX];

                        sumReds += src[offset] * weight;
                        sumGreens += src[offset + 1] * weight;
                        sumBlues += src[offset + 2] * weight;
                    }
                }
            }

            outputData.data[dstOff] = sumReds;
            outputData.data[dstOff+1] = sumGreens;
            outputData.data[dstOff+2] = sumBlues;
            outputData.data[dstOff+3] = 255;
        }
    }
    return outputData;
}

function xyConvolution(imgData, weights1, weights2) {
    
    var side = Math.round(Math.sqrt(weights1.length));
    var halfSide = Math.floor(side/2);

    var src = imgData.data;
    var canvasWidth = imgData.width;
    var canvasHeight = imgData.height;

    var temporaryCanvas = document.createElement('canvas');
    var temporaryCtx = temporaryCanvas.getContext('2d');
    var outputData = temporaryCtx.createImageData(canvasWidth, canvasHeight);

    for (var y = 0; y < canvasHeight; y++) {
        for (var x = 0; x < canvasWidth; x++) {

            var dstOff = (y * canvasWidth + x) * 4;
            var sumRedsX = 0;
            var sumGreensX = 0;
            var sumBluesX = 0;

            var sumRedsY = 0;
            var sumGreensY = 0;
            var sumBluesY = 0;

            for (var kernelY = 0; kernelY < side; kernelY++) {
                for (var kernelX = 0; kernelX < side; kernelX++) {

                    var currentKernelY = y + kernelY - halfSide;
                    var currentKernelX = x + kernelX - halfSide;

                    // fazendo horizontal
                    if (currentKernelY >= 0 && currentKernelY < canvasHeight && currentKernelX >= 0 && currentKernelX < canvasWidth) {

                        var offset = (currentKernelY * canvasWidth + currentKernelX) * 4;
                        var weight1 = weights1[kernelY * side + kernelX];

                        sumRedsX += src[offset] * weight1;
                        sumGreensX += src[offset + 1] * weight1;
                        sumBluesX += src[offset + 2] * weight1;
                    }

                    //fazendo vertical
                    if (currentKernelY >= 0 && currentKernelY < canvasHeight && currentKernelX >= 0 && currentKernelX < canvasWidth) {

                        var offset = (currentKernelY * canvasWidth + currentKernelX) * 4;
                        var weight2 = weights2[kernelY * side + kernelX];

                        sumRedsY += src[offset] * weight2;
                        sumGreensY += src[offset + 1] * weight2;
                        sumBluesY += src[offset + 2] * weight2;
                    }

                    // calculando a "media" de X e Y
                    var sumReds = Math.sqrt((sumRedsX * sumRedsX) + (sumRedsY * sumRedsY));
                    var sumGreens = Math.sqrt((sumGreensX * sumGreensX) + (sumGreensY * sumGreensY));
                    var sumBlues = Math.sqrt((sumBluesX * sumBluesX) + (sumBluesY * sumBluesY));
                }
            }

            outputData.data[dstOff] = sumReds;
            outputData.data[dstOff+1] = sumGreens;
            outputData.data[dstOff+2] = sumBlues;
            outputData.data[dstOff+3] = 255;
        }
    }
    return outputData;
}

function gradient(deltaX, deltaY) {

    var srcX = deltaX.data;
    var srcX = canvasWidth = deltaX.width;
    var canvasHeight = deltaX.height;
    var srcY = deltaY.data;
    var temporaryCanvas = document.createElement('canvas');
    var temporaryCtx = temporaryCanvas.getContext('2d');
    var outputData = temporaryCtx.createImageData(canvasWidth, canvasHeight);
    var outputDataDir = new Array(srcX.length).fill(0);

    for (var y = 0; y < canvasHeight; y++) {

        for (var x = 0; x < canvasWidth; x++) {

            var dstOff = (y * canvasWidth + x) * 4;

            outputData.data[dstOff] = Math.sqrt(Math.pow(srcX[dstOff], 2) +  Math.pow(srcY[dstOff], 2));
            outputData.data[dstOff+1] = Math.sqrt(Math.pow(srcX[dstOff+1], 2) +  Math.pow(srcY[dstOff+1], 2));
            outputData.data[dstOff+2] = Math.sqrt(Math.pow(srcX[dstOff+2], 2) +  Math.pow(srcY[dstOff+2], 2));
            outputData.data[dstOff+3] = 255;

            outputDataDir[dstOff] = Math.atan2(srcY[dstOff], srcX[dstOff]);
            outputDataDir[dstOff+1] = Math.atan2(srcY[dstOff+1], srcX[dstOff+1]);
            outputDataDir[dstOff+2] = Math.atan2(srcY[dstOff+2], srcX[dstOff+2]);
            outputDataDir[dstOff+3] = 255;
        }
    }

    var result = {magnitude: outputData, direction: outputDataDir};

    return result;
}

function nonMaximumSuppression(imgData, direction) {

    var side = Math.round(Math.sqrt(25));
    var halfSide = Math.floor(side/2);
    var src = imgData.data;
    var canvasWidth = imgData.width;
    var canvasHeight = imgData.height;
    var temporaryCanvas = document.createElement('canvas');
    var temporaryCtx = temporaryCanvas.getContext('2d');
    var outputData = temporaryCtx.createImageData(canvasWidth, canvasHeight);

    for (var y = 0; y < canvasHeight; y++) {

        for (var x = 0; x < canvasWidth; x++) {

            var dstOff = (y * canvasWidth + x) * 4;
            var maxReds = src[dstOff];
            var maxGreens = src[dstOff+1];
            var maxBlues = src[dstOff+2];

            for (var kernelY = 0; kernelY < side; kernelY++) {

                for (var kernelX = 0; kernelX < side; kernelX++) {

                    var currentKernelY = y + kernelY - halfSide;
                    var currentKernelX = x + kernelX - halfSide;

                    if (currentKernelY >= 0 && currentKernelY < canvasHeight && currentKernelX >= 0 && currentKernelX < canvasWidth) {

                        var offset = (currentKernelY * canvasWidth + currentKernelX) * 4;
                        var currentKernelAngle = Math.atan2(currentKernelY - y, currentKernelX -x);

                        maxReds = src[offset]*Math.abs(Math.cos(direction[dstOff]-currentKernelAngle)) > maxReds ? 0 : maxReds;
                        maxGreens = src[offset+1]*Math.abs(Math.cos(direction[dstOff+1]-currentKernelAngle)) > maxGreens ? 0 : maxGreens;
                        maxBlues = src[offset+2]*Math.abs(Math.cos(direction[dstOff+2]-currentKernelAngle)) > maxBlues ? 0 : maxBlues;
                    }
                }
            }

            outputData.data[dstOff] = maxReds * 2;
            outputData.data[dstOff+1] = maxGreens * 2;
            outputData.data[dstOff+2] = maxBlues * 2;
            outputData.data[dstOff+3] = 255;
        }
    }
    return outputData;
}
