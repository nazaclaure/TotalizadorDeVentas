import totalizador from "./totalizador";

describe("Totalizador de Ventas", () => {
  it("deberia calcular el precio neto base para 3 items a $10", () => {
    expect(totalizador(3, 10).total).toEqual(30);
  });

  it("deberia retornar mensaje de error si la cantidad es menor o igual a 0", () => {
    expect(totalizador(0, 10)).toEqual("Error: La cantidad debe ser mayor a 0");
  });

  it("deberia retornar mensaje de error si el precio es menor o igual a 0", () => {
    expect(totalizador(10, 0)).toEqual("Error: El precio debe ser mayor a 0");
  });

  it("deberia aplicar un 3% de descuento si el subtotal es mayor o igual a $1000", () => {
    expect(totalizador(10, 100).total).toEqual(970);
  });

  it("deberia aplicar un 5% de descuento si el subtotal es mayor o igual a $3000", () => {
    expect(totalizador(30, 100).total).toEqual(2850);
  });

  it("deberia aplicar un 7% de descuento si el subtotal es mayor o igual a $7000", () => {
    expect(totalizador(70, 100).total).toEqual(6510);
  });

  it("deberia aplicar un 10% de descuento si el subtotal es mayor o igual a $10000", () => {
    expect(totalizador(100, 100).total).toEqual(9000);
  });

  it("deberia aplicar un 15% de descuento si el subtotal es mayor o igual a $30000", () => {
    expect(totalizador(300, 100).total).toEqual(25500);
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

  it("deberia retornar el desglose completo (precio neto, descuento, impuesto y total)", () => {
    expect(totalizador(100, 10, "TX")).toEqual({
      precioNeto: 1000,
      descuento: 30,
      impuesto: 60.625,
      total: 1030.625,
    });
  });
});