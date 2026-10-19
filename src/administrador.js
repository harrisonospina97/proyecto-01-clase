// ====================================================================
// MODULO: administrador.js (Enfoque Funcional)
// ====================================================================

const { crearUsuario } = require('./usuario.js');
const { crearCliente } = require('./cliente.js');

// Crea el objeto administrador
function crearAdministrador(idUsuario, nombre, cedula, cargo = 'Administrador Principal') {
  const base = crearUsuario(idUsuario, nombre, cedula, 'Administrador');
  return {
    ...base,
    cargo: cargo,
    planesRegistrados: []
  };
}

// 1. Registrar miembro (Crea un nuevo cliente)
function registrarMiembro(admin, idUsuario, nombre, cedula) {
  const cliente = crearCliente(idUsuario, nombre, cedula);
  console.log(`[OK] Administrador ${admin.nombre} registro al miembro: ${nombre} (Cedula: ${cedula})`);
  return cliente;
}

// 2. Enviar recordatorio de vencimiento al cliente
function enviarRecordatorio(admin, cliente) {
  console.log(`[NOTIFICACION] Administrador ${admin.nombre} envio recordatorio de pago a: ${cliente.nombre}`);
}

// 3. Generar reporte consolidado de clientes
function generarReporte(admin, listaClientes = []) {
  let activos = 0;
  listaClientes.forEach(c => {
    if (c.mensualidadActual && new Date() <= new Date(c.mensualidadActual.fechaFin)) {
      activos++;
    }
  });
  return `Reporte generado por ${admin.nombre}: Total Clientes = ${listaClientes.length} | Activos con membresia = ${activos}`;
}

module.exports = {
  crearAdministrador,
  registrarMiembro,
  enviarRecordatorio,
  generarReporte
};
