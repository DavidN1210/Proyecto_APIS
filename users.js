document.addEventListener("DOMContentLoaded", () => {
    const iconoUsuario = document.getElementById("user-icon");
    const sectionUsuario = document.getElementById("section-inicio");
    const formUsuario = document.getElementById("form-usuario");
    const enlacePlanetas = document.querySelector("li a[href='planetas.html']");
    const enlacePersonajes = document.querySelector("li a[href='personajes.html']");

    /* El método addEventListener() en JavaScript se usa para escuchar eventos
     y ejecutar una función cuando ese evento ocurre. 
     Sintaxis: elemento.addEventListener("evento", función); */

    /* DOMContentLoaded es un evento que se dispara cuando el documento HTML
    ha sido completamente cargado y analizado, sin esperar a que se carguen imágenes o estilos. */

    function obtenerFotoSesion(){
        const urlApi = "https://crafatar.com/avatars/9030831a-d18a-4ee4-b516-79657205333c";
        fetch(urlApi)
        /*La variable response representa la respuesta del servidor a la solicitud hecha con fetch()*/
            .then(response => {
                if(response.ok){
                    iconoUsuario.src = urlApi;
                }else{
                    iconoUsuario.src = "images/user-icon.png";
                }
            })
            .catch(error => {
                console.error("Error al cargar la imagen del perfil de usuario", error);
                /* El segundo 'error' es el objeto de error generado por fetch()*/
                /* Ejemplo: Error al cargar la imagen de perfil: TypeError: Failed to fetch */
            });
            
    }

    function actualizarInterfaz(){   
        /* Con 'localStorage'.getItem("email")' reviso si se ha creado un usuario */
        /* Si se ha creado, entonces: no muestro la section de inicio de sesión, habilito los enlaces y cambio la foto de perfil con el metodo anterior */
        if(localStorage.getItem("email")){
            sectionUsuario.style.display = "none";
            habilitarEnlaces(true);
            obtenerFotoSesion();
        }else{ /* Si no se ha iniciado sesion, entonces: la section se mantiene, los enlaces siguen deshabilitados y la foto de perfil se mantiene */
            sectionUsuario.style.display = "block";
            habilitarEnlaces(false);
            iconoUsuario.src = "images/user-icon.png";
        }
    }

    

    function habilitarEnlaces(habilitado){
        /*habilitado es un booleano: si es true devuelve el if pero, si es false, devuelve el else */
        if(habilitado){
            habilitar(enlacePlanetas);
            habilitar(enlacePersonajes);
        }else{
            deshabilitar(enlacePlanetas);
            deshabilitar(enlacePersonajes);
        }
    }

    function deshabilitar(enlace){
        enlace.addEventListener("click", prevenirAcceso);
        /* Si haces click en el enlace se ejecuta la funcion prevenirAcceso */
        enlace.style.pointerEvents = "none"; 
        /* PointerEvents = none hace que el elemento (el enlace) no se a clickable */
        enlace.style.opacity = "0,5";
    }

    function habilitar(enlace) {
        if (enlace) {
            enlace.removeEventListener("click", prevenirAcceso);
            /* Elimino la restricción, para que el enlace vueva a ser accesible */
            enlace.style.pointerEvents = "auto";
            enlace.style.opacity = "1";
        }
    }

    function prevenirAcceso(evento){
        evento.preventDefault(); /* // Evita que el enlace realice su acción (ir a la página) */
        alert("Debes iniciar sesión para poder acceder a esta sección")
    }

    
    iconoUsuario.addEventListener("click", () => {
        if (localStorage.getItem("email")) { 
            /* Cuando hago click en el perfil (ya se ha iniciado sesion), puedo cerrar sesión */
            if (confirm("¿Deseas cerrar sesión?")) {
                localStorage.removeItem("email");
                localStorage.removeItem("contraseña");
                alert("Has cerrado sesión");
                actualizarInterfaz();
            }
        } else { /* Si no he iniciado sesión, me salta un aviso para que lo haga */
            alert("Por favor, inicia sesión creando un usuario");
            seccionUsuario.style.display = "block";
        }
    });

    formUsuario.addEventListener("submit", (enviodatos) => {
        enviodatos.preventDefault(); /* Al evitar que el formulario se envie al servidor
        para, en su lugar, se guarden localmente  */
        const email = document.getElementById("email").value;
        const contraseña = document.getElementById("contraseña").value;
    
        if (email && contraseña) { /* Guardo los datos del email y la contraseña de forma local */
            localStorage.setItem("email", email);
            localStorage.setItem("contraseña", contraseña);
            alert("Usuario creado con éxito");
            actualizarInterfaz();
        }
    });

    actualizarInterfaz();

});

