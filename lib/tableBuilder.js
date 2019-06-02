function renderTabela(){
    let table = "<table>";

    table += "<tr>";

    table += "<th></th>";

    for(let i = 0; i < 5; i++){
        table += "<th>" + whichFilter(i+10) + "</th>";
    }

    table += "</tr>";

    for(var i = 0; i < 5; i++) { // i = linha
        table += "<tr>";

        table += "<th>" + whichFilter(i+10) + "</th>";

        for(var j = 0; j < 5; j++) { // j = coluna
            if(i-1 < j) {
                table += "<td>" + xfom(whichFilter(i), whichFilter(j)) + "</td>";
            }else{
                table += "<th></th>";
            }
        }

        table += "</tr>";
    }

    table += "</table>";


    document.getElementById("tabela").innerHTML = table;
}

function whichFilter(i) {

    var temp;
    switch (i) {

        case 0:
            temp = document.getElementById('sobel').getContext('2d');
            return temp.getImageData(0, 0, temp.canvas.width, temp.canvas.height);
        case 1:
            temp = document.getElementById('prewitt').getContext('2d');
            return temp.getImageData(0, 0, temp.canvas.width, temp.canvas.height);
        case 2:
            temp = document.getElementById('roberts').getContext('2d');
            return temp.getImageData(0, 0, temp.canvas.width, temp.canvas.height);
        case 3:
            temp = document.getElementById('blurredLaplacian').getContext('2d');
            return temp.getImageData(0, 0, temp.canvas.width, temp.canvas.height);
        case 4:
            temp = document.getElementById('canny').getContext('2d');
            return temp.getImageData(0, 0, temp.canvas.width, temp.canvas.height);
        case 10:
            return 'Sobel';
        case 11:
            return 'Prewitt';
        case 12:
            return 'Roberts';
        case 13:
            return 'Laplacian';
        case 14:
            return 'Canny';
        default:
            return console.log("oopsie");
    }
}
