// Datos con fechas asociadas
const usuarios = [
  { nombre: "Ana", fecha: "2025-09-01" },
  { nombre: "Carlos", fecha: "2025-09-10" },
  { nombre: "Juan", fecha: "2025-09-15" },
  { nombre: "Pedro", fecha: "2025-09-20" },
  { nombre: "Lucía", fecha: "2025-09-25" }
];

const lista = document.getElementById("lista");
const mensaje = document.getElementById("mensaje");
const filtro = document.getElementById("filtro");
const fechaInicio = document.getElementById("fechaInicio");
const fechaFin = document.getElementById("fechaFin");

function renderLista(data) {
  lista.innerHTML = "";

  if (data.length === 0) {
    mensaje.style.display = "block";
  } else {
    mensaje.style.display = "none";
    data.forEach(usuario => {
      const li = document.createElement("li");
      li.textContent = `${usuario.nombre} - ${usuario.fecha}`;
      lista.appendChild(li);
    });
  }
}

renderLista(usuarios);

// Filtro por nombre
filtro.addEventListener("input", (e) => {
  aplicarFiltros();
});

// Filtros por fecha
fechaInicio.addEventListener("change", aplicarFiltros);
fechaFin.addEventListener("change", aplicarFiltros);

function aplicarFiltros() {
  const valor = filtro.value.toLowerCase();
  let inicio = fechaInicio.value ? new Date(fechaInicio.value) : null;
  let fin = fechaFin.value ? new Date(fechaFin.value) : null;

  // Validación de rango de fechas
  if (inicio && fin && inicio > fin) {
    alert("⚠️ La fecha inicial no puede ser mayor a la fecha final.");
    return;
  }

  let filtrados = usuarios.filter(u => u.nombre.toLowerCase().includes(valor));

  if (inicio) {
    filtrados = filtrados.filter(u => new Date(u.fecha) >= inicio);
  }
  if (fin) {
    filtrados = filtrados.filter(u => new Date(u.fecha) <= fin);
  }

  renderLista(filtrados);
}
