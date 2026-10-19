// ====================================================================
// MODULO: evolucion.js (Enfoque Funcional)
// ====================================================================

function calcularIMC(pesoKg, estaturaMetros = 1.70) {
  const imc = pesoKg / (estaturaMetros * estaturaMetros);
  return parseFloat(imc.toFixed(2));
}

function registrarEvolucionFisica(entrenador, cliente, pesoActual, medidaCintura) {
  const evolucion = {
    idEvolucion: cliente.historialEvolucion.length + 1,
    fecha: new Date(),
    pesoActual: Number(pesoActual),
    medidaCintura: Number(medidaCintura),
    evaluadoPor: entrenador.nombre,
    imc: calcularIMC(Number(pesoActual))
  };

  cliente.historialEvolucion.push(evolucion);
  console.log(`[EVOLUCION REGISTRADA] Evaluado por ${entrenador.nombre}: Peso ${pesoActual} kg | Cintura ${medidaCintura} cm | IMC estimado: ${evolucion.imc}`);
  return evolucion;
}

module.exports = {
  calcularIMC,
  registrarEvolucionFisica
};
