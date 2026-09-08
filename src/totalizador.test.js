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
});