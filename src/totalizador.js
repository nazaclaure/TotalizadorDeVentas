export default function totalizador(cantidad, precio, estado = "CA", categoria = "Varios") {
  if (cantidad <= 0) return "Error: La cantidad debe ser mayor a 0";
  if (precio <= 0) return "Error: El precio debe ser mayor a 0";

  const estadoFinal = (!estado || estado.trim() === "") ? "CA" : estado;
  const categoriaFinal = (!categoria || categoria.trim() === "") ? "Varios" : categoria;

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
  } else if (categoriaFinal === "Electronicos"){
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
  }
  const impuestoCategoria = (precioNeto * porcentajeImpuestoCategoria) / 100;

  const porcentajeImpuesto = tasasImpuesto[estadoFinal];
  const impuesto = (precioNeto * porcentajeImpuesto) / 100;
  const total = precioNeto - descuento - descuentoCategoria + impuesto + impuestoCategoria;

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
    estado: estadoFinal,
    categoria: categoriaFinal,
    total,
  };
}