let fechaBase
let eventos
const eventosPasados = []
const eventosFuturos = []
let checkedCheckboxes = []
var arrayAFiltrar = []
var eventosFiltrados = []

async function getData() {
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => {
            fechaBase = json.fechaActual
            eventos = json.eventos 
        })
        const paginasDinamicas = location.search.split("?page=");
    imprimir(paginasDinamicas[1]);
}
getData()



var buttonNav = document.getElementsByClassName("navlink");

for (var i = 0; i < buttonNav.length; i++) {
    const element = buttonNav[i];
    element.addEventListener("click", function (e) {

        imprimir(e.target.id);
    })
}
async function imprimir(id) {
console.log(id)
    switch (id) {

        case "upcomingEvents":
            arrayAFiltrar = await eventos.filter(evento=>evento.date>fechaBase)
            document.getElementById("TitulosPaginas").innerHTML = "UPCOMING EVENTS"
            break;

        case "pastEvents":
            arrayAFiltrar = await eventos.filter(evento=>evento.date<fechaBase)
            document.getElementById("TitulosPaginas").innerHTML = "PAST EVENTS"
            break;

        default:
            arrayAFiltrar = await eventos
            document.getElementById("TitulosPaginas").innerHTML = "HOME"
            break;

    }
    
    display(arrayAFiltrar)
    arrayAFiltrar? eventsCategories(arrayAFiltrar):document.getElementById("checkBox").innerHTML = ""

    
}

function display(array) {
    var html = ""
array?
    array.map(evento=>

        html += `<div class="Card">
        <img src="${evento.image}" alt=${evento.name}>
        <div class="infoCard">
            <h4>${evento.name} </h4>
            <p>Precio: $ ${evento.price} </p>
            <a href="./paginas/details.html?id=${evento.id}">Ver mas</a>
        </div>
    </div>
    `

    )
    :"loading"
    document.getElementById("todosloseventos").innerHTML = html;

}




//navegacion entre las paginas desde detalles
const paginasDinamicas = location.search.split("?page=");

switch (paginasDinamicas[1]) {
    case "upcomingEvents":
        imprimir("upcomingEvents")
        document.getElementById("TitulosPaginas").innerHTML = "UPCOMING EVENTS"
        break;
    case "pastEvents":
        imprimir("pastEvents")
        document.getElementById("TitulosPaginas").innerHTML = "PAST EVENTS"
        break;
    default:
        imprimir("home")

        document.getElementById("TitulosPaginas").innerHTML = "HOME"
}

var flechaDerecha = document.getElementById("derecho")

var flechaIzquierda = document.getElementById("izquierdo")

flechaDerecha.addEventListener("click", function (e) {
    flechas()
})
flechaIzquierda.addEventListener("click", function (e) {
    flechas()
})

function flechas() {
    const paginasDinamicas = location.search.split("?page=");

    if (paginasDinamicas[1] == "upcomingEvents") {
        flechaDerecha.href = "./Index.html?page=pastEvents"
        flechaIzquierda.href = "./Index.html?page=home"
    }
    else if (paginasDinamicas[1] == "pastEvents") {
        flechaDerecha.href = "./paginas/Contact.html"
        flechaIzquierda.href = "./Index.html?page=upcomingEvents"
    }
    else {
        flechaIzquierda.href = "./paginas/stats.html"
        flechaDerecha.href = "./Index.html?page=upcomingEvents"
    }
}


// input

var inputSearch = document.getElementById("inputSearch")

inputSearch.addEventListener("keyup", function (evento) {

    eventosFiltrados = evento.target.value


    filtrosCombinados()

})

function eventsCategories(array) {

    let categories = array.map(evento => evento.category)

    let unica = new Set(categories)

    let lastCategories = [...unica]

    let categoriasEventos = ""
    lastCategories.map(category =>
        categoriasEventos +=
        `
        <label><input type="checkbox" value="${category}"> ${category}</label>
        `
    )
    document.getElementById("checkBox").innerHTML = categoriasEventos

    checkboxsListener()
}

function checkboxsListener() {

    var checkboxs = document.querySelectorAll('input[type=checkbox')

    for (i = 0; i < checkboxs.length; i++) {
        checkboxs[i].addEventListener("change", function () {
            checkedCheckboxes = []
            for (i = 0; i < checkboxs.length; i++) {
                if (checkboxs[i].checked) {
                    checkedCheckboxes.push(checkboxs[i].value)
                }
            }
            // console.log(checkedCheckboxes)
            // console.log(arrayAFiltrar)
            filtrosCombinados()

        })

    }
}

function filtrosCombinados() {

    var eventosPorCategoria = [];

    if (eventosFiltrados !== "" && checkedCheckboxes.length > 0) {

        checkedCheckboxes.map(category => {
            eventosPorCategoria.push(...arrayAFiltrar.filter(evento => evento.name.toLowerCase().includes(eventosFiltrados) && evento.category === category))
        })

    }
    else if (eventosFiltrados !== "" && checkedCheckboxes.length == 0) {
        eventosPorCategoria = arrayAFiltrar.filter(evento => evento.name.toLowerCase().includes(eventosFiltrados))
    }
    else if (eventosFiltrados === "" && checkedCheckboxes.length > 0) {

        checkedCheckboxes.map(category =>
            eventosPorCategoria.push(...arrayAFiltrar.filter(evento => evento.category === category))
        )
    }

    else {
        eventosPorCategoria = arrayAFiltrar
    }
    eventosPorCategoria.length > 0 ?
        display(eventosPorCategoria) :

        document.getElementById("todosloseventos").innerHTML = `<h1>NO SE ENCONTRARON EVENTOS PARA TU BUSQUEDA</h1>`

}
