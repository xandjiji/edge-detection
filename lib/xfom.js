function xfom(imgData, trueData) {

    var temporaryCanvas = document.createElement('canvas');
    var temporaryCtx = temporaryCanvas.getContext('2d');

    temporaryCtx.canvas.width = imgData.width;
    temporaryCtx.canvas.height = imgData.height;

    temporaryCtx.putImageData(imgData, 0, 0);
    imgData = temporaryCtx.getImageData(3, 3, temporaryCtx.canvas.width-3, temporaryCtx.canvas.height-3);

    temporaryCtx.putImageData(trueData, 0, 0);
    trueData = temporaryCtx.getImageData(3, 3, temporaryCtx.canvas.width-3, temporaryCtx.canvas.height-3);

    var pontuacao = 0;

    for(var i = 0; i < imgData.data.length; i += 4){

        var r1 = imgData.data[i];
        var g1 = imgData.data[i+1];
        var b1 = imgData.data[i+2];

        var r2 = trueData.data[i];
        var g2 = trueData.data[i+1];
        var b2 = trueData.data[i+2];

        // se o pixel atual em trueData for uma borda
        if((r2 !== 0) && (g2 !== 0) && (b2 !== 0)){

            // se o pixel atual em imgData tambem for uma borda
            if((r1 !== 0) && (g1 !== 0) && (b1 !== 0)){
                pontuacao++;
            }
        }

        // se o pixel atual em trueData NAO for uma borda
        if((r2 == 0) && (g2 == 0) && (b2 == 0)){

            // se o pixel atual em imgData tambem NAO for uma borda
            if((r1 == 0) && (g1 == 0) && (b1 == 0)){
                pontuacao++;
            }
        }
    }

    var w = imgData.width;
    var h = imgData.height;

    // retorna acertos em porcentagem (0-1)
    return ((pontuacao/(w*h))*100).toFixed(2) + "%";
}
