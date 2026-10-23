// ====================================================================
// MODELO: ClienteModel.js - Gestión de clientes
// ====================================================================
const ClienteModel = {
  crear(nombre, cedula) {
    nombre = String(nombre || '').trim();
    cedula = String(cedula || '').trim();

    if (!nombre || !cedula) {
      return { ok: false, msg: 'El nombre y la cédula son obligatorios.' };
    }

    const clienteExistente = Store.clientes.find(cliente => cliente.cedula === cedula);
    if (clienteExistente) {
      return { ok: false, msg: 'Ya existe un cliente con esa cédula.' };
    }

    const nuevoCliente = {
      idUsuario: Store.nextId('cliente'),
      nombre: nombre,
      cedula: cedula,
      rol: 'Cliente',
      estadoActivo: true,
      aceptoTratamiento: false,
      plan: null,
      mensualidadActual: null,
      historialMensualidades: [],
      reservas: [],
      historialAsistencias: [],
      rutinaAsignada: null,
      historialEvolucion: []
    };

    Store.clientes.push(nuevoCliente);
    return { ok: true, msg: `Cliente "${nombre}" registrado con éxito.`, data: nuevoCliente };
  },

  listar() {
    return Store.clientes;
  },

  obtener(id) {
    return Store.clientes.find(cliente => cliente.idUsuario === Number(id)) || null;
  },

  aceptarTratamiento(clienteId) {
    const cliente = this.obtener(clienteId);
    if (!cliente) return { ok: false, msg: 'Cliente no encontrado.' };
    cliente.aceptoTratamiento = true;
    return { ok: true, msg: 'Tratamiento de datos autorizado.' };
  },

  membresiaVigente(cliente) {
    if (!cliente || !cliente.mensualidadActual) return false;
    const fechaActual = new Date();
    const fechaFin = new Date(cliente.mensualidadActual.fechaFin);
    return fechaActual <= fechaFin;
  },

  estadoMembresia(cliente) {
    if (!cliente || !cliente.mensualidadActual) {
      return { texto: 'Sin mensualidad', activa: false };
    }
    const mensualidad = cliente.mensualidadActual;
    const activa = this.membresiaVigente(cliente);
    const fechaFinTexto = new Date(mensualidad.fechaFin).toLocaleDateString();
    return {
      texto: `${mensualidad.plan.nombre} - vence ${fechaFinTexto}`,
      activa: activa
    };
  },

  enviarRecordatorio(clienteId) {
    const cliente = this.obtener(clienteId);
    if (!cliente) return { ok: false, msg: 'Cliente no encontrado.' };
    return { ok: true, msg: `Recordatorio enviado a ${cliente.nombre}.` };
  },

  reporte() {
    const total = Store.clientes.length;
    const activos = Store.clientes.filter(cliente => this.membresiaVigente(cliente)).length;
    return { total: total, activos: activos, vencidos: total - activos };
  }
};
