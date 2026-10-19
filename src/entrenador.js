// ====================================================================
// MODULO: entrenador.js (Enfoque Funcional)
// ====================================================================

const { crearUsuario } = require('./usuario.js');

function crearEntrenador(idUsuario, nombre, cedula, especialidad = 'Entrenador de Planta') {
  const base = crearUsuario(idUsuario, nombre, cedula, 'Entrenador');
  return {
    ...base,
    especialidad: especialidad,
    rutinasCreadas: [],
    clasesCreadas: []
  };
}

module.exports = {
  crearEntrenador
};
