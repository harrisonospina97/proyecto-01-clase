# Taller 4 · Casos de uso

Se trabaja en clase, por equipo.

- **Entrega:** en el **repositorio del equipo en GitHub**, diligenciando el enunciado con los puntos 1 a 5 y subiendo el diagrama al repositorio *(imagen exportada o fuente PlantUML/draw.io)*.
- Herramienta: draw.io, PlantUML, StarUML o Visual Paradigm.

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

![img](/docs/diagram/diagrama01.png)

**Justificación de las relaciones:**

- *(completar)*

---

## 3. Casos críticos

Los tres casos que el prototipo implementa **de punta a punta** *(de la interfaz a la persistencia)*.

| Caso      | Por qué es crítico *(valor / frecuencia / riesgo técnico)* |
| --------- | ---------------------------------------------------------- |
| *(CU-01#- confirmar asistencia)* | *(problema que tenemos: es que no se sabe el aforo de personas, por lo tanto no se saben la horas pico ni cuando esta mas lleno el gym. Riesgo: no hay espacio ni maquinas disponibles para uso)*                                              |
| *(CU-02#- registrar pago membresía)* | *(Problema que tenemos: es que no se puede registrar el pago de la membresía sin un método de pago claro.  Riesgo: posible fraude o error en caja)* 
                                             |
| *(CU-03#- consultar membresía)* | *(Problema que tenemos: es que no se puede consultar la información de la membresía de manera efectiva o rapida.  Riesgo: posible acceso no autorizado a información privada)*     

|*(CU-04#- Retencion de clientes)* | *(Problema que tenemos: es que no se puede retener a los clientes de manera efectiva.  Riesgo: posible perdida de clientes y disminución de ingresos)*

- **Máximo uno** puede ser el caso de IA; los otros dos son funcionalidad con persistencia propia.
- No valen iniciar sesión.

---

    ## 4. Descripción detallada de los casos críticos

Una tabla por caso crítico.

| Campo                    | Contenido                                                    |
| ------------------------ | ------------------------------------------------------------ |
| **ID y nombre**          | *(Administrador)*                                                |
| **Actor principal**      | *(Dueño/Administrador)*                                                |
| **Actores secundarios**  | *(coach, Miembros)*                                            |
| **Requisitos que cubre** | *(RF-10#, RF-13#)*                                            |
| **Precondiciones**       | *(hay reservas de clases personalizadas, consultar aforo disponible)*                                                |
| **Disparador**           | *(Diariamente no se sabe el aforo disponible real, el dueño o administrador debe actualizar la asistencia a clases de manera manual)*                                                |
| **Frecuencia**           | *(diariamente)* |

**Flujo principal**

1. *(El administrador debe revisar el libro de asistencia a clases)*
2. *(El administrador debe actualizar la información de aforo disponible en el sistema)*
3. *(El sistema debe actualizar la información de aforo disponible )*
4. *(El sistema debe mostrar las clases disponibles por semana y por hora)*
5. *(El sistema debe mostrar la confirmacion de la asistencia a clases)*

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
| RF-01 (Consultar fecha pago) | P2 | CU-13 |
| RF-02 (Consultar estado mensualidad) | P7 | CU-13 |
| RF-03 (Consultar rutinas asignadas) | P8 | CU-08 |
| RF-04 (Asignar rutinas) | P2 | CU-09 |
| RF-06 (Registrar ingresos) | P2 | CU-05 |
| RF-08 (Visualizar ingresos) | P2 | CU-12 |
| RF-09 (Alertas vencimiento) | P2 | CU-11 |
| RF-10 (Calcular aforo) | P2 | CU-06 (Validar ingreso) |
| RF-13 (Alertas vencimiento alt.) | P2 | CU-11 |

**Huecos detectados:**

| Hueco | Cuál | Qué se hace |
| --- | --- | --- |
| RF sin caso de uso | RF-05, RF-07, RF-11, RF-12, RF-14, RF-15, RF-16 | Se decidió sacar estos requisitos del alcance del proyecto (se eliminarán del catálogo) ya que no son urgentes para esta primera versión, permitiendo al equipo enfocarse en el núcleo del sistema. |
| Caso de uso sin RF explícito | CU-01, CU-02, CU-03, CU-04, CU-06 (Clases/Comprobante), CU-07, CU-10 | Se añadirán estos requisitos funcionales al catálogo original, dejando constancia en el registro de control de cambios, ya que son indispensables para el flujo del sistema. |

---

