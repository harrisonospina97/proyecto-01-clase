// ====================================================================
// MODELO: store.js - Base de datos local en memoria
// ====================================================================
const Store = {
  admin: {
    id: 1,
    nombre: 'Administrador Principal',
    cedula: '10203040',
    rol: 'Administrador'
  },
  entrenador: {
    id: 2,
    nombre: 'Entrenador de Planta',
    cedula: '70809010',
    rol: 'Entrenador'
  },

  // Listas de datos principales
  clientes: [],
  planes: [],
  rutinas: [],
  clases: [],
  asistencias: [],

  // Contador para generar IDs automáticos
  contador: { cliente: 0, plan: 0, rutina: 0, clase: 0, asistencia: 0, mensualidad: 0, evolucion: 0 },
  nextId(tipo) {
    this.contador[tipo] = (this.contador[tipo] || 0) + 1;
    return this.contador[tipo];
  }
};
