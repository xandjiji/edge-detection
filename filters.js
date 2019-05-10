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