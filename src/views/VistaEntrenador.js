// ====================================================================
// VISTA: VistaEntrenador.js - Pantallas del Entrenador
// ====================================================================
const VistaEntrenador = {
  filaEjercicio() {
    return `<div class="fila-ej">
      <input name="dia" placeholder="Día (ej. Lunes)" required style="width: 100px;">
      <input name="nombreEjercicio" placeholder="Ejercicio" required style="flex: 1;">
      <input name="series" type="number" min="1" placeholder="Series" required style="width: 70px;">
      <input name="repeticiones" type="number" min="1" placeholder="Reps" required style="width: 70px;">
      <button type="button" class="btn btn-sm btn-ghost" data-action="quitar-ejercicio">✕</button>
    </div>`;
  },

  render(pestana, datos) {
    pestana = pestana || 'rutinas';
    const menu = Vista.crearPestanas([
      ['rutinas', 'Rutinas'],
      ['clases', 'Clases Grupales'],
      ['evolucion', 'Evaluación Física']
    ], pestana);
    const titulo = `<h2>Módulo de Entrenador - ${datos.entrenador.nombre}</h2>`;
    return titulo + menu + this['pestana_' + pestana](datos);
  },

  pestana_rutinas(datos) {
    const opcionesRutinas = Vista.crearOpciones(datos.rutinas, 'idRutina', rutina => `${rutina.nombre} (${rutina.objetivo})`);
    const opcionesClientes = Vista.crearOpciones(datos.clientes, 'idUsuario', cliente => cliente.nombre);

    const tarjetasRutinas = datos.rutinas.map(rutina => {
      const itemsEjercicios = rutina.ejercicios.map(ejercicio =>
        `<li><strong>${ejercicio.dia}:</strong> ${ejercicio.nombreEjercicio} (${ejercicio.series}x${ejercicio.repeticiones})</li>`
      ).join('');
      return `<div class="card">
        <h3>${rutina.nombre}</h3>
        <p><strong>Objetivo:</strong> ${rutina.objetivo}</p>
        <ul>${itemsEjercicios}</ul>
      </div>`;
    }).join('');

    return `<div class="grid">
      <div class="card">
        <h3>Diseñar nueva rutina</h3>
        <form data-form="nueva-rutina">
          <label>Nombre de la rutina<input name="nombreRutina" required></label>
          <label>Objetivo principal<input name="objetivo" required></label>
          <label>Ejercicios por día</label>
          <div id="ejercicios">${this.filaEjercicio()}</div>
          <button type="button" class="btn btn-sm btn-ghost" data-action="agregar-ejercicio" style="margin-top: 5px;">+ Agregar ejercicio</button>
          <button class="btn" style="margin-top: 10px;">Crear rutina</button>
        </form>
      </div>
      <div class="card">
        <h3>Asignar rutina a cliente</h3>
        ${datos.rutinas.length && datos.clientes.length ? `
          <form data-form="asignar">
            <label>Cliente<select name="clienteId">${opcionesClientes}</select></label>
            <label>Rutina<select name="rutinaId">${opcionesRutinas}</select></label>
            <button class="btn">Asignar rutina</button>
          </form>` : '<p class="vacio">Se requieren clientes y rutinas registradas.</p>'}
      </div>
    </div>
    <h3 style="margin-top: 20px;">Rutinas registradas</h3>
    <div class="grid">${tarjetasRutinas || '<p class="vacio">No hay rutinas creadas.</p>'}</div>`;
  },

  pestana_clases(datos) {
    const filas = datos.clases.map(clase => `<tr>
      <td>${clase.idClase}</td>
      <td>${clase.nombre}</td>
      <td>${clase.horario}</td>
      <td>${clase.inscritos.length} / ${clase.capacidadMax}</td>
    </tr>`).join('');

    return `<div class="grid">
      <div class="card">
        <h3>Programar clase grupal</h3>
        <form data-form="nueva-clase">
          <label>Nombre de la clase<input name="nombre" required></label>
          <label>Horario (ej. Lunes 6:00 PM)<input name="horario" required></label>
          <label>Capacidad máxima de cupos<input name="cupos" type="number" min="1" value="15" required></label>
          <button class="btn">Programar clase</button>
        </form>
      </div>
      <div class="card">
        <h3>Clases programadas</h3>
        ${datos.clases.length ? `<table><tr><th>ID</th><th>Clase</th><th>Horario</th><th>Inscritos</th></tr>${filas}</table>` : '<p class="vacio">No hay clases programadas.</p>'}
      </div>
    </div>`;
  },

  pestana_evolucion(datos) {
    if (!datos.clientes.length) {
      return `<div class="card"><p class="vacio">No hay clientes para registrar evolución física.</p></div>`;
    }
    const opcionesClientes = Vista.crearOpciones(datos.clientes, 'idUsuario', cliente => cliente.nombre);
    return `<div class="card">
      <h3>Registrar evolución física</h3>
      <form data-form="evolucion">
        <label>Cliente<select name="clienteId">${opcionesClientes}</select></label>
        <label>Peso actual (kg)<input name="peso" type="number" step="0.1" min="20" required></label>
        <label>Medida de cintura (cm)<input name="cintura" type="number" step="0.1" min="30" required></label>
        <button class="btn">Guardar evolución</button>
      </form>
    </div>`;
  }
};
