# Ficha de equipo y dominio — Sesión 1

Plantilla de la **actividad de cierre de la Clase 1**. Se diligencia en clase, en equipo, y se entrega al final de la sesión.

- **Equipos:** de 2 a 3 integrantes, fijos durante todo el curso.
- **Entrega:** una ficha por equipo.
- **Cada equipo elige un dominio distinto.**

---

## 1. Identificación del equipo

| Campo | Respuesta |
|---|---|
| Nombre del equipo | _(EQUIPO 01)_ |
| Fecha | _(completar)_ |

| # | Integrante | Correo | Rol / responsabilidad |
| --- | --- | --- | --- |
| 1 | _(Harrison Ospina Salazar)_ | _(ospinaharrison11@gmail.com)_ | Coordinación _(obligatorio)_ |
| 2 | _(Juan David Bedoya Carmona)_ | _(bedoyacarmonajuandavid@gmail.com)_ | _(completar)_ |
| 3 | _(Caleb Alejandro Mora Mejia)_ | _(camora8930@gmail.com)_ | _(completar)_ |
| 4| _(Maicol Steven Laverde Ocampo)_ | _(maicollaverde23@gmail.com)_ | _(completar)_ |


> El rol no es definitivo: se ajusta en la bitácora de gestión. Lo que sí queda fijo hoy es **quién coordina**.

---

## 2. Dominio propuesto

**Dominio:** _(una línea — el sector o la actividad; e.g. "CONTROL DE USUARIOS, RUTINAS Y PAGOS EN GYM")_

**Problema que se quiere resolver** _(máximo tres líneas: No hay control de acceso, no se saben cuales son las horas pico, para tener una mejor distribución de los usuarios en el gym, no hay un libro contable claro donde el admin, sepa la retención de usuarios y/o usuarios nuevos. No hay control sobre las ganancias y gastos.No hay rutinas fijas para ninguna personas(musculación, perdida de peso; etc..). no hay alertas sobre el vencimiento de la mensualidad.)_:

_(completar)_

**Cómo se hace hoy sin software** _(Las cuentas e información de usuario se manejan de manera tradicional en un libro grande, cuando hay clases no hay confirmación por parte de usuarios y no se sabría el aforo, ni los días o horarios pico, no se tiene un recuento fijo de usuarios ni rutinas establecidas, no hay alertas de vencimiento de mensualidad.)_:

_(completar)_

---

## 3. Usuarios del sistema

| Tipo de usuario | Qué necesita hacer en el sistema | ¿Tenemos acceso para entrevistarlo? |
| --- | --- | --- |
| _(Administrador)_ | _( (tiene un control sobre la retención de clientes, clientes nuevos y antiguos, ver las rutinas y la situación contable “gastos y ganancias” y tiene alertas días antes sobre vencimiento de mensualidades).)_ | Sí / No — _(quién es)_ |
| _(Cliente)_ | _((puede ver la fecha de pago de su mensualidad, ver el tiempo que lleva en el gym, y rutinas). )_ | Sí / No — _(quién es)_ |

> Al menos **un usuario real y accesible** es obligatorio: en la Clase 3 hay que hacerle una sesión de elicitación de verdad.

---

## 4. Capacidad del equipo

**¿Por qué este equipo puede levantar requisitos de este dominio?** _(acceso a usuarios reales, alguien trabaja o trabajó ahí, experiencia previa con el proceso, etc.)_

_(completar)_

---

## 5. Alcance tentativo

**Tres cosas que el sistema sí debe hacer**:

1. _(Consultar fecha de pago y estado de mensualidad)_
2. _(Consultar/asignar rutinas)_
3. _(Registrar y visualizar gastos e ingresos (libro contable))
4. _(Calcular aforo disponible en tiempo real)
5. _(Reportar horarios/días pico según confirmaciones de asistencia)
6. _(Generar alertas automáticas de vencimiento de mensualidad)
7. _(Calcular métricas de retención (nuevos vs. antiguos))

**Tres cosas que el sistema no va a hacer**:

1. _(Inventario o estado de máquinas)_
2. _(pagos en línea)_
3. _(Historial de cambios/versiones de datos de usuario)_

---

## 6. Autoverificación

- [ ] Hay **usuarios reales accesibles** para entrevistar en la Clase 3.
- [ ] El dominio da para **10 requisitos funcionales y 5 no funcionales** sin inventarlos.
- [ ] Los **tres casos críticos** se ven implementables end-to-end en seis semanas.
- [ ] El proyecto **no fue desarrollado** en otra asignatura ni se está reciclando.
- [ ] No es demasiado grande _(una red social completa)_ ni demasiado pequeño _(una calculadora)_.
- [ ] El sistema **maneja datos personales**: Sí / No. Si es Sí, aplica la Ley 1581 de 2012 en el numeral 10 de la Nota 1.

---

## Ejemplo diligenciado

Referencia de nivel de detalle esperado. **No se puede usar este dominio.**

- Dominio: CONTROL DE USUARIOS, RUTINAS Y PAGOS EN GYM
Problema: No hay control de acceso, no se saben cuales son las horas pico, para tener una mejor distribución de los usuarios en el gym, no hay un libro contable claro donde el admin, sepa la retención de usuarios y/o usuarios nuevos. No hay control sobre las ganancias y gastos.No hay rutinas fijas para ninguna personas(musculación, perdida de peso; etc..). no hay alertas sobre el vencimiento de la mensualidad.
Hoy : las cuentas e información de usuario se manejan de manera tradicional en un libro grande, cuando hay clases no hay confirmación por parte de usuarios y no se sabría el aforo, ni los días o horarios pico, no se tiene un recuento fijo de usuarios ni rutinas establecidas, no hay alertas de vencimiento de mensualidad.
Usuario: cliente (puede ver la fecha de pago de su mensualidad, ver el tiempo que lleva en el gym, y rutinas). El administrador o dueño (tiene un control sobre la retención de clientes, clientes nuevos y antiguos, ver las rutinas y la situación contable “gastos y ganancias” y tiene alertas días antes sobre vencimiento de mensualidades).
Si hace: ver fechas de pagos, rutinas, ver los gastos y ganancias, ver aforo disponible y horarios pico. Alerta sobre vencimiento de mensualidades
No hace: inventario o estado de maquinas, pagos en plataforma, no hay un historial sobre el cambio fisico de las personas.



---

## Flujo del Proyecto

```bash
UI → Controlador → ServicioIA «interfaz» → AdaptadorProveedor → API del modelo → AdaptadorSimulado → respuesta fija (pruebas)
```