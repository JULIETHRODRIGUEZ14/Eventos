let eventos = [];/*guardar eventos arreglo*/
let arr = [];/*almacenamiento local arreglo de eventos*/

const nombreEvento = document.querySelector("#nombreEvento");
const fechaEvento = document.querySelector("#fechaEvento");
const botnAgregar = document.querySelector("#agregar");
const listaEventos = document.querySelector("#listaEventos");

const json = cargar();/*para mostrar los eventos que estan guardados*/
try{
    arr = JSON.parse(json);/*acomode lo que tengo en el json*/ 
}catch (error){
    arr=[]
}
eventos = arr? [...arr]:[];/* tres puntos que lo agrege*/

mostrarEvento();

document.querySelector("form").addEventListener("submit", e => { /* escuche todo lo que hay en el formulario fecha evento y */
    e.preventDefault();/*queda en blanco el blanco*/
    agregarEvento();

}); 
function agregarEvento() {
    if (nombreEvento.value === "" || fechaEvento.value === ""){
        return;/*si esto sucede no haga nada*/
    }

    if(diferenciaFecha(fechaEvento.value) < 0){
        return;
    }

    const nuevoEvento ={
        id: (Math.random() * 100).toString(36).slice(3),/*automatico genera math*//*todo se sepra por comas por que es un jason*/
        nombre: nombreEvento.value,
        fecha: fechaEvento.value,
    };

    eventos.unshift(nuevoEvento);/*metodo de js carga todo del parametro*/

    guardar(JSON.stringify(eventos));/*estrictamente me convierta evento a json*/ 

    nombreEvento.value = "";
    
    mostrarEvento();

}

function diferenciaFecha(destino){
    let fechaDestino = new Date(destino);
    let fechaActual = new Date();
    let diferencia = fechaDestino.getTime() - fechaActual.getTime(); /* restale la fecha del evento menos la fecha actual digame cuantos dias ahi gettime traigame solo el pedazo*/

    let dias = Math.ceil(diferencia / (1000 * 3600 * 24));/*ceil aproxima datos exactos*/
    return dias;
}

function mostrarEvento(){
    const eventosHTML = eventos.map((evento) =>{
        return `
        <div class="evento"><br>
            <div class="dias">
                <span class="diasFaltantes">${diferenciaFecha(evento.fecha)}</span>
                <span class="texto"> dias para </span>
        </div>
    
                <div class="nombreEvento">${evento.nombre}</div>
                <div class="fechaEvento">${evento.fecha}</div>
                <div class="acciones">
                    <button data-id="${evento.id}" class="eliminar">ELIMINAR </button> 
                    </div>
                    </div><br>
        `;
    });
    listaEventos.innerHTML = eventosHTML.join("");
    document.querySelectorAll('.eliminar').forEach(button =>{
        button.addEventListener("click", e =>{
            const id = button.getAttribute('data-id');
            eventos = eventos.filter(evento => evento.id !== id);/*diferente de*/

            guardar(JSON.stringify(eventos));

            mostrarEvento();

        });

    });
}

function guardar(datos){
    localStorage.setItem("lista",datos);
}

function cargar(){
    return localStorage.getItem("lista");
}



/*#id*/
/*.class*/
/*localstroge para que queen guradamos mientras que refrescamos*/