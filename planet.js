const apiUrl = "https://dragonball-api.com/api/planets?page=1&limit=20"; // Hay 20 planetas registrados en la API
const planetasPorPag = 4; //Muestro 4 planetas por página
let paginaAct = 1;
let allPlanets = [];

async function obtenerPlanetas() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        allPlanets = data.items;
        mostrarPlanetas(); // Forma en la que mostramos los planetas en la página.
    } catch (error) {
        console.error("Error al obtener los planetas: ", error);
    }
}

function mostrarPlanetas() {
    const contenedor = document.getElementById("card-container");
    contenedor.innerHTML = "";
    
    const planetasPorPagina = allPlanets.slice((paginaAct - 1) * planetasPorPag, paginaAct * planetasPorPag);
    // 0*4 + 1*4; Utilizo slice para dividir los planetas que apareceran en cada página
    console.log(planetasPorPagina)
    planetasPorPagina.forEach(planet => {
        const caja = document.createElement("div");
        caja.classList.add("caja-css"); // El nuevo div tendra la clase caja-css
        /* Mustro los datos de acuerdo a la documentación */
        caja.innerHTML =  `
        <img src="${planet.image}" alt="Imagen del planeta ${planet.name}">
        <h3>${planet.name}</h3>
        <p> ${planet.description ?? "No tiene descripción"}</p>
    `;
        contenedor.appendChild(caja); /* Asigno al div creado (caja individual de cada planeta) como hijo del contendor */
    });
}


function cambiarPagina(paginasPasadas){ // Cuando le doy a siguiete pagina paginasPasada se suma 1
    const paginasTotales = Math.ceil(allPlanets.length / planetasPorPag); // Hay 3 páginas
    // Con la primera condicion elimino la página 0 y, con la segunda condición, me aseguro de que no se pase el límite de páginas (3 páginas)
    if(paginaAct + paginasPasadas > 0 && paginaAct + paginasPasadas <= paginasTotales){
        paginaAct += paginasPasadas; // Actualizo el valor de la página actual cuando paso de página
        mostrarPlanetas();
        document.getElementById("pageNumber").textContent = `Página ${paginaAct}`; // Para que se muestre que hemos cambio de página (Pagina 1, Pagina 2...)
    }
}

document.getElementById("nextPage").addEventListener("click", () => cambiarPagina(1));
// Añado el evento de cuando el das click a ir a la siguiente página, le sumo 1 a la página actual
document.getElementById("prevPage").addEventListener("click", () => cambiarPagina(-1)); // Lo mismo, pero le resto 1
document.addEventListener("DOMContentLoaded", obtenerPlanetas);
    
    
