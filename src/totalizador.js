function totalizar(cantidad, precio, estado = "") {
  if (cantidad <= 0) {
    return "Error: La cantidad debe ser mayor a 0";
  }
  if (precio <= 0) {
    return "Error: El precio debe ser mayor a 0";
  }

  let subtotal = cantidad * precio;
  let descuento = 0;

  if (subtotal >= 30000) {
    descuento = 0.15;
  } else if (subtotal >= 10000) {
    descuento = 0.10;
  } else if (subtotal >= 7000) {
    descuento = 0.07;
  } else if (subtotal >= 3000) {
    descuento = 0.05;
  } else if (subtotal >= 1000) {
    descuento = 0.03;
  }

  let subtotalConDescuento = subtotal - subtotal * descuento;

  let impuesto = 0;
  if (estado === "UT") {
    impuesto = 0.0665;
  } else if (estado === "NV") {
    impuesto = 0.08;
  } else if (estado === "TX") {
    impuesto = 0.0625;
  } else if (estado === "AL") {
    impuesto = 0.04;
  }

  return subtotalConDescuento + subtotalConDescuento * impuesto;
}

export default totalizar;