// Defino valor de ticket
const valorTicket = 625;
const valorDolar = 292;

valorentrada.innerHTML = "$ " + valorTicket;
/* valorcotizacion.innerHTML = "$ " + cotizaDolar.value; */

// Defino porcentajes de descuento según categoría
let descuentoEstudiante = 80;
let descuentoTrainee    = 50;
let descuentoJunior     = 15;

// Elementos en variables
let nombre          = document.getElementById("nombre");
let telefono        = document.getElementById("telefono");
let email           = document.getElementById("email");
let cantidadTickets = document.getElementById("cantidadTickets");
let categoria       = document.getElementById("categoriaSelect");
let moneda          = document.getElementById("monedaSelect");
let cotizacion      = document.getElementById("cotizaDolar");

// Función para quitar el estilo de error a los elementos del form
function quitarClaseError() {
    let x = document.querySelectorAll(".form-control, .form-select");
    let i;
    for (i = 0; i < x.length; i++) {
        x[i].classList.remove('is-invalid');
    }
}

// Cálculo total a pagar
function total_a_pagar() {

    // Ejecuto función para que quite todos los estilos de error en los campos que los tuvieran
    quitarClaseError();

    // Verifico si lleno los siguientes campos, sino que aplique un estilo de error, haga foco en el campo y se detenga

    if (cotizacion.value === "") {
        alert("Por favor, completar valor cotización.");
        cotizacion.classList.add("is-invalid");
        cotizacion.focus();
        return;
    }

    if (nombre.value === "") {
        alert("Por favor, escribí tu nombre completo.");
        nombre.classList.add("is-invalid");
        nombre.focus();
        return;
    }

    if (telefono.value === "" ) {
        alert("Por favor, escribí tu teléfono.");
        telefono.classList.add("is-invalid");
        telefono.focus();
        return;
    }
 
     // Para determinar si el teléfono es válido o no
     const telefonoValido = telefono => {
        return /^\(?(\d{3})\)?[-]?(\d{4})?[-]?(\d{4})$/.test(telefono);
    }
    
    if (!telefonoValido(telefono.value)) {
        alert("Por favor, escribí correctamente el número de teléfono.");
        telefono.classList.add("is-invalid");
        telefono.focus();
        return;
    }

    if (email.value === "") {
        alert("Por favor, escribí tu email.");
        email.classList.add("is-invalid");
        email.focus();
        return;
    }

    // Para determinar si el correo electrónico es válido o no
    const emailValido = email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (!emailValido(email.value)) {
        alert("Por favor, escribí un correo electrónico válido.");
        email.classList.add("is-invalid");
        email.focus();
        return;
    }

    // Verifico si está ingresado al menos 1 ticket, sino que aplique un estilo de error, haga foco en el campo y se detenga
    if ( (cantidadTickets.value == 0) || (isNaN(cantidadTickets.value)) ) {
        alert("Por favor, ingresá correctamente cantidad de tickets.");
        cantidadTickets.classList.add("is-invalid");
        cantidadTickets.focus();
        return;
    }

    // Verifico que haya seleccionado una categoría, sino que aplique un estilo de error, haga foco en el campo y se detenga
    if (categoria.value == "") {
        alert("Por favor, seleccioná una categoría.");
        categoria.classList.add("is-invalid");
        categoria.focus();
        return;
    }
    
    // Verifico que haya seleccionado una moneda, sino que aplique un estilo de error, haga foco en el campo y se detenga
    if (moneda.value == "") {
        alert("Por favor, seleccioná una categoría.");
        moneda.classList.add("is-invalid");
        moneda.focus();
        return;
    }

    // Multiplico cantidad de tickets por el valor
    let totalValorTickets = (cantidadTickets.value) * valorTicket;

    // Aplico descuentos según categoría
    if (categoria.value == 0) {
        totalValorTickets = totalValorTickets ;
    }
    if (categoria.value == 1) {
        totalValorTickets = totalValorTickets - (descuentoEstudiante / 100 * totalValorTickets);
    }
    if (categoria.value == 2) {
        totalValorTickets = totalValorTickets - (descuentoTrainee / 100 * totalValorTickets);
    }
    if (categoria.value == 3) {
        totalValorTickets = totalValorTickets - (descuentoJunior / 100 * totalValorTickets);
    }

// Calculo lo que debe abonar según moneda

if (moneda.value == 0) {
    totalValorTickets = " $ " + totalValorTickets;
}

if (moneda.value == 1) {
    totalValorTickets= "U$D " + (((totalValorTickets) / cotizacion.value).toFixed(2));
}

// Inserto el valor resultado en el HTML (según moneda seleccionada)

    totalPago.innerHTML = totalValorTickets;
}

// Botón Resumen recibe un escuchador y la funcion del cálculo
btnResumen.addEventListener('click', total_a_pagar);

// Función para el botón Borrar para que borre el valor
function reset_total_a_pagar() {
    quitarClaseError();
    totalPago.innerHTML = "";
}
btnBorrar.addEventListener('click', reset_total_a_pagar);