// ---------------------------------------
// Cargar reservas almacenadas al iniciar
// ---------------------------------------
document.addEventListener("DOMContentLoaded", mostrarReservas);

// Función para generar código único
function generarCodigo() {
    return "R-" + Math.floor(Math.random() * 90000 + 10000);
}

// ---------------------------------------
// GUARDAR RESERVA
// ---------------------------------------
document.getElementById("formReserva").addEventListener("submit", function(e) {
    e.preventDefault();

    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    const nuevaReserva = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
        evento: document.getElementById("evento").value,
        fecha: document.getElementById("fecha").value,
        descripcion: document.getElementById("descripcion").value,
        codigo: generarCodigo()
    };

    reservas.push(nuevaReserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    alert("Reserva realizada. Tu código es: " + nuevaReserva.codigo);

    mostrarReservas();
    document.getElementById("formReserva").reset();
});


// ---------------------------------------
// BUSCADOR DE RESERVAS POR NOMBRE + CÓDIGO
// ---------------------------------------
function buscarReserva() {
    let nombre = document.getElementById("buscarNombre").value.trim().toLowerCase();
    let codigo = document.getElementById("buscarCodigo").value.trim().toUpperCase();

    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    let resultado = reservas.find(
        r => r.nombre.toLowerCase() === nombre && r.codigo === codigo
    );

    let panel = document.getElementById("resultadoBusqueda");

    if (resultado) {
        panel.innerHTML = `
            <div class="reserva-card">
                <h3>Reserva encontrada</h3>
                <p><strong>Nombre:</strong> ${resultado.nombre}</p>
                <p><strong>Código:</strong> ${resultado.codigo}</p>
                <p><strong>Evento:</strong> ${resultado.evento}</p>
                <p><strong>Fecha:</strong> ${resultado.fecha}</p>
                <p><strong>Correo:</strong> ${resultado.correo}</p>
                <p><strong>Descripción:</strong> ${resultado.descripcion}</p>
            </div>
        `;
    } else {
        panel.innerHTML = `
            <div class="reserva-card">
                <h3>No se encontró la reserva</h3>
                <p>Verifica el nombre y el código ingresado.</p>
            </div>
        `;
    }
}

// ---------------------------------------
// LIMPIAR HISTORIAL
// ---------------------------------------
function limpiarHistorial() {
    if (confirm("¿Seguro que deseas eliminar todas las reservas?")) {
        localStorage.removeItem("reservas");
        mostrarReservas();
        document.getElementById("resultadoBusqueda").innerHTML = "";
    }
}
