// ====================================================================
// MODULO: asistencias.js (Enfoque Funcional)
// ====================================================================

function registrarAsistencia(cliente, listaGeneralAsistencias) {
  const ahora = new Date();
  const asistencia = {
    idAsistencia: listaGeneralAsistencias.length + 1,
    clienteId: cliente.idUsuario,
    clienteNombre: cliente.nombre,
    fecha: ahora,
    horaEntrada: ahora.toTimeString().split(' ')[0],
    horaSalida: null
  };

  cliente.historialAsistencias.push(asistencia);
  listaGeneralAsistencias.push(asistencia);

  console.log(`[ASISTENCIA REGISTRADA] Entrada: ${asistencia.horaEntrada} para ${cliente.nombre}`);
  return asistencia;
}

function marcarSalida(asistencia) {
  asistencia.horaSalida = new Date().toTimeString().split(' ')[0];
  console.log(`[SALIDA REGISTRADA] Hora de salida: ${asistencia.horaSalida}`);
}

function calcularAforo(listaGeneralAsistencias) {
  const personasAdentro = listaGeneralAsistencias.filter(a => a.horaSalida === null);
  return personasAdentro.length;
}

module.exports = {
  registrarAsistencia,
  marcarSalida,
  calcularAforo
};
