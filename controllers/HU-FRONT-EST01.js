// HU-FRONT-EST01.js
// Mostrar gráfico de asistencia por mes
// Requisitos: datos desde array, Chart.js, etiquetas con porcentaje (chartjs-plugin-datalabels)

// Espera al DOM
document.addEventListener("DOMContentLoaded", () => {
  // Obtener contexto 2D del canvas
  const canvas = document.getElementById("graficoAsistencia");
  if (!canvas) {
    console.error("No se encontró el canvas #graficoAsistencia");
    return;
  }
  const ctx = canvas.getContext("2d");

  // Registrar el plugin de datalabels (es obligatorio en Chart.js v4+)
  if (typeof Chart === "undefined") {
    console.error("Chart.js no está cargado. Revisa las etiquetas <script> en el HTML.");
    return;
  }
  if (typeof ChartDataLabels === "undefined") {
    console.error("chartjs-plugin-datalabels no está cargado. Revisa las etiquetas <script> en el HTML.");
    return;
  }
  Chart.register(ChartDataLabels);

  // ===== Datos simulados (puedes reemplazarlos por un fetch o archivo simulado) =====
  const asistenciaData = [
    { mes: "Enero", porcentaje: 95 },
    { mes: "Febrero", porcentaje: 88 },
    { mes: "Marzo", porcentaje: 92 },
    { mes: "Abril", porcentaje: 85 },
    { mes: "Mayo", porcentaje: 90 },
    { mes: "Junio", porcentaje: 93 },
    // puedes agregar más meses...
  ];

  const labels = asistenciaData.map(d => d.mes);
  const valores = asistenciaData.map(d => d.porcentaje);

  // Color por barra según nivel de asistencia (mejora visual opcional)
  const colores = valores.map(v => {
    if (v >= 90) return "#16a34a";      // verde
    if (v >= 70) return "#f59e0b";      // amarillo
    return "#ef4444";                   // rojo
  });

  // Crear gráfico
  const grafico = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Asistencia (%)",
        data: valores,
        backgroundColor: colores,
        borderColor: colores.map(c => c),
        borderWidth: 1,
        barPercentage: 0.6,
        categoryPercentage: 0.8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const v = ctx.parsed.y ?? ctx.raw;
              return `Asistencia: ${v}%`;
            }
          }
        },
        // Configuración de DataLabels (muestra porcentaje sobre cada barra)
        datalabels: {
          color: "#081028",
          anchor: "end",
          align: "start",
          offset: -6,
          formatter: (value) => `${value}%`,
          font: {
            weight: "600",
            size: 12
          }
        },
        title: {
          display: true,
          text: "Porcentaje de asistencia por mes",
          padding: { top: 6, bottom: 6 },
          font: { size: 16, weight: "600" }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#0f172a" }
        },
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: (v) => `${v}%`,
            color: "#0f172a"
          },
          grid: {
            color: "#eef2f7"
          }
        }
      }
    }
  });

  // Exponer chart en window para depuración (opcional)
  window.__graficoAsistencia = grafico;
});
