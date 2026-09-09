import totalizador from "./totalizador";

const cantidadInput = document.querySelector("#cantidad");
const precioInput = document.querySelector("#precio");
const estadoSelect = document.querySelector("#estado");
const categoriaSelect = document.querySelector("#categoria");
const form = document.querySelector("#totalizador-form");
const cancelarBtn = document.querySelector("#cancelar-btn");
const divResultado = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const cantidad = Number(cantidadInput.value);
  const precio = Number(precioInput.value);
  const estado = estadoSelect.value;
  const categoria = categoriaSelect.value;

  const resultado = totalizador(cantidad, precio, estado, categoria);

  if (typeof resultado === "string") {
    divResultado.innerHTML = "<p>" + resultado + "</p>";
  } else {
    divResultado.innerHTML = `
      <p>Precio neto (${resultado.cantidad}*$${resultado.precio}): $${resultado.precioNeto}</p>
      <p>Descuento (${resultado.porcentajeDescuento}%): $${resultado.descuento}</p>
      <p>Descuento por categoria (${resultado.categoria}): $${resultado.descuentoCategoria}</p>
      <p>Impuesto para ${resultado.estado}(%${resultado.porcentajeImpuesto}): $${resultado.impuesto}</p>
      <p>Impuesto adicional por categoria (${resultado.categoria}): $${resultado.impuestoCategoria}</p>
      <p>Precio total (descuento e impuesto): $${resultado.total}</p>
    `;
  }
});

cancelarBtn.addEventListener("click", () => {
  cantidadInput.value = "";
  precioInput.value = "";
  estadoSelect.selectedIndex = 0;
  categoriaSelect.selectedIndex = 0;
  divResultado.innerHTML = "<p>Compra cancelada</p>";
});