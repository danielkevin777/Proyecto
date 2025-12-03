let promociones = JSON.parse(localStorage.getItem("promos")) || [];

// ---------- GUARDAR Ó EDITAR ----------
document.getElementById("formPromo").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("promoId").value;
    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const descuento = parseInt(document.getElementById("descuento").value);

    if (id) {
        // Editar
        const promo = promociones.find(p => p.id == id);
        promo.titulo = titulo;
        promo.descripcion = descripcion;
        promo.descuento = descuento;
    } else {
        // Insertar
        const nuevaPromo = {
            id: Date.now(),
            titulo,
            descripcion,
            descuento
        };
        promociones.push(nuevaPromo);
    }

    guardar();
    mostrar();
    limpiarFormulario();
});

function guardar() {
    localStorage.setItem("promos", JSON.stringify(promociones));
}

function limpiarFormulario() {
    document.getElementById("promoId").value = "";
    document.getElementById("formPromo").reset();
}

// ---------- MOSTRAR ----------
function mostrar(lista = promociones) {
    const cont = document.getElementById("contenedorPromos");
    cont.innerHTML = "";

    lista.forEach(promo => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${promo.titulo}</h3>
            <p>${promo.descripcion}</p>
            <p><strong>Descuento:</strong> ${promo.descuento}%</p>
            <button class="btn" onclick="editar(${promo.id})">Editar</button>
            <button class="btn limpiar" onclick="eliminar(${promo.id})">Eliminar</button>
        `;

        cont.appendChild(card);
    });
}
mostrar();

// ---------- EDITAR ----------
function editar(id) {
    const promo = promociones.find(p => p.id == id);

    document.getElementById("promoId").value = promo.id;
    document.getElementById("titulo").value = promo.titulo;
    document.getElementById("descripcion").value = promo.descripcion;
    document.getElementById("descuento").value = promo.descuento;
}

// ---------- ELIMINAR ----------
function eliminar(id) {
    promociones = promociones.filter(p => p.id !== id);
    guardar();
    mostrar();
}

// ---------- BUSCAR ----------
document.getElementById("buscar").addEventListener("input", function() {
    const texto = this.value.toLowerCase();

    const filtradas = promociones.filter(p =>
        p.titulo.toLowerCase().includes(texto)
    );

    mostrar(filtradas);
});

// ---------- ORDENAR ----------
document.getElementById("ordenar").addEventListener("click", function() {
    promociones.sort((a, b) => b.descuento - a.descuento);
    mostrar();
});

// ---------- LIMPIAR HISTORIAL ----------
document.getElementById("limpiarHistorial").addEventListener("click", function() {
    if (confirm("¿Seguro que deseas eliminar TODAS las promociones?")) {
        promociones = [];
        guardar();
        mostrar();
    }
});

// ---------- LIMPIAR FORMULARIO ----------
document.getElementById("btnLimpiar").addEventListener("click", limpiarFormulario);
