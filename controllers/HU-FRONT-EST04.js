// Historia de usuario: Agregar selector para rango de fechas

document.addEventListener("DOMContentLoaded", () => {
  const fechaInicio = document.getElementById("fechaInicio");
  const fechaFin = document.getElementById("fechaFin");
  const btnFiltrar = document.getElementById("btnFiltrar");
  const btnLimpiar = document.getElementById("btnLimpiar");
  const mensaje = document.getElementById("mensaje");
  const tabla = document.getElementById("tablaDatos");
  const filas = Array.from(tabla.querySelectorAll("tr"));

  // 🔹 Ocultar los elementos marcados
  document.querySelectorAll(".marcado").forEach(el => el.style.display = "none");

  // Función para convertir fecha a milisegundos
  const convertirFecha = (fecha) => new Date(fecha).getTime();

  // 🔹 Aplicar el filtro por rango
  const aplicarFiltro = () => {
    const inicio = fechaInicio.value;
    const fin = fechaFin.value;

    // Validar fechas
    if (inicio && fin && convertirFecha(inicio) > convertirFecha(fin)) {
      mensaje.textContent = "⚠️ La fecha inicial no puede ser mayor que la fecha final.";
      mensaje.style.color = "red";
      return;
    }

    mensaje.textContent = "";

    filas.forEach(fila => {
      const fechaCelda = fila.querySelector("td[data-fecha]");
      if (!fechaCelda) return;

      const fecha = fechaCelda.getAttribute("data-fecha");
      let mostrar = true;

      if (inicio && convertirFecha(fecha) < convertirFecha(inicio)) {
        mostrar = false;
      }

      if (fin && convertirFecha(fecha) > convertirFecha(fin)) {
        mostrar = false;
      }

      fila.style.display = mostrar ? "" : "none";
    });

    const visibles = filas.filter(f => f.style.display !== "none").length;
    if (visibles === 0) {
      mensaje.textContent = "⚠️ No hay datos dentro del rango seleccionado.";
      mensaje.style.color = "red";
    } else {
      mensaje.textContent = `✅ Mostrando ${visibles} resultados.`;
      mensaje.style.color = "green";
    }
  };

  // 🔹 Limpiar el filtro
  const limpiarFiltro = () => {
    fechaInicio.value = "";
    fechaFin.value = "";
    mensaje.textContent = "";
    filas.forEach(fila => fila.style.display = "");
  };

  // Eventos
  btnFiltrar.addEventListener("click", aplicarFiltro);
  btnLimpiar.addEventListener("click", limpiarFiltro);
});
