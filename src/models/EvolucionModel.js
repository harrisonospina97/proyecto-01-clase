// ====================================================================
// MODELO: EvolucionModel.js - Control de peso e IMC
// ====================================================================
const EvolucionModel = {
  calcularIMC(pesoKg, estaturaMetros = 1.70) {
    const imc = pesoKg / (estaturaMetros * estaturaMetros);
    return Number(imc.toFixed(2));
  },

  registrar(clienteId, peso, cintura) {
    const cliente = ClienteModel.obtener(clienteId);
    peso = parseFloat(peso);
    cintura = parseFloat(cintura);

    if (!cliente) return { ok: false, msg: 'Cliente no válido.' };
    if (isNaN(peso) || isNaN(cintura) || peso <= 0 || cintura <= 0) {
      return { ok: false, msg: 'Los valores de peso o cintura no son válidos.' };
    }

    const nuevaEvolucion = {
      idEvolucion: Store.nextId('evolucion'),
      fecha: new Date(),
      pesoActual: peso,
      medidaCintura: cintura,
      evaluadoPor: Store.entrenador.nombre,
      imc: this.calcularIMC(peso)
    };

    cliente.historialEvolucion.push(nuevaEvolucion);
    return { ok: true, msg: `Evolución guardada para ${cliente.nombre} (IMC: ${nuevaEvolucion.imc}).` };
  }
};
