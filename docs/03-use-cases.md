# Taller 4 · Casos de uso

Se trabaja en clase, por equipo.

- **Entrega:** en el **repositorio del equipo en GitHub**, diligenciando el enunciado con los puntos 1 a 5 y subiendo el diagrama al repositorio *(imagen exportada o fuente PlantUML/draw.io)*.
- Herramienta: draw.io, PlantUML, StarUML o Visual Paradigm.
![img](/docs/diagram/diagrama01.png)
---

## 1. Actores y casos

**Actores**

| Actor         | Tipo *(humano / sistema externo / tiempo)* | Principal o secundario | Objetivo en el sistema |
| ------------- | ------------------------------------------ | ---------------------- | ---------------------- |
| *(Miembro gym)* | *(humano)*                              | *(Principal)*          | *(Consulta su membresía, reserva,cancela clases, ve su rutina y su evolución.)*          |

|*(Administrador del gimnasio)* | *(humano)*                              | *(Principal)*          | *(Gestiona las membresías, las clases, los instructores y la evolución de los miembros.)*    

|/(Servicio de SMS)      |(*sistema externo)*                              | *(secundario)*          | *(Envía recordatorios de clases y notificaciones a los miembros.)*          |

- Roles, no personas. La base de datos y el servidor **no** son actores.
- Si el proyecto tiene componente de IA, el **proveedor del modelo** es un actor secundario.

**Casos de uso**

| ID    | Nombre *(verbo en infinitivo + objeto)* | Actor principal | RF que cubre |
| ----- | --------------------------------------- | --------------- | ------------ |
| CU-01 | *(Iniciar sesión)*                      | *(	Miembro, Administrador)*   | *(RF02)*    |
| …     |                                         |                 |              |
| CU-02 | *(Registrar miembro)*                      | *(	Administrador)*   |      *(RF01)*    |
| …     |                                         |                 |              |
| CU-03 | *(Aceptar tratamiento de datos)*        | *(	Miembro )*             |   |  *(RF01)*    |
| …     |                                         |                 |              |
| CU-04 | *(Gestionar planes de membresía)*       | *(	Administrador)*            | *(RF03)*    |
| …     |                                         |                 |              |
| CU-05 | *(Registrar pago de membresía)*         | *(Administrador)*              | *(RF04)*    |
| …     |                                         |                 |              |
| CU-06 | *(Emitir comprobante)*                  | *(Administrador)*              | *(RF04)*    |
| …     |                                         |                 |              |
| CU-06 | *(Validar ingreso)*                     | *(Administrador)*              | *(RF05)*    |
| …     |                                         |                 |              |
| CU-06 | *(Reservar clase grupal)*               | *(Miembro)*                    | *(RF06)*    |(<<include>> Consultar clases) 
| …     |                                         |                 |              |
| CU-07 | *(Cancelar reserva clase grupal)*       | *(Miembro)*     |              | *(RF07)*    |(	<<extend>> Avisar a lista/clase)
| CU-08 | *(Consultar rutina)*                    | *(Miembro)*     |              | *(RF08)*    |
| CU-09 | *(Asignar rutina)*                      | *(Administrador)*|             | *(RF07)*    |
| CU-10 | *(Registrar evolución física)*          | *(Administrador)*|             | *(RF08)*    |
| CU-11 | *(Enviar recordatorio de vencimiento)*  | *(Administrador)*|             | *(RF09)*    |
| CU-12 | *(Generar reporte de ingresos y asistencia)*| *(Administrador)*|         | *(RF10)*    |
| CU-13 | *(Consultar membresía)*                 | *(Miembro)*|                   | *(	RF04/RF05)*|

- **Mínimo 6 casos**, todos con al menos un RF.

---

## 2. Diagrama de casos de uso

Un solo diagrama con:

- **Límite del sistema** con su nombre; los casos dentro, los actores fuera.
- Todos los casos del punto 1 y sus asociaciones con los actores.
- Al menos una relación **`«include»`, `«extend»` o generalización**, justificada en una línea. Si el dominio no pide ninguna, se escribe por qué.

**Imagen o enlace al diagrama:** <<link>>

**Justificación de las relaciones:**

- *(completar)*

---

## 3. Casos críticos

Los tres casos que el prototipo implementa **de punta a punta** *(de la interfaz a la persistencia)*.

| Caso      | Por qué es crítico *(valor / frecuencia / riesgo técnico)* |
| --------- | ---------------------------------------------------------- |
| *(CU-0#)* | *(completar)*                                              |
| *(CU-0#)* | *(completar)*                                              |
| *(CU-0#)* | *(completar)*                                              |

- **Máximo uno** puede ser el caso de IA; los otros dos son funcionalidad con persistencia propia.
- No valen iniciar sesión.

---

## 4. Descripción detallada de los casos críticos

Una tabla por caso crítico.

| Campo                    | Contenido                                                    |
| ------------------------ | ------------------------------------------------------------ |
| **ID y nombre**          | *(completar)*                                                |
| **Actor principal**      | *(completar)*                                                |
| **Actores secundarios**  | *(completar o —)*                                            |
| **Requisitos que cubre** | *(RF-0#, RNF-0#)*                                            |
| **Precondiciones**       | *(completar)*                                                |
| **Disparador**           | *(completar)*                                                |
| **Frecuencia**           | *(completar, con la fuente del Taller 3 o de la entrevista)* |

**Flujo principal**

1. *(El actor…)*
2. *(El sistema…)*
3. …

**Flujos alternos** *(se logra el objetivo por otro camino)*

- **#a.** *(condición → qué hace el sistema → a qué paso vuelve)*

**Excepciones** *(no se logra el objetivo)*

- **#a.** *(condición → qué hace el sistema → cómo termina)*

**Postcondiciones**

- **Éxito:** *(completar)*
- **Garantía mínima:** *(completar)*

- **Mínimo por caso:** 5 pasos en el flujo principal, **un flujo alterno y una excepción**.
- Pasos con un sujeto *(el actor o el sistema)* y sin detalles de interfaz: *"elige la franja"*, no *"hace clic en el botón"*.
- Si uno de los críticos es el de IA, sus excepciones incluyen **timeout, cuota agotada y respuesta malformada**.

---

## 5. Trazabilidad

**Columna de caso de uso de la matriz** *(la que se abrió en la Clase 3)*:

| Requisito | Fuente | Caso de uso |
| --- | --- | --- |
| RF-01 | *(P# o documento)* | *(CU-0#)* |
| … | | |

**Huecos detectados:**

| Hueco | Cuál | Qué se hace |
| --- | --- | --- |
| RF sin caso de uso | *(completar o "ninguno")* | *(se crea el caso / el RF sale del catálogo)* |
| Caso de uso sin RF | *(completar o "ninguno")* | *(se agrega el RF / el caso sale del alcance)* |

- Todo lo que cambie el catálogo va al **registro de control de cambios** de la bitácora.

---

## Ejemplo diligenciado

Referencia de nivel de detalle. Mismo dominio de los talleres anteriores: **no se puede usar.**

**1. Actores** *(barbería; extracto)*

| Actor | Tipo | Principal o secundario | Objetivo |
| --- | --- | --- | --- |
| Cliente | Humano | Principal | Conseguir un turno sin llamar |
| Barbero | Humano | Principal | Saber a quién atiende y registrar quién no llegó |
| Dueño | Humano *(hereda de Barbero)* | Principal | Cerrar caja y mantener la clientela |
| Proveedor de IA | Sistema externo | Secundario | Redactar el texto del recordatorio |

**1. Casos** *(extracto)*

| ID | Nombre | Actor principal | RF |
| --- | --- | --- | --- |
| CU-01 | Reservar turno | Cliente | RF-01 |
| CU-02 | Consultar franjas libres | Cliente | RF-01 |
| CU-03 | Cancelar turno | Cliente | RF-04 |
| CU-05 | Marcar turno no asistido | Barbero | RF-02 |
| CU-06 | Cerrar caja del día | Dueño | RF-05 |
| CU-07 | Redactar recordatorio con IA | Dueño | RF-08 |

**2. Relaciones:** CU-01 `«include»` CU-02, porque toda reserva pasa por consultar las franjas y el cliente también las consulta sin reservar. Dueño hereda de Barbero, porque el dueño también atiende una silla.

**3. Críticos**

| Caso                               | Por qué                                                                                                                |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| CU-01 Reservar turno               | Es el problema que se tiene es: el teléfono no para los sábados; ~40 al día; riesgo de dos reservas en la misma franja |
| CU-06 Cerrar caja del día          | Todos los días; cálculo sobre los turnos atendidos                                                                     |
| CU-07 Redactar recordatorio con IA | El caso de IA; reduce los no asistidos *(P6)*                                                                          |

**4. Descripción** *(CU-07; CU-01 está completo en la Sesión 5)*

| Campo | Contenido |
| --- | --- |
| **Actor principal** | Dueño |
| **Actores secundarios** | Proveedor de IA |
| **Requisitos** | RF-08, RNF-04 *(respuesta en menos de 10 s)* |
| **Precondiciones** | Hay turnos *Reservados* para el día siguiente |
| **Disparador** | El dueño prepara los recordatorios al cierre del día |
| **Frecuencia** | Una vez al día |

1. El dueño pide los recordatorios del día siguiente.
2. El sistema lista los turnos *Reservados* de mañana.
3. El sistema envía al proveedor de IA la franja, el barbero y el nombre de pila de cada cliente, **sin teléfono**.
4. El proveedor devuelve un borrador de mensaje por turno.
5. El sistema valida que cada borrador traiga fecha y franja, y los muestra marcados como *texto generado*.
6. El dueño revisa, edita si quiere y aprueba.
7. El sistema guarda los mensajes aprobados listos para enviar.

- **5a.** Un borrador no trae fecha o franja: se descarta y se usa la plantilla fija para ese turno. Vuelve al paso 6.
- **6a.** El dueño descarta un borrador: el sistema usa la plantilla fija para ese turno. Vuelve al paso 6.
- **4a.** *(excepción)* El proveedor no responde en 10 s o devuelve HTTP 429: el sistema informa que la IA no está disponible, registra el evento y ofrece la plantilla fija para todos. El caso termina sin texto generado.

**Postcondiciones.** Éxito: cada turno de mañana tiene un mensaje aprobado. Garantía mínima: ningún dato de contacto sale hacia el proveedor.

**5. Huecos:** RF-06 *(reporte mensual de ingresos)* sin caso → se crea CU-09 Consultar reporte mensual. CU-04 Avisar a la lista de espera sin RF → se agrega RF-11 y se registra en el control de cambios.