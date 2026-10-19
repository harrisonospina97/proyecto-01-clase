// ====================================================================
// MODULO: usuario.js (Enfoque Funcional)
// ====================================================================

// Crea un usuario base con objeto plano
function crearUsuario(idUsuario, nombre, cedula, rol = 'Usuario') {
  return {
    idUsuario: parseInt(idUsuario),
    nombre: String(nombre),
    cedula: String(cedula),
    rol: rol,
    sesionIniciada: false
  };
}

// Inicia sesion para cualquier usuario del sistema
function iniciarSesion(usuario) {
  usuario.sesionIniciada = true;
  console.log(`[LOGIN] Sesion iniciada para: ${usuario.nombre} (Cedula: ${usuario.cedula})`);
  return true;
}

module.exports = {
  crearUsuario,
  iniciarSesion
};
