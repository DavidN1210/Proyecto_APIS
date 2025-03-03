const apiUrl = "https://dragonball-api.com/api/characters?page=1&limit=58" //Hay 58 personajes registrados en la API
const personajesPorPag = 4; //Muestro 4 personajes por página
let paginaAct = 1;
let allPerson = [];

async function obtenerPersonajes() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        allPerson = data.items;
        mostrarPersonajes(); // Forma en la que mostramos los personajes en la página.
    } catch (error) {
        console.error("Error al obtener los personajes: ", error);
    }
}

function mostrarPersonajes() {
    const contenedor = document.getElementById("card-container");
    contenedor.innerHTML = "";
    
    const personajesPorPagina = allPerson.slice((paginaAct - 1) * personajesPorPag, paginaAct * personajesPorPag);
    // 0*4 + 1*4; Utilizo slice para dividir los planetas que apareceran en cada página
    console.log(personajesPorPagina)
    personajesPorPagina.forEach(person => {
        const caja = document.createElement("div");
        caja.classList.add("caja-css"); // El nuevo div tendra la clase caja-css
        /* Mustro los datos de acuerdo a la documentación */
        caja.innerHTML =  `
        <img src="${person.image}">
        <h3>${person.name}</h3>
        <p>Ki: ${person.ki}<p/>
        <p>Ki máximo: ${person.maxKi}<p/>
        <p>Raza: ${person.race ?? "No tiene raza"}<p/>
        <p>Género: ${person.gender ?? "No tiene genero"}<p/>
        <p> ${person.description ?? "No tiene descripción"}</p>
    `;
        contenedor.appendChild(caja); /* Asigno al div creado (caja individual de cada planeta) como hijo del contendor */
    });
}


function cambiarPagina(paginasPasadas){ // Cuando le doy a siguiete pagina paginasPasada se suma 1
    const paginasTotales = Math.ceil(allPerson.length / personajesPorPag); // Hay 15 páginas
    // Con la primera condicion elimino la página 0 y, con la segunda condición, me aseguro de que no se pase el límite de páginas (3 páginas)
    if(paginaAct + paginasPasadas > 0 && paginaAct + paginasPasadas <= paginasTotales){
        paginaAct += paginasPasadas; // Actualizo el valor de la página actual cuando paso de página
        mostrarPersonajes();
        document.getElementById("pageNumber").textContent = `Página ${paginaAct}`; // Para que se muestre que hemos cambio de página (Pagina 1, Pagina 2...)
    }
}

document.getElementById("nextPage").addEventListener("click", () => cambiarPagina(1));
// Añado el evento de cuando el das click a ir a la siguiente página, le sumo 1 a la página actual
document.getElementById("prevPage").addEventListener("click", () => cambiarPagina(-1)); // Lo mismo, pero le resto 1
document.addEventListener("DOMContentLoaded", obtenerPersonajes);
    
    
