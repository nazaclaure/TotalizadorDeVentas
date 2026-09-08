import totalizador from "./totalizador";

const cantidadInput = document.querySelector("#cantidad");
const precioInput = document.querySelector("#precio");
const estadoSelect = document.querySelector("#estado");
const form = document.querySelector("#totalizador-form");
const cancelarBtn = document.querySelector("#cancelar-btn");
const divResultado = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const cantidad = Number(cantidadInput.value);
  const precio = Number(precioInput.value);
  const estado = estadoSelect.value;

  const resultado = totalizar(cantidad, precio, estado);

  if (typeof resultado === "string") {
    divResultado.innerHTML = "<p>" + resultado + "</p>";
  } else {
    divResultado.innerHTML = `
      <p>Precio neto: $${resultado.precioNeto}</p>
      <p>Descuento: $${resultado.descuento}</p>
      <p>Impuesto: $${resultado.impuesto}</p>
      <p><strong>Total: $${resultado.total}</strong></p>
    `;
  }
});

cancelarBtn.addEventListener("click", () => {
  cantidadInput.value = "";
  precioInput.value = "";
  estadoSelect.selectedIndex = 0;
  divResultado.innerHTML = "<p>Compra cancelada</p>";
});