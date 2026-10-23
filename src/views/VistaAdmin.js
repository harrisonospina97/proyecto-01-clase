// ====================================================================
// VISTA: VistaAdmin.js - Pantallas del Administrador
// ====================================================================
const VistaAdmin = {
  render(pestana, datos) {
    pestana = pestana || 'clientes';
    const menu = Vista.crearPestanas([
      ['clientes', 'Clientes'],
      ['planes', 'Planes'],
      ['pagos', 'Pagos'],
      ['ingreso', 'Ingreso / Aforo'],
      ['reporte', 'Reporte']
    ], pestana);
    const titulo = `<h2>Módulo de Administración - ${datos.admin.nombre}</h2>`;
    return titulo + menu + this['pestana_' + pestana](datos);
  },

  pestana_clientes(datos) {
    const filas = datos.clientes.map(cliente => {
      const membresia = datos.estadoMembresia(cliente);
      return `<tr>
        <td>${cliente.idUsuario}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.cedula}</td>
        <td><span class="badge ${membresia.activa ? 'ok' : 'mal'}">${membresia.activa ? 'ACTIVA' : 'SIN MEMBRESÍA'}</span></td>
        <td><button class="btn btn-sm btn-ghost" data-action="recordatorio" data-id="${cliente.idUsuario}">Recordatorio</button></td>
      </tr>`;
    }).join('');

    return `<div class="grid">
      <div class="card">
        <h3>Registrar nuevo cliente</h3>
        <form data-form="nuevo-cliente">
          <label>Nombre completo<input name="nombre" required></label>
          <label>Número de cédula<input name="cedula" required></label>
          <button class="btn">Registrar cliente</button>
        </form>
      </div>
      <div class="card">
        <h3>Clientes registrados (${datos.clientes.length})</h3>
        ${datos.clientes.length ? `<table><tr><th>ID</th><th>Nombre</th><th>Cédula</th><th>Estado</th><th>Acción</th></tr>${filas}</table>` : '<p class="vacio">Aún no hay clientes registrados.</p>'}
      </div>
    </div>`;
  },

  pestana_planes(datos) {
    const filas = datos.planes.map(plan => `<tr>
      <td>${plan.idPlan}</td>
      <td>${plan.nombre}</td>
      <td>$${plan.precio.toLocaleString()}</td>
      <td>${plan.duracionDias} días</td>
    </tr>`).join('');

    return `<div class="grid">
      <div class="card">
        <h3>Crear plan de membresía</h3>
        <form data-form="nuevo-plan">
          <label>Nombre del plan<input name="nombre" required></label>
          <label>Precio en COP<input name="precio" type="number" min="1" required></label>
          <label>Duración en días<input name="dias" type="number" min="1" value="30" required></label>
          <button class="btn">Crear plan</button>
        </form>
      </div>
      <div class="card">
        <h3>Catálogo de planes</h3>
        ${datos.planes.length ? `<table><tr><th>ID</th><th>Plan</th><th>Precio</th><th>Duración</th></tr>${filas}</table>` : '<p class="vacio">No hay planes creados.</p>'}
      </div>
    </div>`;
  },

  pestana_pagos(datos) {
    if (!datos.clientes.length || !datos.planes.length) {
      return `<div class="card"><p class="vacio">Se requiere registrar al menos un cliente y un plan para procesar pagos.</p></div>`;
    }
    const opcionesClientes = Vista.crearOpciones(datos.clientes, 'idUsuario', cliente => `${cliente.nombre} (${cliente.cedula})`);
    const opcionesPlanes = Vista.crearOpciones(datos.planes, 'idPlan', plan => `${plan.nombre} - $${plan.precio.toLocaleString()} (${plan.duracionDias} días)`);
    return `<div class="card">
      <h3>Registrar pago de mensualidad</h3>
      <form data-form="pago">
        <label>Cliente<select name="clienteId">${opcionesClientes}</select></label>
        <label>Plan<select name="planId">${opcionesPlanes}</select></label>
        <button class="btn">Registrar pago</button>
      </form>
    </div>`;
  },

  pestana_ingreso(datos) {
    const filas = datos.presentes.map(asistencia => `<tr>
      <td>${asistencia.clienteNombre}</td>
      <td>${asistencia.horaEntrada}</td>
      <td><button class="btn btn-sm btn-peligro" data-action="salida" data-id="${asistencia.idAsistencia}">Marcar salida</button></td>
    </tr>`).join('');

    const opcionesClientes = Vista.crearOpciones(datos.clientes, 'idUsuario', cliente => cliente.nombre);

    return `
      <div class="metricas">
        <div class="card metrica"><div class="num">${datos.aforo}</div><div class="txt">Personas entrenando actualmente</div></div>
      </div>
      <div class="grid">
        <div class="card">
          <h3>Validar ingreso al gimnasio</h3>
          ${datos.clientes.length ? `
            <form data-form="ingreso">
              <label>Cliente<select name="clienteId">${opcionesClientes}</select></label>
              <button class="btn">Validar y registrar ingreso</button>
            </form>` : '<p class="vacio">No hay clientes registrados.</p>'}
        </div>
        <div class="card">
          <h3>Personas dentro del gimnasio</h3>
          ${datos.presentes.length ? `<table><tr><th>Cliente</th><th>Entrada</th><th>Acción</th></tr>${filas}</table>` : '<p class="vacio">No hay nadie dentro del gimnasio.</p>'}
        </div>
      </div>`;
  },

  pestana_reporte(datos) {
    const reporte = datos.reporte;
    return `
      <div class="metricas">
        <div class="card metrica"><div class="num">${reporte.total}</div><div class="txt">Total clientes</div></div>
        <div class="card metrica"><div class="num">${reporte.activos}</div><div class="txt">Membresías activas</div></div>
        <div class="card metrica"><div class="num">${reporte.vencidos}</div><div class="txt">Membresías vencidas</div></div>
      </div>`;
  }
};
