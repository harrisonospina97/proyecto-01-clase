// ====================================================================
// MODELO: RutinaModel.js - Diseño y asignación de rutinas
// ====================================================================
const RutinaModel = {
  crear(nombre, objetivo, listaEjercicios = []) {
    nombre = String(nombre || '').trim();
    objetivo = String(objetivo || '').trim();

    if (!nombre || !objetivo) {
      return { ok: false, msg: 'El nombre y el objetivo son requeridos.' };
    }

    const ejerciciosValidos = listaEjercicios
      .map(item => ({
        dia: String(item.dia || '').trim(),
        nombreEjercicio: String(item.nombreEjercicio || '').trim(),
        series: parseInt(item.series),
        repeticiones: parseInt(item.repeticiones)
      }))
      .filter(item => item.dia && item.nombreEjercicio && !isNaN(item.series) && !isNaN(item.repeticiones));

    const nuevaRutina = {
      idRutina: Store.nextId('rutina'),
      nombre: nombre,
      objetivo: objetivo,
      entrenadorNombre: Store.entrenador.nombre,
      ejercicios: ejerciciosValidos
    };

    Store.rutinas.push(nuevaRutina);
    return { ok: true, msg: `Rutina "${nombre}" creada con éxito.`, data: nuevaRutina };
  },

  listar() {
    return Store.rutinas;
  },

  obtener(id) {
    return Store.rutinas.find(rutina => rutina.idRutina === Number(id)) || null;
  },

  asignar(clienteId, rutinaId) {
    const cliente = ClienteModel.obtener(clienteId);
    const rutina = this.obtener(rutinaId);

    if (!cliente || !rutina) {
      return { ok: false, msg: 'Cliente o rutina no encontrada.' };
    }

    cliente.rutinaAsignada = rutina.idRutina;
    return { ok: true, msg: `Rutina "${rutina.nombre}" asignada a ${cliente.nombre}.` };
  }
};
