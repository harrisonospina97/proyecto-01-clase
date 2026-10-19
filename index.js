// ====================================================================
// PROYECTO GIMNASIO - ENFOQUE FUNCIONAL (NODE.JS)
// ====================================================================

const readline = require('readline');

// Importamos las funciones organizadas por modulo
const { iniciarSesion } = require('./src/usuario.js');
const {
  crearCliente,
  aceptarTratamientoDatos,
  consultarMembresia,
  consultarRutina
} = require('./src/cliente.js');
const {
  crearAdministrador,
  registrarMiembro,
  enviarRecordatorio,
  generarReporte
} = require('./src/administrador.js');
const { crearEntrenador } = require('./src/entrenador.js');

const {
  crearPlan,
  registrarPago,
  validarIngreso
} = require('./src/planes.js');

const {
  crearRutina,
  agregarEjercicio,
  asignarRutina,
  mostrarRutina
} = require('./src/rutinas.js');

const {
  registrarAsistencia,
  marcarSalida,
  calcularAforo
} = require('./src/asistencias.js');

const {
  registrarEvolucionFisica
} = require('./src/evolucion.js');

const {
  crearClaseGrupal,
  reservarClase,
  cancelarReserva
} = require('./src/clasesGrupales.js');

// Configuracion de entrada/salida interactiva
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(texto) {
  return new Promise(resolve => rl.question(texto, resolve));
}

// -------------------------------------------------------------
// ESTADO GENERAL DE LA APLICACION (Objetos y Listas)
// -------------------------------------------------------------
const admin = crearAdministrador(1, 'la verde', '10203040', 'Administrador Principal');
const entrenador = crearEntrenador(2, 'harry', '70809010', 'Entrenador de Planta');

const clientes = [];
const planes = [];
const rutinasCreadas = [];
const clasesGrupales = [];
const listaAsistencias = [];

// -------------------------------------------------------------
// MODULO 1: ADMINISTRADOR (Funciones)
// -------------------------------------------------------------
async function moduloAdministrador() {
  iniciarSesion(admin);
  let volver = false;

  while (!volver) {
    console.log('\n------------------------------------------------------');
    console.log(`      MODULO ADMINISTRADOR - Sesion: ${admin.nombre}`);
    console.log('------------------------------------------------------');
    console.log('1. Registrar nuevo Cliente');
    console.log('2. Crear Plan de Membresia');
    console.log('3. Registrar Pago de Mensualidad');
    console.log('4. Validar Ingreso al Gimnasio (Aforo)');
    console.log('5. Enviar Recordatorio de Vencimiento');
    console.log('6. Generar Reporte de Clientes');
    console.log('0. Cerrar Sesion (Volver al inicio)');
    console.log('------------------------------------------------------');

    const opt = (await preguntar('Seleccione una opcion [0-6]: ')).trim();
    console.log('......................................................');

    switch (opt) {
      case '1': {
        console.log('[REGISTRO DE CLIENTE]');
        const id = (await preguntar('ID del cliente: ')).trim();
        const nombre = (await preguntar('Nombre completo: ')).trim();
        const cedula = (await preguntar('Numero de cedula: ')).trim();

        if (!id || !nombre || !cedula) {
          console.log('[ERROR] Todos los campos son obligatorios.');
        } else {
          const nuevoCliente = registrarMiembro(admin, id, nombre, cedula);
          clientes.push(nuevoCliente);
        }
        break;
      }

      case '2': {
        console.log('[CREACION DE PLAN]');
        const nombrePlan = (await preguntar('Nombre del plan (ej. Mensual, Trimestral): ')).trim();
        const precio = parseFloat(await preguntar('Precio en COP: '));
        const dias = parseInt(await preguntar('Duracion en dias (ej. 30): '));

        if (!nombrePlan || isNaN(precio) || isNaN(dias)) {
          console.log('[ERROR] Datos invalidos.');
        } else {
          const nuevoPlan = crearPlan(planes.length + 1, nombrePlan, precio, dias);
          planes.push(nuevoPlan);
          console.log(`[OK] Plan "${nuevoPlan.nombre}" ($${nuevoPlan.precio}) agregado al catalogo.`);
        }
        break;
      }

      case '3': {
        console.log('[REGISTRAR PAGO DE MENSUALIDAD]');
        if (clientes.length === 0) {
          console.log('[AVISO] No hay clientes registrados.');
          break;
        }
        if (planes.length === 0) {
          console.log('[AVISO] No hay planes creados todavia.');
          break;
        }

        console.log('Seleccione el cliente:');
        clientes.forEach((c, i) => console.log(`  ${i + 1}. ${c.nombre} (Cedula: ${c.cedula})`));
        const idxC = parseInt(await preguntar(`Elija cliente [1-${clientes.length}]: `)) - 1;
        const cli = clientes[idxC];

        console.log('Planes disponibles:');
        planes.forEach((p, i) => console.log(`  ${i + 1}. ${p.nombre} - $${p.precio} (${p.duracionDias} dias)`));
        const idxP = parseInt(await preguntar(`Elija plan [1-${planes.length}]: `)) - 1;
        const pla = planes[idxP];

        if (cli && pla) {
          registrarPago(admin, cli, pla);
          console.log('[INFO] ' + consultarMembresia(cli));
        } else {
          console.log('[ERROR] Seleccion invalida.');
        }
        break;
      }

      case '4': {
        console.log('[VALIDAR INGRESO AL GIMNASIO]');
        if (clientes.length === 0) {
          console.log('[AVISO] No hay clientes registrados.');
          break;
        }

        console.log('Seleccione el cliente a ingresar:');
        clientes.forEach((c, i) => console.log(`  ${i + 1}. ${c.nombre}`));
        const idx = parseInt(await preguntar(`Elija cliente [1-${clientes.length}]: `)) - 1;
        const cli = clientes[idx];

        if (cli && validarIngreso(cli)) {
          const asistencia = registrarAsistencia(cli, listaAsistencias);
          const aforoActual = calcularAforo(listaAsistencias);
          console.log(`[AFORO ACTUAL] ${aforoActual} persona(s) entrenando en el gimnasio.`);

          const salida = (await preguntar('¿Desea marcar salida ahora mismo? (s/n): ')).trim().toLowerCase();
          if (salida === 's') {
            marcarSalida(asistencia);
            const aforoPost = calcularAforo(listaAsistencias);
            console.log(`[AFORO ACTUAL] ${aforoPost} persona(s) entrenando en el gimnasio.`);
          }
        }
        break;
      }

      case '5': {
        console.log('[ENVIAR RECORDATORIO DE VENCIMIENTO]');
        if (clientes.length === 0) {
          console.log('[AVISO] No hay clientes registrados.');
          break;
        }
        console.log('Seleccione el cliente para enviar recordatorio:');
        clientes.forEach((c, i) => console.log(`  ${i + 1}. ${c.nombre}`));
        const idx = parseInt(await preguntar(`Elija cliente [1-${clientes.length}]: `)) - 1;
        const cli = clientes[idx];
        if (cli) {
          enviarRecordatorio(admin, cli);
        } else {
          console.log('[ERROR] Cliente no valido.');
        }
        break;
      }

      case '6': {
        console.log('[REPORTE GENERAL DE CLIENTES]');
        console.log(generarReporte(admin, clientes));
        break;
      }

      case '0':
        console.log(`[LOGOUT] Cerrando sesion de Administrador...`);
        volver = true;
        break;

      default:
        console.log('[ERROR] Opcion no valida.');
        break;
    }
  }
}

// -------------------------------------------------------------
// MODULO 2: ENTRENADOR (Funciones)
// -------------------------------------------------------------
async function moduloEntrenador() {
  iniciarSesion(entrenador);
  let volver = false;

  while (!volver) {
    console.log('\n------------------------------------------------------');
    console.log(`      MODULO ENTRENADOR - Sesion: ${entrenador.nombre}`);
    console.log('------------------------------------------------------');
    console.log('1. Diseñar Rutina');
    console.log('2. Asignar Rutina a Cliente');
    console.log('3. Registrar Evolucion Fisica de Cliente');
    console.log('4. Ver Rutinas Creadas');
    console.log('5. Programar Clase Grupal');
    console.log('0. Cerrar Sesion (Volver al inicio)');
    console.log('------------------------------------------------------');

    const opt = (await preguntar('Seleccione una opcion [0-5]: ')).trim();
    console.log('......................................................');

    switch (opt) {
      case '1': {
        console.log('[DISEÑO DE RUTINA]');
        const nombreRutina = (await preguntar('Nombre de la rutina (ej. Fuerza Basica): ')).trim();
        const objetivo = (await preguntar('Objetivo de la rutina (ej. Hipertrofia): ')).trim();

        if (!nombreRutina || !objetivo) {
          console.log('[ERROR] Nombre y objetivo son requeridos.');
          break;
        }

        const idRutina = rutinasCreadas.length + 1;
        const nuevaRutina = crearRutina(idRutina, nombreRutina, objetivo, entrenador.nombre);
        rutinasCreadas.push(nuevaRutina);

        console.log('\n--- Carga de ejercicios por parte del entrenador ---');
        let agregarMas = true;
        let numEj = 1;

        while (agregarMas) {
          console.log(`\nEjercicio #${numEj}:`);
          const dia = (await preguntar('  Dia o grupo muscular (ej. Lunes, Pecho): ')).trim();
          const nombreEj = (await preguntar('  Nombre del ejercicio: ')).trim();
          const series = parseInt(await preguntar('  Series: '));
          const reps = parseInt(await preguntar('  Repeticiones: '));

          if (dia && nombreEj && !isNaN(series) && !isNaN(reps)) {
            agregarEjercicio(nuevaRutina, dia, nombreEj, series, reps);
            numEj++;
          } else {
            console.log('  [AVISO] Ejercicio omitido por datos incompletos.');
          }

          const cont = (await preguntar('¿Desea agregar otro ejercicio? (s/n): ')).trim().toLowerCase();
          if (cont !== 's') {
            agregarMas = false;
          }
        }

        mostrarRutina(nuevaRutina);
        break;
      }

      case '2': {
        console.log('[ASIGNAR RUTINA A CLIENTE]');
        if (clientes.length === 0) {
          console.log('[AVISO] No hay clientes registrados.');
          break;
        }
        if (rutinasCreadas.length === 0) {
          console.log('[AVISO] No hay rutinas creadas todavia.');
          break;
        }

        console.log('Seleccione el cliente:');
        clientes.forEach((c, i) => console.log(`  ${i + 1}. ${c.nombre}`));
        const idxC = parseInt(await preguntar(`Elija cliente [1-${clientes.length}]: `)) - 1;
        const cli = clientes[idxC];

        console.log('Seleccione la rutina:');
        rutinasCreadas.forEach((r, i) => console.log(`  ${i + 1}. ${r.nombre} (Objetivo: ${r.objetivo})`));
        const idxR = parseInt(await preguntar(`Elija rutina [1-${rutinasCreadas.length}]: `)) - 1;
        const rut = rutinasCreadas[idxR];

        if (cli && rut) {
          asignarRutina(entrenador, cli, rut);
        } else {
          console.log('[ERROR] Datos invalidos.');
        }
        break;
      }

      case '3': {
        console.log('[REGISTRO DE EVOLUCION FISICA]');
        if (clientes.length === 0) {
          console.log('[AVISO] No hay clientes registrados.');
          break;
        }

        console.log('Seleccione el cliente a evaluar:');
        clientes.forEach((c, i) => console.log(`  ${i + 1}. ${c.nombre}`));
        const idx = parseInt(await preguntar(`Elija cliente [1-${clientes.length}]: `)) - 1;
        const cli = clientes[idx];

        if (!cli) {
          console.log('[ERROR] Cliente no valido.');
          break;
        }

        const peso = parseFloat(await preguntar('Peso actual en kg: '));
        const cintura = parseFloat(await preguntar('Medida de cintura en cm: '));

        if (isNaN(peso) || isNaN(cintura)) {
          console.log('[ERROR] Valores invalidos.');
        } else {
          registrarEvolucionFisica(entrenador, cli, peso, cintura);
        }
        break;
      }

      case '4': {
        console.log('[CATALOGO DE RUTINAS CREADAS]');
        if (rutinasCreadas.length === 0) {
          console.log('(Aun no hay rutinas creadas)');
        } else {
          rutinasCreadas.forEach(r => mostrarRutina(r));
        }
        break;
      }

      case '5': {
        console.log('[PROGRAMAR CLASE GRUPAL]');
        const nombreClase = (await preguntar('Nombre de la clase (ej. Spinning, Yoga): ')).trim();
        const horario = (await preguntar('Horario (ej. 07:00 AM, 06:00 PM): ')).trim();
        const cupos = parseInt(await preguntar('Capacidad maxima de cupos: ')) || 15;

        if (!nombreClase || !horario) {
          console.log('[ERROR] Nombre y horario son obligatorios.');
        } else {
          const idClase = clasesGrupales.length + 1;
          const nuevaClase = crearClaseGrupal(idClase, nombreClase, cupos, horario, entrenador.nombre);
          clasesGrupales.push(nuevaClase);
          console.log(`[OK] Entrenador ${entrenador.nombre} programo la clase: "${nombreClase}" (${horario})`);
        }
        break;
      }

      case '0':
        console.log(`[LOGOUT] Cerrando sesion de Entrenador...`);
        volver = true;
        break;

      default:
        console.log('[ERROR] Opcion no valida.');
        break;
    }
  }
}

// -------------------------------------------------------------
// MODULO 3: CLIENTE (Funciones)
// -------------------------------------------------------------
async function moduloCliente() {
  if (clientes.length === 0) {
    console.log('\n[AVISO] No hay ningun cliente registrado en el sistema.');
    console.log('El Administrador debe registrarte primero (opcion 1 en el menu de Administrador).');
    return;
  }

  console.log('\nSeleccione que cliente va a ingresar:');
  clientes.forEach((c, i) => console.log(`  ${i + 1}. ${c.nombre} (Cedula: ${c.cedula})`));
  const idx = parseInt(await preguntar(`Elija su usuario [1-${clientes.length}]: `)) - 1;
  const clienteActual = clientes[idx];

  if (!clienteActual) {
    console.log('[ERROR] Seleccion no valida.');
    return;
  }

  iniciarSesion(clienteActual);
  let volver = false;

  while (!volver) {
    console.log('\n------------------------------------------------------');
    console.log(`       MODULO CLIENTE - Bienvenido/a: ${clienteActual.nombre}`);
    console.log('------------------------------------------------------');
    console.log('1. Aceptar Tratamiento de Datos');
    console.log('2. Consultar Membresia');
    console.log('3. Consultar Rutina');
    console.log('4. Reservar Clase Grupal');
    console.log('5. Cancelar Reserva de Clase');
    console.log('6. Consultar Mi Evolucion Fisica');
    console.log('7. Ver Ficha Completa');
    console.log('0. Cerrar Sesion (Volver al inicio)');
    console.log('------------------------------------------------------');

    const opt = (await preguntar('Seleccione una opcion [0-7]: ')).trim();
    console.log('......................................................');

    switch (opt) {
      case '1':
        aceptarTratamientoDatos(clienteActual);
        break;

      case '2':
        console.log('[MI MEMBRESIA]');
        console.log(consultarMembresia(clienteActual));
        break;

      case '3':
        console.log('[MI RUTINA]');
        console.log(consultarRutina(clienteActual));
        if (clienteActual.rutinaAsignada) {
          mostrarRutina(clienteActual.rutinaAsignada);
        }
        break;

      case '4': {
        console.log('[RESERVA DE CLASE GRUPAL]');
        if (clasesGrupales.length === 0) {
          console.log('[AVISO] No hay clases grupales programadas por el entrenador todavia.');
          break;
        }

        console.log('Clases grupales disponibles:');
        clasesGrupales.forEach((cg, i) => {
          console.log(`  ${i + 1}. [${cg.idClase}] ${cg.nombre} | Horario: ${cg.horario} | Cupos: ${cg.inscritos.length}/${cg.capacidadMax}`);
        });

        const sel = parseInt(await preguntar(`Seleccione la clase [1-${clasesGrupales.length}]: `)) - 1;
        const claseElegida = clasesGrupales[sel];

        if (claseElegida) {
          reservarClase(clienteActual, claseElegida);
        } else {
          console.log('[ERROR] Opcion no valida.');
        }
        break;
      }

      case '5': {
        console.log('[CANCELAR RESERVA]');
        if (clienteActual.reservas.length === 0) {
          console.log('[INFO] No tienes ninguna reserva activa.');
          break;
        }

        console.log('Tus reservas activas:');
        clienteActual.reservas.forEach((res, i) => console.log(`  ${i + 1}. ${res}`));

        const sel = parseInt(await preguntar(`Seleccione la reserva a cancelar [1-${clienteActual.reservas.length}]: `)) - 1;
        const nombreClase = clienteActual.reservas[sel];

        if (nombreClase) {
          const claseObj = clasesGrupales.find(c => c.nombre === nombreClase);
          if (claseObj) {
            cancelarReserva(clienteActual, claseObj);
          } else {
            const pos = clienteActual.reservas.indexOf(nombreClase);
            clienteActual.reservas.splice(pos, 1);
            console.log(`[OK] Reserva cancelada.`);
          }
        } else {
          console.log('[ERROR] Opcion no valida.');
        }
        break;
      }

      case '6': {
        console.log('[MI EVOLUCION FISICA]');
        if (clienteActual.historialEvolucion.length === 0) {
          console.log('Aun no tienes chequeos fisicos registrados.');
        } else {
          clienteActual.historialEvolucion.forEach(ev => {
            console.log(`  * Fecha: ${new Date(ev.fecha).toLocaleDateString()} | Peso: ${ev.pesoActual} kg | Cintura: ${ev.medidaCintura} cm | IMC: ${ev.imc} | Evaluador: ${ev.evaluadoPor}`);
          });
        }
        break;
      }

      case '7': {
        console.log(`[FICHA DEL CLIENTE: ${clienteActual.nombre}]`);
        console.log(`* ID: ${clienteActual.idUsuario} | Cedula: ${clienteActual.cedula}`);
        console.log(`* Estado Activo: ${clienteActual.estadoActivo}`);
        console.log(`* Membresia: ${consultarMembresia(clienteActual)}`);
        console.log(`* Rutina: ${consultarRutina(clienteActual)}`);
        console.log(`* Total de asistencias: ${clienteActual.historialAsistencias.length}`);
        console.log(`* Reservas activas: ${clienteActual.reservas.length > 0 ? clienteActual.reservas.join(', ') : 'Ninguna'}`);
        break;
      }

      case '0':
        console.log(`[LOGOUT] Cerrando sesion de ${clienteActual.nombre}...`);
        volver = true;
        break;

      default:
        console.log('[ERROR] Opcion no valida.');
        break;
    }
  }
}

// -------------------------------------------------------------
// PANTALLA PRINCIPAL: INICIO DE SESION POR ROLES
// -------------------------------------------------------------
async function main() {
  let salir = false;

  while (!salir) {
    console.log('\n======================================================');
    console.log('       SISTEMA DE GESTION DE GIMNASIO - INICIO');
    console.log('======================================================');
    console.log('¿Quien va a entrar al programa?');
    console.log('1. Administrador');
    console.log('2. Entrenador');
    console.log('3. Cliente');
    console.log('0. Salir del programa');
    console.log('======================================================');

    const rol = (await preguntar('Seleccione una opcion [0-3]: ')).trim();

    switch (rol) {
      case '1':
        await moduloAdministrador();
        break;
      case '2':
        await moduloEntrenador();
        break;
      case '3':
        await moduloCliente();
        break;
      case '0':
        console.log('\n[FIN] Saliendo del sistema. Hasta pronto.');
        salir = true;
        break;
      default:
        console.log('[ERROR] Opcion no valida. Seleccione un numero entre 0 y 3.');
        break;
    }
  }

  rl.close();
}

main();
