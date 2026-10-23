// ====================================================================
// VISTA: Vista.js - Funciones generales de interfaz
// ====================================================================
const Vista = {
  limpiarTexto(texto) {
    return texto !== null && texto !== undefined ? String(texto) : '';
  },

  crearOpciones(lista, campoValor, funcionEtiqueta) {
    return lista.map(item => {
      const valor = this.limpiarTexto(item[campoValor]);
      const texto = this.limpiarTexto(funcionEtiqueta(item));
      return `<option value="${valor}">${texto}</option>`;
    }).join('');
  },

  crearPestanas(listaPestanas, pestanaActiva) {
    const botones = listaPestanas.map(([idPestana, nombrePestana]) => {
      const claseActiva = idPestana === pestanaActiva ? 'activa' : '';
      return `<button class="tab ${claseActiva}" data-action="tab" data-tab="${idPestana}">${nombrePestana}</button>`;
    }).join('');
    return `<div class="tabs">${botones}</div>`;
  },

  pintar(contenidoHTML) {
    document.getElementById('app').innerHTML = contenidoHTML;
  },

  actualizarBotonSalir(estaActiva) {
    document.getElementById('btn-salir').classList.toggle('oculto', !estaActiva);
  },

  mostrarToast(mensaje, esExito = true) {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.className = 'toast ' + (esExito ? 'ok' : 'error');
    clearTimeout(this.temporizador);
    this.temporizador = setTimeout(() => toast.classList.add('oculto'), 3200);
  },

  inicio() {
    return `
      <h2>Seleccione el rol con el que desea ingresar:</h2>
      <div class="roles">
        <div class="card rol-card" data-action="entrar" data-rol="admin">
          <h3>Administrador</h3>
          <p class="vacio">Gestión de clientes, planes, pagos e ingreso</p>
        </div>
        <div class="card rol-card" data-action="entrar" data-rol="entrenador">
          <h3>Entrenador</h3>
          <p class="vacio">Diseño de rutinas, clases y evaluación física</p>
        </div>
        <div class="card rol-card" data-action="entrar" data-rol="cliente">
          <h3>Cliente</h3>
          <p class="vacio">Consulta de membresía, rutina y reserva de clases</p>
        </div>
      </div>`;
  },

  seleccionCliente(clientes) {
    if (!clientes.length) {
      return `
        <div class="card">
          <h2>Sin clientes registrados</h2>
          <p class="vacio">El Administrador debe registrar al menos un cliente primero.</p>
          <button class="btn" data-action="inicio">Volver</button>
        </div>`;
    }
    const opciones = this.crearOpciones(clientes, 'idUsuario', cliente => `${cliente.nombre} (Cédula: ${cliente.cedula})`);
    return `
      <div class="card">
        <h2>Seleccione el cliente</h2>
        <form data-form="login-cliente">
          <label>Cliente registrado:
            <select name="clienteId">${opciones}</select>
          </label>
          <div style="margin-top: 10px;">
            <button class="btn">Ingresar</button>
            <button type="button" class="btn btn-ghost" data-action="inicio">Volver</button>
          </div>
        </form>
      </div>`;
  }
};
