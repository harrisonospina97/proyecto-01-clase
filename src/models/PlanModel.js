// ====================================================================
// MODELO: PlanModel.js - Planes y pagos de mensualidad
// ====================================================================
const PlanModel = {
  crear(nombre, precio, duracionDias) {
    nombre = String(nombre || '').trim();
    precio = Number(precio);
    duracionDias = parseInt(duracionDias);

    if (!nombre || isNaN(precio) || precio <= 0 || isNaN(duracionDias) || duracionDias <= 0) {
      return { ok: false, msg: 'Datos del plan inválidos.' };
    }

    const nuevoPlan = {
      idPlan: Store.nextId('plan'),
      nombre: nombre,
      precio: precio,
      duracionDias: duracionDias
    };

    Store.planes.push(nuevoPlan);
    return { ok: true, msg: `Plan "${nombre}" agregado al catálogo.`, data: nuevoPlan };
  },

  listar() {
    return Store.planes;
  },

  obtener(id) {
    return Store.planes.find(plan => plan.idPlan === Number(id)) || null;
  },

  registrarPago(clienteId, planId) {
    const cliente = ClienteModel.obtener(clienteId);
    const plan = this.obtener(planId);

    if (!cliente || !plan) {
      return { ok: false, msg: 'Cliente o plan no válido.' };
    }

    const fechaInicio = new Date();
    const fechaFin = new Date(fechaInicio);
    fechaFin.setDate(fechaFin.getDate() + plan.duracionDias);

    const nuevaMensualidad = {
      idMensualidad: Store.nextId('mensualidad'),
      plan: plan,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
    };

    cliente.plan = plan;
    cliente.mensualidadActual = nuevaMensualidad;
    cliente.historialMensualidades.push(nuevaMensualidad);
    cliente.estadoActivo = true;

    return { ok: true, msg: `Pago de $${plan.precio.toLocaleString()} registrado para ${cliente.nombre}.` };
  },

  validarIngreso(clienteId) {
    const cliente = ClienteModel.obtener(clienteId);
    if (!cliente) {
      return { ok: false, msg: 'Cliente no encontrado.' };
    }
    if (!cliente.mensualidadActual) {
      return { ok: false, msg: `ACCESO DENEGADO: ${cliente.nombre} no tiene mensualidad.` };
    }
    if (!ClienteModel.membresiaVigente(cliente)) {
      return { ok: false, msg: `ACCESO DENEGADO: la mensualidad de ${cliente.nombre} está vencida.` };
    }
    return { ok: true, msg: `Acceso permitido para ${cliente.nombre}.` };
  }
};
