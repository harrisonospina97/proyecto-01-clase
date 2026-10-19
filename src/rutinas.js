// ====================================================================
// MODULO: rutinas.js (Enfoque Funcional)
// ====================================================================

function crearRutina(idRutina, nombre, objetivo, entrenadorNombre = '') {
  return {
    idRutina: parseInt(idRutina),
    nombre: String(nombre),
    objetivo: String(objetivo),
    entrenadorNombre: entrenadorNombre,
    ejercicios: []
  };
}

function agregarEjercicio(rutina, dia, nombreEjercicio, series, repeticiones) {
  const ejercicio = {
    dia: String(dia),
    nombreEjercicio: String(nombreEjercicio),
    series: parseInt(series),
    repeticiones: parseInt(repeticiones)
  };
  rutina.ejercicios.push(ejercicio);
  console.log(`[OK] Ejercicio "${nombreEjercicio}" agregado a la rutina "${rutina.nombre}".`);
  return ejercicio;
}

function asignarRutina(entrenador, cliente, rutina) {
  cliente.rutinaAsignada = rutina;
  console.log(`[OK] Entrenador ${entrenador.nombre} asigno la rutina "${rutina.nombre}" a ${cliente.nombre}.`);
}

function mostrarRutina(rutina) {
  console.log(`\n--- Rutina: ${rutina.nombre} ---`);
  console.log(`Objetivo: ${rutina.objetivo}`);
  if (rutina.ejercicios.length === 0) {
    console.log('No tiene ejercicios agregados aun.');
  } else {
    console.log('Ejercicios:');
    rutina.ejercicios.forEach((ej, i) => {
      console.log(`  ${i + 1}. [${ej.dia}] ${ej.nombreEjercicio} - ${ej.series} series x ${ej.repeticiones} reps`);
    });
  }
  console.log('------------------------------------\n');
}

module.exports = {
  crearRutina,
  agregarEjercicio,
  asignarRutina,
  mostrarRutina
};
