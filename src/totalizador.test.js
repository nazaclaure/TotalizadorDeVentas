import totalizar from "./totalizador.js";

describe("Totalizador de Ventas", () => {
  it("deberia calcular el precio neto base para 3 items a $10", () => {
    expect(totalizar(3, 10)).toEqual(30);
  });

  it("deberia retornar mensaje de error si la cantidad es menor o igual a 0", () => {
    expect(totalizar(-5, 10)).toEqual("Error: La cantidad debe ser mayor a 0");
  });

  it("deberia retornar mensaje de error si el precio es menor o igual a 0", () => {
    expect(totalizar(5, -10)).toEqual("Error: El precio debe ser mayor a 0");
  });

  it("deberia aplicar un 3% de descuento si el subtotal es mayor o igual a $1000", () => {
    expect(totalizar(10, 100)).toEqual(970);
  });

  it("deberia aplicar un 5% de descuento si el subtotal es mayor o igual a $3000", () => {
    expect(totalizar(30, 100)).toEqual(2850);
  });

  it("deberia aplicar un 7% de descuento si el subtotal es mayor o igual a $7000", () => {
    expect(totalizar(70, 100)).toEqual(6510);
  });

  it("deberia aplicar un 10% de descuento si el subtotal es mayor o igual a $10000", () => {
    expect(totalizar(100, 100)).toEqual(9000);
  });

  it("deberia aplicar un 15% de descuento si el subtotal es mayor o igual a $30000", () => {
    expect(totalizar(300, 100)).toEqual(25500);
  });

  it("deberia aplicar el impuesto del 6.65% para el estado de UT", () => {
    expect(totalizar(10, 10, "UT")).toEqual(106.65);
  });

  it("deberia aplicar el impuesto del 8% para el estado de NV", () => {
    expect(totalizar(10, 10, "NV")).toEqual(108);
  });

  it("deberia aplicar el impuesto del 6.25% para el estado de TX", () => {
    expect(totalizar(10, 10, "TX")).toEqual(106.25);
  });
});