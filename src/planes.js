// ====================================================================
// MODULO: planes.js (Enfoque Funcional)
// ====================================================================

function crearPlan(idPlan, nombre, precio, duracionDias = 30) {
  return {
    idPlan: parseInt(idPlan),
    nombre: String(nombre),
    precio: Number(precio),
    duracionDias: parseInt(duracionDias)
  };
}

function crearMensualidad(idMensualidad, plan, fechaInicio = new Date()) {
  const inicio = new Date(fechaInicio);
  const fin = new Date(inicio);
  fin.setDate(fin.getDate() + (plan.duracionDias || 30));

  return {
    idMensualidad: parseInt(idMensualidad),
    plan: plan,
    fechaInicio: inicio,
    fechaFin: fin
  };
}

function estaVigente(mensualidad) {
  if (!mensualidad) return false;
  return new Date() <= new Date(mensualidad.fechaFin);
}

function registrarPago(admin, cliente, plan) {
  const idMensualidad = Date.now();
  const mensualidad = crearMensualidad(idMensualidad, plan);
  cliente.plan = plan;
  cliente.mensualidadActual = mensualidad;
  cliente.historialMensualidades.push(mensualidad);
  cliente.estadoActivo = true;

  console.log(`[PAGO REGISTRADO] El administrador ${admin.nombre} registro el pago de $${plan.precio} para ${cliente.nombre}.`);
  return mensualidad;
}

function validarIngreso(cliente) {
  if (!cliente.mensualidadActual) {
    console.log(`[ACCESO DENEGADO] ${cliente.nombre} no tiene mensualidad.`);
    return false;
  }
  if (estaVigente(cliente.mensualidadActual)) {
    console.log(`[ACCESO PERMITIDO] Mensualidad activa para ${cliente.nombre}.`);
    return true;
  } else {
    console.log(`[ACCESO DENEGADO] La mensualidad de ${cliente.nombre} esta vencida.`);
    return false;
  }
}

module.exports = {
  crearPlan,
  crearMensualidad,
  estaVigente,
  registrarPago,
  validarIngreso
};
