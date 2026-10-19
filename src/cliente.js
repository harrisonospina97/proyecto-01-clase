// ====================================================================
// MODULO: cliente.js (Enfoque Funcional)
// ====================================================================

const { crearUsuario } = require('./usuario.js');

// Crea un cliente combinando los datos de usuario base con los atributos de cliente
function crearCliente(idUsuario, nombre, cedula) {
  const base = crearUsuario(idUsuario, nombre, cedula, 'Cliente');
  return {
    ...base,
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
}

// Acciones del cliente segun el diagrama
function aceptarTratamientoDatos(cliente) {
  cliente.aceptoTratamiento = true;
  console.log(`[TRATAMIENTO DE DATOS] El cliente ${cliente.nombre} autorizo el tratamiento de sus datos.`);
}

function consultarMembresia(cliente) {
  if (!cliente.mensualidadActual) {
    return `El cliente ${cliente.nombre} no tiene ninguna mensualidad activa.`;
  }
  const m = cliente.mensualidadActual;
  const vigente = new Date() <= new Date(m.fechaFin);
  return `Plan: ${m.plan.nombre} | Vence: ${new Date(m.fechaFin).toLocaleDateString()} | Estado: ${vigente ? 'ACTIVA' : 'VENCIDA'}`;
}

function consultarRutina(cliente) {
  if (!cliente.rutinaAsignada) {
    return `El cliente ${cliente.nombre} no tiene rutina asignada todavia.`;
  }
  return `Rutina: ${cliente.rutinaAsignada.nombre} | Objetivo: ${cliente.rutinaAsignada.objetivo}`;
}

module.exports = {
  crearCliente,
  aceptarTratamientoDatos,
  consultarMembresia,
  consultarRutina
};
