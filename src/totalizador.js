function totalizar(cantidad, precio, estado = "") {
  if (cantidad <= 0) {
    return "Error: La cantidad debe ser mayor a 0";
  }
  if (precio <= 0) {
    return "Error: El precio debe ser mayor a 0";
  }

  const estadosValidos = ["UT", "NV", "TX", "AL", "CA", ""];
  if (!estadosValidos.includes(estado)) {
    return "Error: Codigo de estado invalido";
  }

  const precioNeto = cantidad * precio;

  let porcentajeDescuento = 0;
  if (precioNeto >= 30000) {
    porcentajeDescuento = 0.15;
  } else if (precioNeto >= 10000) {
    porcentajeDescuento = 0.10;
  } else if (precioNeto >= 7000) {
    porcentajeDescuento = 0.07;
  } else if (precioNeto >= 3000) {
    porcentajeDescuento = 0.05;
  } else if (precioNeto >= 1000) {
    porcentajeDescuento = 0.03;
  }

  const descuento = precioNeto * porcentajeDescuento;
  const subtotalConDescuento = precioNeto - descuento;

  let porcentajeImpuesto = 0;
  if (estado === "UT") {
    porcentajeImpuesto = 0.0665;
  } else if (estado === "NV") {
    porcentajeImpuesto = 0.08;
  } else if (estado === "TX") {
    porcentajeImpuesto = 0.0625;
  } else if (estado === "AL") {
    porcentajeImpuesto = 0.04;
  } else if (estado === "CA") {
    porcentajeImpuesto = 0.0825;
  }

  const impuesto = precioNeto * porcentajeImpuesto;
  const total = precioNeto + impuesto - descuento;

  return {
    precioNeto,
    descuento,
    impuesto,
    total
  };
}

export default totalizar;