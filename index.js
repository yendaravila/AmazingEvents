const fechaBase = dataAmazing.fechaActual
const eventos = dataAmazing.eventos
const eventosPasados = []
const eventosFuturos = []
let checkedCheckboxes = []
var arrayAFiltrar = []
var arrayCheckbox = []
var eventosFiltrados = []



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
            arrayAFiltrar = eventosFuturos
            eventsCategories(eventosFuturos)
            document.getElementById("TitulosPaginas").innerHTML = "UPCOMING EVENTS"
            break;

        case "pastEvents":
            display(eventosPasados)
            arrayAFiltrar = eventosPasados
            eventsCategories(eventosPasados)
            document.getElementById("TitulosPaginas").innerHTML = "PAST EVENTS"
            break;

        default:
            display(eventos)
            arrayAFiltrar = eventos
            eventsCategories(eventos)
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

    if (paginasDinamicas[1] == "upcoming") {
        flechaDerecha.href="./index.html?page=past"
        flechaIzquierda.href="./index.html?page=home"
    }
    else if (paginasDinamicas[1] == "past") {
        flechaDerecha.href="./paginas/Contact.html"
        flechaIzquierda.href="./index.html?page=upcoming"
    }
    else{
        flechaIzquierda.href="./paginas/stats.html"
        flechaDerecha.href="./index.html?page=upcoming"
    }
}


// input

var inputSearch = document.getElementById("inputSearch")

inputSearch.addEventListener("keyup", function (evento) {

    var datoInput = evento.target.value

    var eventosFiltrados = arrayAFiltrar.filter(evento => evento.name.trim().toLowerCase().includes(datoInput.trim().toLowerCase()))

    display(eventosFiltrados)
    //filtrosCombinados() me da error

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
            console.log(checkedCheckboxes)
            console.log(arrayAFiltrar)
            //filtrosCombinados()

            var eventosPorCategorias = []
            checkedCheckboxes.map(category => {
                let prueba = arrayAFiltrar.filter(evento => evento.category === category)
                eventosPorCategorias.push(...prueba)

            })

            display(eventosPorCategorias)


        })

    }
}

function filtrosCombinados() {

    var eventosPorCategoria = [];

    if (eventosFiltrados !== "" && arrayCheckbox.length > 0) {

        arrayCheckbox.map(category => {
            eventosPorCategoria.push(...arrayAFiltrar.filter(evento => evento.name.toLowerCase().includes(eventosFiltrados) && evento.category === category))
        })

    }
    else if (eventosFiltrados !== "" && arrayCheckbox.length == 0) {
        eventosPorCategoria = arrayAFiltrar.filter(evento => evento.name.toLowerCase().includes(eventosFiltrados))
    }
    else if (eventosFiltrados === "" && arrayCheckbox.length > 0) {

        arrayCheckbox.map(category =>
            eventosPorCategoria.push(...arrayAFiltrar.filter(evento => evento.category === category))
        )
    }

    else {
        eventosPorCategoria = arrayAFiltrar
    }
    eventosPorCategoria.length > 0 ?
        display(eventosPorCategoria):

        document.getElementById("todosloseventos").innerHTML = `<h1>NO SE ENCONTRARON EVENTOS PARA TU BUSQUEDA</h1>`

}
