
var id = location.search.split("?id=").filter(Number)

var selectId = id[0];


async function getData() {
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => {
            imprimir(json.eventos.filter(evento=>evento.id==selectId))
             
        })
}
getData()

function imprimir(detalleEvento){

var vistaDetalle;

vistaDetalle = `<div class="Container">
<div class="Card-container">
    <div class="ImagenCard">
        <img class="ImgCard" src="${detalleEvento[0].image}"
            alt="${detalleEvento[0].name}">
    </div>
    <div class="descripcion">
        <h2>${detalleEvento[0].name}</h2>
        <p><b>${detalleEvento[0].description} </b></p>
        <div class="InfoDetalle">
            <div class="InfoDetalleUno">
                <p><b>Precio: $ ${detalleEvento[0].price}</b></p>
                <br>
                <p><b>Lugar: ${detalleEvento[0].place}</b></p>
            </div>
            <div class="InfoDetalleDos">
                <p><b>Capacidad: ${detalleEvento[0].capacity}</b> </p>
                <br>
                <p><b>Fecha: ${detalleEvento[0].date}</b> </p>
            </div>
        </div>
    </div>
</div>
</div>
`


document.getElementById("cardDetalle").innerHTML = vistaDetalle;

}






