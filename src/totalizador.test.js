import totalizar from "./totalizador.js";

describe("Totalizador de Ventas", () => {
  it("deberia calcular el precio neto base para 3 items a $10", () => {
    expect(totalizar(3, 10)).toEqual(30);
  });
});