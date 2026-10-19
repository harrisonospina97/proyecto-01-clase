// ====================================================================
// MODULO: clasesGrupales.js (Enfoque Funcional)
// ====================================================================

function crearClaseGrupal(idClase, nombre, capacidadMax, horario, entrenadorNombre = '') {
  return {
    idClase: parseInt(idClase),
    nombre: String(nombre),
    capacidadMax: parseInt(capacidadMax),
    horario: String(horario),
    entrenadorNombre: entrenadorNombre,
    inscritos: []
  };
}

function reservarClase(cliente, claseGrupal) {
  if (claseGrupal.inscritos.length >= claseGrupal.capacidadMax) {
    console.log(`[CUPOS AGOTADOS] La clase "${claseGrupal.nombre}" no tiene cupos disponibles.`);
    return false;
  }
  if (cliente.reservas.includes(claseGrupal.nombre)) {
    console.log(`[AVISO] Ya tienes una reserva para la clase "${claseGrupal.nombre}".`);
    return false;
  }

  cliente.reservas.push(claseGrupal.nombre);
  claseGrupal.inscritos.push(cliente.nombre);
  console.log(`[RESERVA CONFIRMADA] Clase: "${claseGrupal.nombre}" para ${cliente.nombre}.`);
  return true;
}

function cancelarReserva(cliente, claseGrupal) {
  const index = cliente.reservas.indexOf(claseGrupal.nombre);
  if (index === -1) {
    console.log(`[AVISO] No tienes ninguna reserva para la clase "${claseGrupal.nombre}".`);
    return false;
  }

  cliente.reservas.splice(index, 1);
  const indInscrito = claseGrupal.inscritos.indexOf(cliente.nombre);
  if (indInscrito !== -1) {
    claseGrupal.inscritos.splice(indInscrito, 1);
  }

  console.log(`[CANCELACION EXITOSA] Se cancelo la reserva de "${claseGrupal.nombre}" para ${cliente.nombre}.`);
  return true;
}

module.exports = {
  crearClaseGrupal,
  reservarClase,
  cancelarReserva
};
