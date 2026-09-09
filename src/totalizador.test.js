import totalizador from "./totalizador";

describe("Totalizador de Ventas", () => {
  it("deberia calcular el precio neto base para 3 items a $10", () => {
    expect(totalizador(3, 10).precioNeto).toEqual(30);
  });

  it("deberia retornar mensaje de error si la cantidad es menor o igual a 0", () => {
    expect(totalizador(0, 10)).toEqual("Error: La cantidad debe ser mayor a 0");
  });

  it("deberia retornar mensaje de error si el precio es menor o igual a 0", () => {
    expect(totalizador(10, 0)).toEqual("Error: El precio debe ser mayor a 0");
  });

  it("deberia aplicar un 3% de descuento si el subtotal es mayor o igual a $1000", () => {
    expect(totalizador(10, 100).descuento).toEqual(30);
  });

  it("deberia aplicar un 5% de descuento si el subtotal es mayor o igual a $3000", () => {
    expect(totalizador(30, 100).descuento).toEqual(150);
  });

  it("deberia aplicar un 7% de descuento si el subtotal es mayor o igual a $7000", () => {
    expect(totalizador(70, 100).descuento).toEqual(490);
  });

  it("deberia aplicar un 10% de descuento si el subtotal es mayor o igual a $10000", () => {
    expect(totalizador(100, 100).descuento).toEqual(1000);
  });

  it("deberia aplicar un 15% de descuento si el subtotal es mayor o igual a $30000", () => {
    expect(totalizador(300, 100).descuento).toEqual(4500);
  });

  it("deberia aplicar el impuesto del 6.65% para el estado de UT", () => {
    expect(totalizador(10, 10, "UT").total).toEqual(106.65);
  });

  it("deberia aplicar el impuesto del 8% para el estado de NV", () => {
    expect(totalizador(10, 10, "NV").total).toEqual(108);
  });

  it("deberia aplicar el impuesto del 6.25% para el estado de TX", () => {
    expect(totalizador(10, 10, "TX").total).toEqual(106.25);
  });

  it("deberia aplicar el impuesto del 4% para el estado de AL", () => {
    expect(totalizador(10, 10, "AL").total).toEqual(104);
  });

  it("deberia aplicar el impuesto del 8.25% para el estado de CA", () => {
    expect(totalizador(10, 10, "CA").total).toEqual(108.25);
  });

  it("deberia retornar mensaje de error si el estado es invalido", () => {
    expect(totalizador(10, 10, "XX")).toEqual("Error: Codigo de estado invalido");
  });

  it("deberia calcular el impuesto sobre el precio neto independientemente del descuento", () => {
    const resultado = totalizador(100, 100, "TX");
    expect(resultado.impuesto).toEqual(625);
    expect(resultado.total).toEqual(9625);
  });

  it("deberia incluir los porcentajes aplicados y datos base en el objeto retornado", () => {
    const resultado = totalizador(20, 3, "TX");
    expect(resultado).toMatchObject({
      cantidad: 20,
      precio: 3,
      precioNeto: 60,
      descuento: 0,
      porcentajeDescuento: 0,
      descuentoCategoria: 0,
      impuesto: 3.75,
      porcentajeImpuesto: 6.25,
      impuestoCategoria: 0,
      estado: "TX",
      categoria: "Varios",
      total: 63.75,
    });
  });

  it("deberia retornar el desglose completo (precio neto, descuento, impuesto y total)", () => {
    expect(totalizador(100, 10, "TX")).toMatchObject({
      cantidad: 100,
      precio: 10,
      precioNeto: 1000,
      descuento: 30,
      porcentajeDescuento: 3,
      descuentoCategoria: 0,
      impuesto: 62.5,
      porcentajeImpuesto: 6.25,
      impuestoCategoria: 0,
      estado: "TX",
      categoria: "Varios",
      total: 1032.5,
    });
  });

  it("deberia asignar CA como estado por defecto si no se selecciona ningun estado", () => {
    expect(totalizador(10, 10, "").estado).toEqual("CA");
  });

  it("deberia asignar la categoria Varios por defecto si no se selecciona ninguna", () => {
    const resultado = totalizador(10, 10, "CA", "");
    expect(resultado.categoria).toEqual("Varios");
  });

  it("deberia aplicar un 2% de descuento adicional para la categoria Alimentos", () => {
    const resultado = totalizador(10, 100, "CA", "Alimentos");
    expect(resultado.descuentoCategoria).toEqual(20);
  });

  it("deberia aplicar un 7% de impuesto adicional para la categoria Bebidas alcoholicas", () => {
    const resultado = totalizador(10, 100, "CA", "Bebidas alcoholicas");
    expect(resultado.impuestoCategoria).toEqual(70);
  });

  it("deberia aplicar un 1.5% de descuento adicional para la categoria Material de escritorio", () => {
    const resultado = totalizador(10, 100, "CA", "Material de escritorio");
    expect(resultado.descuentoCategoria).toEqual(15);
  });

  it("deberia aplicar un 3% de impuesto adicional para la categoria Muebles", () => {
    const resultado = totalizador(10, 100, "CA", "Muebles");
    expect(resultado.impuestoCategoria).toEqual(30);
  });

  it("deberia aplicar un 1% de descuento adicional para la categoria Electronicos", () => {
    const resultado = totalizador(10, 100, "CA", "Electronicos");
    expect(resultado.descuentoCategoria).toEqual(10);
  });

  it("deberia aplicar un 4% de impuesto adicional para la categoria Electronicos", () => {
    const resultado = totalizador(10, 100, "CA", "Electronicos");
    expect(resultado.impuestoCategoria).toEqual(40);
  });

  it("deberia aplicar un 2% de impuesto adicional para la categoria Vestimenta", () => {
    const resultado = totalizador(10, 100, "CA", "Vestimenta");
    expect(resultado.impuestoCategoria).toEqual(20);
  });

  it("no deberia cobrar costo de envio si el peso volumetrico es entre 0 y 10", () => {
    const resultado = totalizador(10, 10, "CA", "Varios", 5);
    expect(resultado.costoEnvio).toEqual(0);
  });
});