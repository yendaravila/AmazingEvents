const fechaBase = dataAmazing.fechaActual
const eventos = dataAmazing.eventos
const eventosPasados = []
const eventosFuturos = []
console.log(fechaBase)
console.log(eventos)


for (var i = 0; i < eventos.length; i++) {
    if (eventos[i].date > fechaBase) {
        eventosFuturos.push(eventos[i])
    } else {
        eventosPasados.push(eventos[i])
    }
}

console.log(eventosFuturos)
console.log(eventosPasados)

var buttonNav = document.getElementsByClassName("navlink");

for (var i = 0; i < buttonNav.length; i++) {
    const element = buttonNav[i];
    element.addEventListener("click", function (e) {

        imprimir(e.target.id);
    })
}
function imprimir(id) {

    switch (id) {

        case "upcomingEvents":
            display(eventosFuturos)
            document.getElementById("TitulosPaginas").innerHTML = "UPCOMING EVENTS"
            break;

        case "pastEvents":
            display(eventosPasados)
            document.getElementById("TitulosPaginas").innerHTML = "PAST EVENTS"
            break;

        default:
            display(eventos)
            document.getElementById("TitulosPaginas").innerHTML = "HOME"

    }
}

function display(array) {
    var html = ""

    for (var i = 0; i < array.length; i++) {
        html += `<div class="Card">
        <img src="./Multimedia/Images/${array[i].image}" alt=${array[i].name}>
        <div class="infoCard">
            <h4>${array[i].name} </h4>
            <p>precio:${array[i].price} </p>
            <a href="./paginas/details.html?id=${array[i].id}">Ver mas</a>
        </div>
    </div>
    `
    }
    document.getElementById("todosloseventos").innerHTML = html;
}

imprimir("home");


//navegacion entre las paginas desde detalles
const paginasDinamicas = location.search.split("?page=");

switch (paginasDinamicas[1]) {
    case "upcoming":
        imprimir("upcomingEvents")
        document.getElementById("TitulosPaginas").innerHTML = "UPCOMING EVENTS"
        break;
    case "past":
        imprimir("pastEvents")
        document.getElementById("TitulosPaginas").innerHTML = "PAST EVENTS"
        break;
    default:
        imprimir("home")
        document.getElementById("TitulosPaginas").innerHTML = "HOME"

}



//Dinamismo del input


var inputSearch = document.getElementById("inputSearch")


inputSearch.addEventListener("keyup", function (evento) { capturaEvento(evento) })

function capturaEvento(evento) {
    
    
   

}