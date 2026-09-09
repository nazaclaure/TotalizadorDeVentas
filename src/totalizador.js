export default function totalizador(cantidad, precio, estado = "CA", categoria = "Varios", peso = 0, tipoCliente = "Normal") {
  if (cantidad <= 0) return "Error: La cantidad debe ser mayor a 0";
  if (precio <= 0) return "Error: El precio debe ser mayor a 0";

  const estadoFinal = (!estado || estado.trim() === "") ? "CA" : estado;
  const categoriaFinal = (!categoria || categoria.trim() === "") ? "Varios" : categoria;
  const tipoClienteFinal = (!tipoCliente || tipoCliente.trim() === "") ? "Normal" : tipoCliente;

  const tasasImpuesto = {
    UT: 6.65,
    NV: 8.0,
    TX: 6.25,
    AL: 4.0,
    CA: 8.25,
  };

  if (!(estadoFinal in tasasImpuesto)) {
    return "Error: Codigo de estado invalido";
  }

  const precioNeto = cantidad * precio;
  let porcentajeDescuento = 0;

  if (precioNeto >= 30000) porcentajeDescuento = 15;
  else if (precioNeto >= 10000) porcentajeDescuento = 10;
  else if (precioNeto >= 7000) porcentajeDescuento = 7;
  else if (precioNeto >= 3000) porcentajeDescuento = 5;
  else if (precioNeto >= 1000) porcentajeDescuento = 3;

  const descuento = (precioNeto * porcentajeDescuento) / 100;

  let porcentajeDescuentoCategoria = 0;
  if (categoriaFinal === "Alimentos") {
    porcentajeDescuentoCategoria = 2;
  } else if (categoriaFinal === "Material de escritorio") {
    porcentajeDescuentoCategoria = 1.5;
  } else if (categoriaFinal === "Electronicos") {
    porcentajeDescuentoCategoria = 1;
  }
  const descuentoCategoria = (precioNeto * porcentajeDescuentoCategoria) / 100;

  let porcentajeImpuestoCategoria = 0;
  if (categoriaFinal === "Bebidas alcoholicas") {
    porcentajeImpuestoCategoria = 7;
  } else if (categoriaFinal === "Muebles") {
    porcentajeImpuestoCategoria = 3;
  } else if (categoriaFinal === "Electronicos") {
    porcentajeImpuestoCategoria = 4;
  } else if (categoriaFinal === "Vestimenta") {
    porcentajeImpuestoCategoria = 2;
  }
  const impuestoCategoria = (precioNeto * porcentajeImpuestoCategoria) / 100;

  const porcentajeImpuesto = tasasImpuesto[estadoFinal];
  const impuesto = (precioNeto * porcentajeImpuesto) / 100;

  let costoEnvioPorUnidad = 0;
  if (peso >= 0 && peso <= 10) {
    costoEnvioPorUnidad = 0;
  } else if (peso >= 11 && peso <= 20) {
    costoEnvioPorUnidad = 3.5;
  } else if (peso >= 21 && peso <= 40) {
    costoEnvioPorUnidad = 5;
  } else if (peso >=41 && peso <= 80 ) {
    costoEnvioPorUnidad = 6;
  } else if (peso >=81 && peso <= 100) {
    costoEnvioPorUnidad = 6.5;
  } else if (peso >= 101 && peso <=200){
    costoEnvioPorUnidad = 8;
  } else if (peso > 200) {
    costoEnvioPorUnidad = 9;
  }

  let porcentajeDescuentoEnvio = 0;
  if (tipoClienteFinal === "Recurrente") {
    porcentajeDescuentoEnvio = 0.5;
  } else if (tipoClienteFinal === "Antiguo Recurrente") {
    porcentajeDescuentoEnvio = 1;
  } else if (tipoClienteFinal === "Especial") {
    porcentajeDescuentoEnvio = 1.5;
  }
  const costoEnvio = Math.round((cantidad * costoEnvioPorUnidad) * (1 - porcentajeDescuentoEnvio / 100) * 100) / 100;
  const total = precioNeto - descuento - descuentoCategoria + impuesto + impuestoCategoria + costoEnvio;

  return {
    cantidad,
    precio,
    precioNeto,
    descuento,
    porcentajeDescuento,
    descuentoCategoria,
    impuesto,
    porcentajeImpuesto,
    impuestoCategoria,
    costoEnvio,
    tipoCliente: tipoClienteFinal,
    estado: estadoFinal,
    categoria: categoriaFinal,
    total,
  };
}