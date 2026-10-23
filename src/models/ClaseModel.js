// ====================================================================
// MODELO: ClaseModel.js - Clases grupales y reservas
// ====================================================================
const ClaseModel = {
  crear(nombre, horario, capacidadMax) {
    nombre = String(nombre || '').trim();
    horario = String(horario || '').trim();
    capacidadMax = parseInt(capacidadMax) || 15;

    if (!nombre || !horario) {
      return { ok: false, msg: 'Nombre y horario son obligatorios.' };
    }

    const nuevaClase = {
      idClase: Store.nextId('clase'),
      nombre: nombre,
      horario: horario,
      capacidadMax: capacidadMax,
      entrenadorNombre: Store.entrenador.nombre,
      inscritos: []
    };

    Store.clases.push(nuevaClase);
    return { ok: true, msg: `Clase "${nombre}" (${horario}) programada.`, data: nuevaClase };
  },

  listar() {
    return Store.clases;
  },

  obtener(id) {
    return Store.clases.find(clase => clase.idClase === Number(id)) || null;
  },

  reservar(clienteId, claseId) {
    const cliente = ClienteModel.obtener(clienteId);
    const clase = this.obtener(claseId);

    if (!cliente || !clase) return { ok: false, msg: 'Datos no válidos.' };
    if (clase.inscritos.length >= clase.capacidadMax) {
      return { ok: false, msg: `Cupos agotados para la clase "${clase.nombre}".` };
    }
    if (cliente.reservas.includes(clase.idClase)) {
      return { ok: false, msg: `Ya tienes una reserva en "${clase.nombre}".` };
    }

    cliente.reservas.push(clase.idClase);
    clase.inscritos.push(cliente.idUsuario);
    return { ok: true, msg: `Reserva confirmada en "${clase.nombre}".` };
  },

  cancelar(clienteId, claseId) {
    const cliente = ClienteModel.obtener(clienteId);
    const clase = this.obtener(claseId);

    if (!cliente || !clase) return { ok: false, msg: 'Datos no válidos.' };

    const indiceReserva = cliente.reservas.indexOf(clase.idClase);
    if (indiceReserva === -1) return { ok: false, msg: 'No tienes reserva en esa clase.' };
    cliente.reservas.splice(indiceReserva, 1);

    const indiceInscrito = clase.inscritos.indexOf(cliente.idUsuario);
    if (indiceInscrito !== -1) clase.inscritos.splice(indiceInscrito, 1);

    return { ok: true, msg: `Reserva cancelada para "${clase.nombre}".` };
  }
};
