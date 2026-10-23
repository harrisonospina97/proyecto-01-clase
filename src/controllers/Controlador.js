// ====================================================================
// CONTROLADOR: Controlador.js - Conecta la Vista y los Modelos
// ====================================================================
const Controlador = {
  estado: { pantalla: 'inicio', pestana: null, clienteId: null },

  init() {
    document.addEventListener('click', evento => this.alHacerClick(evento));
    document.addEventListener('submit', evento => this.alEnviarFormulario(evento));
    this.render();
  },

  mostrarAviso(resultado) {
    Vista.mostrarToast(resultado.msg, resultado.ok);
    return resultado;
  },

  cambiarPantalla(pantalla, pestana = null, clienteId = null) {
    this.estado = { pantalla: pantalla, pestana: pestana, clienteId: clienteId };
    this.render();
  },

  obtenerDatos() {
    const clienteActual = this.estado.clienteId ? ClienteModel.obtener(this.estado.clienteId) : null;
    return {
      admin: Store.admin,
      entrenador: Store.entrenador,
      clientes: ClienteModel.listar(),
      planes: PlanModel.listar(),
      rutinas: RutinaModel.listar(),
      clases: ClaseModel.listar(),
      presentes: AsistenciaModel.presentes(),
      aforo: AsistenciaModel.aforo(),
      reporte: ClienteModel.reporte(),
      estadoMembresia: cliente => ClienteModel.estadoMembresia(cliente),
      cliente: clienteActual,
      rutinaCliente: clienteActual && clienteActual.rutinaAsignada ? RutinaModel.obtener(clienteActual.rutinaAsignada) : null
    };
  },

  render() {
    const { pantalla, pestana } = this.estado;
    const datos = this.obtenerDatos();
    Vista.actualizarBotonSalir(pantalla !== 'inicio');

    let contenidoHTML;
    switch (pantalla) {
      case 'admin':
        contenidoHTML = VistaAdmin.render(pestana, datos);
        break;
      case 'entrenador':
        contenidoHTML = VistaEntrenador.render(pestana, datos);
        break;
      case 'cliente':
        contenidoHTML = VistaCliente.render(pestana, datos);
        break;
      case 'seleccion-cliente':
        contenidoHTML = Vista.seleccionCliente(datos.clientes);
        break;
      default:
        contenidoHTML = Vista.inicio();
    }
    Vista.pintar(contenidoHTML);
  },

  alHacerClick(evento) {
    const elemento = evento.target.closest('[data-action]');
    if (!elemento) return;

    const accion = elemento.dataset.action;
    const id = elemento.dataset.id;
    const clienteId = this.estado.clienteId;

    switch (accion) {
      case 'inicio':
      case 'salir':
        return this.cambiarPantalla('inicio');

      case 'entrar':
        if (elemento.dataset.rol === 'admin') return this.cambiarPantalla('admin', 'clientes');
        if (elemento.dataset.rol === 'entrenador') return this.cambiarPantalla('entrenador', 'rutinas');
        return this.cambiarPantalla('seleccion-cliente');

      case 'tab':
        this.estado.pestana = elemento.dataset.tab;
        return this.render();

      case 'recordatorio':
        return this.mostrarAviso(ClienteModel.enviarRecordatorio(id));

      case 'salida':
        this.mostrarAviso(AsistenciaModel.marcarSalida(id));
        return this.render();

      case 'agregar-ejercicio':
        document.getElementById('ejercicios').insertAdjacentHTML('beforeend', VistaEntrenador.filaEjercicio());
        return;

      case 'quitar-ejercicio': {
        const contenedor = document.getElementById('ejercicios');
        if (contenedor.children.length > 1) elemento.closest('.fila-ej').remove();
        return;
      }

      case 'aceptar-datos':
        this.mostrarAviso(ClienteModel.aceptarTratamiento(clienteId));
        return this.render();

      case 'reservar':
        this.mostrarAviso(ClaseModel.reservar(clienteId, id));
        return this.render();

      case 'cancelar-reserva':
        this.mostrarAviso(ClaseModel.cancelar(clienteId, id));
        return this.render();
    }
  },

  alEnviarFormulario(evento) {
    const formulario = evento.target.closest('[data-form]');
    if (!formulario) return;
    evento.preventDefault();

    const datosFormulario = new FormData(formulario);
    const obtenerValor = campo => datosFormulario.get(campo);
    let resultado;

    switch (formulario.dataset.form) {
      case 'login-cliente':
        return this.cambiarPantalla('cliente', 'membresia', Number(obtenerValor('clienteId')));

      case 'nuevo-cliente':
        resultado = ClienteModel.crear(obtenerValor('nombre'), obtenerValor('cedula'));
        break;

      case 'nuevo-plan':
        resultado = PlanModel.crear(obtenerValor('nombre'), obtenerValor('precio'), obtenerValor('dias'));
        break;

      case 'pago':
        resultado = PlanModel.registrarPago(obtenerValor('clienteId'), obtenerValor('planId'));
        break;

      case 'ingreso':
        resultado = AsistenciaModel.registrar(obtenerValor('clienteId'));
        break;

      case 'nueva-rutina': {
        const filas = [...formulario.querySelectorAll('.fila-ej')];
        const ejercicios = filas.map(fila => ({
          dia: fila.querySelector('[name=dia]').value,
          nombreEjercicio: fila.querySelector('[name=nombreEjercicio]').value,
          series: fila.querySelector('[name=series]').value,
          repeticiones: fila.querySelector('[name=repeticiones]').value
        }));
        resultado = RutinaModel.crear(obtenerValor('nombreRutina'), obtenerValor('objetivo'), ejercicios);
        break;
      }

      case 'asignar':
        resultado = RutinaModel.asignar(obtenerValor('clienteId'), obtenerValor('rutinaId'));
        break;

      case 'evolucion':
        resultado = EvolucionModel.registrar(obtenerValor('clienteId'), obtenerValor('peso'), obtenerValor('cintura'));
        break;

      case 'nueva-clase':
        resultado = ClaseModel.crear(obtenerValor('nombre'), obtenerValor('horario'), obtenerValor('cupos'));
        break;

      default:
        return;
    }

    this.mostrarAviso(resultado);
    if (resultado.ok) this.render();
  }
};
