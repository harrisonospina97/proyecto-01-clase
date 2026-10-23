// ====================================================================
// VISTA: VistaCliente.js - Pantallas del Cliente / Miembro
// ====================================================================
const VistaCliente = {
  render(pestana, datos) {
    pestana = pestana || 'membresia';
    const cliente = datos.cliente;
    const menu = Vista.crearPestanas([
      ['membresia', 'Mi Membresía'],
      ['rutina', 'Mi Rutina'],
      ['clases', 'Clases Grupales']
    ], pestana);
    const titulo = `<h2>Bienvenido, ${cliente.nombre}</h2>`;
    return titulo + menu + this['pestana_' + pestana](datos);
  },

  pestana_membresia(datos) {
    const cliente = datos.cliente;
    const membresia = datos.estadoMembresia(cliente);

    const bannerTratamiento = !cliente.aceptoTratamiento ? `
      <div class="card aviso">
        <h3>Autorización de Tratamiento de Datos</h3>
        <p>De acuerdo con la Ley 1581 de 2012, requerimos su autorización para el manejo de su información personal.</p>
        <button class="btn btn-sm" data-action="aceptar-datos">Autorizo el tratamiento de mis datos</button>
      </div>` : '';

    const historial = cliente.historialEvolucion.map(ev => `<tr>
      <td>${new Date(ev.fecha).toLocaleDateString()}</td>
      <td>${ev.pesoActual} kg</td>
      <td>${ev.medidaCintura} cm</td>
      <td>${ev.imc}</td>
    </tr>`).join('');

    return bannerTratamiento + `
      <div class="grid">
        <div class="card">
          <h3>Estado de la membresía</h3>
          <p><span class="badge ${membresia.activa ? 'ok' : 'mal'}">${membresia.activa ? 'ACTIVA' : 'INACTIVA O SIN PAGO'}</span></p>
          <p><strong>Detalle:</strong> ${membresia.texto}</p>
        </div>
        <div class="card">
          <h3>Mi evolución física</h3>
          ${cliente.historialEvolucion.length ? `<table><tr><th>Fecha</th><th>Peso</th><th>Cintura</th><th>IMC</th></tr>${historial}</table>` : '<p class="vacio">No tienes registros de evolución física.</p>'}
        </div>
      </div>`;
  },

  pestana_rutina(datos) {
    const rutina = datos.rutinaCliente;
    if (!rutina) {
      return `<div class="card"><p class="vacio">Aún no tienes una rutina asignada por el entrenador.</p></div>`;
    }
    const ejercicios = rutina.ejercicios.map(ejercicio => `<tr>
      <td><strong>${ejercicio.dia}</strong></td>
      <td>${ejercicio.nombreEjercicio}</td>
      <td>${ejercicio.series}</td>
      <td>${ejercicio.repeticiones}</td>
    </tr>`).join('');

    return `<div class="card">
      <h3>${rutina.nombre}</h3>
      <p><strong>Objetivo:</strong> ${rutina.objetivo}</p>
      <table><tr><th>Día</th><th>Ejercicio</th><th>Series</th><th>Repeticiones</th></tr>${ejercicios}</table>
    </div>`;
  },

  pestana_clases(datos) {
    const cliente = datos.cliente;
    const filas = datos.clases.map(clase => {
      const yaReservada = cliente.reservas.includes(clase.idClase);
      const llena = clase.inscritos.length >= clase.capacidadMax;
      let botonAccion = '';

      if (yaReservada) {
        botonAccion = `<button class="btn btn-sm btn-peligro" data-action="cancelar-reserva" data-id="${clase.idClase}">Cancelar reserva</button>`;
      } else if (llena) {
        botonAccion = `<span class="badge mal">Sin cupos</span>`;
      } else {
        botonAccion = `<button class="btn btn-sm" data-action="reservar" data-id="${clase.idClase}">Reservar cupo</button>`;
      }

      return `<tr>
        <td>${clase.nombre}</td>
        <td>${clase.horario}</td>
        <td>${clase.inscritos.length} / ${clase.capacidadMax}</td>
        <td>${botonAccion}</td>
      </tr>`;
    }).join('');

    return `<div class="card">
      <h3>Clases disponibles para reservar</h3>
      ${datos.clases.length ? `<table><tr><th>Clase</th><th>Horario</th><th>Cupos</th><th>Acción</th></tr>${filas}</table>` : '<p class="vacio">No hay clases programadas.</p>'}
    </div>`;
  }
};
