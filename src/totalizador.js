function totalizar(cantidad, precio) {
  if (cantidad <= 0) {
    return "Error: La cantidad debe ser mayor a 0";
  }
  return cantidad * precio;
}

export default totalizar;