// ====================================================================
// MODELO: AsistenciaModel.js - Control de asistencia y aforo
// ====================================================================
const AsistenciaModel = {
  obtenerHoraActual() {
    return new Date().toTimeString().split(' ')[0];
  },

  registrar(clienteId) {
    const validacion = PlanModel.validarIngreso(clienteId);
    if (!validacion.ok) return validacion;

    const cliente = ClienteModel.obtener(clienteId);
    const yaEstaAdentro = Store.asistencias.some(
      asistencia => asistencia.clienteId === cliente.idUsuario && asistencia.horaSalida === null
    );

    if (yaEstaAdentro) {
      return { ok: false, msg: `${cliente.nombre} ya está dentro del gimnasio.` };
    }

    const nuevaAsistencia = {
      idAsistencia: Store.nextId('asistencia'),
      clienteId: cliente.idUsuario,
      clienteNombre: cliente.nombre,
      fecha: new Date(),
      horaEntrada: this.obtenerHoraActual(),
      horaSalida: null
    };

    cliente.historialAsistencias.push(nuevaAsistencia);
    Store.asistencias.push(nuevaAsistencia);

    return { ok: true, msg: `Entrada registrada para ${cliente.nombre} a las ${nuevaAsistencia.horaEntrada}.` };
  },

  marcarSalida(idAsistencia) {
    const asistencia = Store.asistencias.find(item => item.idAsistencia === Number(idAsistencia));
    if (!asistencia || asistencia.horaSalida) {
      return { ok: false, msg: 'Asistencia no encontrada o ya cerrada.' };
    }

    asistencia.horaSalida = this.obtenerHoraActual();
    return { ok: true, msg: `Salida registrada para ${asistencia.clienteNombre} a las ${asistencia.horaSalida}.` };
  },

  presentes() {
    return Store.asistencias.filter(asistencia => asistencia.horaSalida === null);
  },

  aforo() {
    return this.presentes().length;
  }
};
