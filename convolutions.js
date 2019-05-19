function convolution(pixels, weights) {
    
    var side = Math.round(Math.sqrt(weights.length))
    var halfSide = Math.floor(side/2)
    
    var src = pixels.data
    var canvasWidth = pixels.width
    var canvasHeight = pixels.height

    var temporaryCanvas = document.createElement('canvas')
    var temporaryCtx = temporaryCanvas.getContext('2d')
    var outputData = temporaryCtx.createImageData(canvasWidth, canvasHeight)

    for (var y = 0; y < canvasHeight; y++) {
        for (var x = 0; x < canvasWidth; x++) {

            var dstOff = (y * canvasWidth + x) * 4
            var sumReds = 0
            var sumGreens = 0
            var sumBlues = 0

            for (var kernelY = 0; kernelY < side; kernelY++) {
                for (var kernelX = 0; kernelX < side; kernelX++) {

                    var currentKernelY = y + kernelY - halfSide
                    var currentKernelX = x + kernelX - halfSide

                    if (currentKernelY >= 0 && currentKernelY < canvasHeight && currentKernelX >= 0 && currentKernelX < canvasWidth) {

                        var offset = (currentKernelY * canvasWidth + currentKernelX) * 4
                        var weight = weights[kernelY * side + kernelX]

                        sumReds += src[offset] * weight
                        sumGreens += src[offset + 1] * weight
                        sumBlues += src[offset + 2] * weight
                    }
                }
            }

            outputData.data[dstOff] = sumReds
            outputData.data[dstOff+1] = sumGreens
            outputData.data[dstOff+2] = sumBlues
            outputData.data[dstOff+3] = 255
        }
    }
    return outputData
}

function xyConvolution(pixels, weights1, weights2) {
    
    var side = Math.round(Math.sqrt(weights1.length))
    var halfSide = Math.floor(side/2)

    var src = pixels.data
    var canvasWidth = pixels.width
    var canvasHeight = pixels.height

    var temporaryCanvas = document.createElement('canvas')
    var temporaryCtx = temporaryCanvas.getContext('2d')
    var outputData = temporaryCtx.createImageData(canvasWidth, canvasHeight)

    for (var y = 0; y < canvasHeight; y++) {
        for (var x = 0; x < canvasWidth; x++) {

            var dstOff = (y * canvasWidth + x) * 4
            var sumRedsX = 0
            var sumGreensX = 0
            var sumBluesX = 0

            var sumRedsY = 0
            var sumGreensY = 0
            var sumBluesY = 0

            for (var kernelY = 0; kernelY < side; kernelY++) {
                for (var kernelX = 0; kernelX < side; kernelX++) {

                    var currentKernelY = y + kernelY - halfSide
                    var currentKernelX = x + kernelX - halfSide

                    // fazendo horizontal
                    if (currentKernelY >= 0 && currentKernelY < canvasHeight && currentKernelX >= 0 && currentKernelX < canvasWidth) {

                        var offset = (currentKernelY * canvasWidth + currentKernelX) * 4
                        var weight1 = weights1[kernelY * side + kernelX]

                        sumRedsX += src[offset] * weight1
                        sumGreensX += src[offset + 1] * weight1
                        sumBluesX += src[offset + 2] * weight1
                    }

                    //fazendo vertical
                    if (currentKernelY >= 0 && currentKernelY < canvasHeight && currentKernelX >= 0 && currentKernelX < canvasWidth) {

                        var offset = (currentKernelY * canvasWidth + currentKernelX) * 4
                        var weight2 = weights2[kernelY * side + kernelX]

                        sumRedsY += src[offset] * weight2
                        sumGreensY += src[offset + 1] * weight2
                        sumBluesY += src[offset + 2] * weight2
                    }

                    // calculando a "media" de X e Y
                    var sumReds = Math.sqrt((sumRedsX * sumRedsX) + (sumRedsY * sumRedsY))
                    var sumGreens = Math.sqrt((sumGreensX * sumGreensX) + (sumGreensY * sumGreensY))
                    var sumBlues = Math.sqrt((sumBluesX * sumBluesX) + (sumBluesY * sumBluesY))
                }
            }

            outputData.data[dstOff] = sumReds
            outputData.data[dstOff+1] = sumGreens
            outputData.data[dstOff+2] = sumBlues
            outputData.data[dstOff+3] = 255
        }
    }
    return outputData
}