# Taller 3 · Elicitación cruzada de requerimientos

Enunciado del **Taller 3**. Se trabaja en clase, por parejas de equipos, y se entrega al final de la sesión.

- **Dinámica:** cada equipo entrevista a otro, que hace de **cliente** de su dominio, y luego se invierten los papeles.
- **Entrega:** en el **repositorio del equipo en GitHub**, diligenciando el enunciado con los puntos 1, 4, 5 y 6; las notas de la entrevista del punto 2 o 3 van como anexo en el mismo archivo.

---

## 1. Preparación

**Emparejamiento:** formar parejas de equipos con dominios distintos.

**Cómo funciona:** cada equipo pregunta **sobre su propio proyecto**. El otro equipo no responde sobre el suyo: se pone en el lugar del usuario del proyecto de quien pregunta. Si A hace inventario de materiales para técnicos, en la Ronda 1 B hace de almacenista de esa empresa y responde a las preguntas de A; en la Ronda 2, A hace de usuario del dominio de B.

- Que el cliente no conozca el dominio **es parte del ejercicio**: obliga a preguntar sin dar por sentado nada, y lo que el cliente improvisa se valida después con el cliente del proyecto.
- Lo que se evalúa hoy es la **técnica**: el guion, el sondeo, las notas y la conversión en requisitos con fuente. La verdad del dominio sale de la entrevista con el cliente del proyecto.
- **Este emparejamiento queda fijo:** el equipo que hace de cliente hoy es el **equipo cliente** para los proyectos que no tienen usuario real ni sustituto.

**Tarjeta de personaje:** el equipo entrevistador se la entrega al cliente al inicio, para que pueda responder con verosimilitud. Da el contexto, **no las respuestas**.

| Campo | Ejemplo *(barbería)* |
| --- | --- |
| Quién es | Dueño de la barbería, 15 años con el local |
| Qué hace en el día a día | Atiende una silla, contesta el teléfono y cierra caja |
| Cómo se hace hoy | Cuaderno de turnos y llamadas |
| Relación con la tecnología | Usa WhatsApp; nunca ha usado un computador para el negocio |

**Como cliente** *(del dominio del otro equipo)*:

- Leer la ficha de dominio y la tarjeta de personaje del equipo que va a entrevistar.
- Sostener el personaje toda la ronda *(e.g. "soy la dueña de la papelería, 12 años con el negocio, no uso computador")*.
- Responder con **problemas y situaciones del día a día**, no con soluciones técnicas. Si no sabe algo, puede inventarlo, siempre que sea verosímil con la tarjeta.

**Como entrevistador** *(del dominio propio)*:
/////ENTREVISTA DE NUESTRO EQUIPO AL OTRO

**¿Qué tipo de metodología utilizan y por qué?** Se utiliza la **metodología en cascada**, ya que los requerimientos del cliente son muy específicos para este método

**Principal reto o problema que soluciona el software:** Resolver el problema de que los vendedores puedan realizar sus tareas diarias más rápidamente y con **mejor optimización**

**¿El software necesita licencia, permisos o apegarse a alguna ley?** No, en este caso **no se necesita ninguna licencia ni permiso**

**¿Qué lenguaje de programación van a utilizar?** El lenguaje de programación a utilizar será **Python**.

**¿Es un equipo de desarrollo conjunto o jerárquico?** Se estructurará como un **equipo conjunto**

**¿El software será para dispositivos móviles, computadores o mixto?** Lo ideal será desarrollar un software de tipo **mixto**

**¿El acceso al software será solo para el dueño o también para usuarios?** La plataforma estará **abierta libremente**, tanto para usuarios como para los dueños

**¿El almacenamiento del software será local o en la nube?** El almacenamiento se realizará **en la nube**

**¿El software es fácil de manejar para los usuarios o el dueño?** Sí, está diseñado de manera **totalmente accesible y fácil**, tanto para los usuarios como para personas sin conocimientos previos[3].

**Banco de preguntas por tipo:** plantillas que sirven para cualquier dominio. Se reemplaza lo que va entre guillemets *(«proceso», «elemento»)* por el vocabulario del proyecto propio. **Copiarlas sin adaptar no cuenta**: una pregunta que podría hacerse en cualquier proyecto no saca requisitos de este.

| Tipo | Para qué | Plantillas |
| --- | --- | --- |
| **Contexto** | Entender el rol y el proceso completo | ¿Cuál es su papel en «el negocio / el área»? · ¿Cómo se hace hoy «el proceso», desde que empieza hasta que termina? · ¿Quién más participa? |
| **Abierta** | Encontrar el dolor | ¿Qué es lo que más le complica de «el proceso»? · ¿Qué le quita más tiempo en la semana? · Si pudiera cambiar una sola cosa, ¿cuál sería? |
| **Sondeo** | Profundizar en una respuesta | ¿Por qué? · ¿Me cuenta la última vez que pasó? · ¿Qué hizo en ese momento? · ¿Qué quiere decir con «término que usó el cliente»? |
| **Excepción** | Sacar flujos alternos | ¿Qué pasa cuando «el elemento» falta, llega tarde o viene mal? · ¿Y si la persona responsable no está? · ¿Qué hace cuando se equivoca al registrar algo? |
| **Cuantitativa** | Sacar RNF medibles | ¿Cuántos «registros» maneja al día o al mes? · ¿Cuántas personas lo hacen al mismo tiempo? · ¿Cuánto tiempo toma hoy? · ¿Cuánto es aceptable esperar? |
| **Datos y control** | Sacar permisos, auditoría y datos personales | ¿Quién puede ver o cambiar «la información»? · ¿Necesita saber quién hizo cada cambio y cuándo? · ¿Qué datos de personas se guardan? |
| **Cierre** | No dejar nada por fuera | ¿Hay algo que no le pregunté y debería saber? · ¿Con quién más debería hablar? · ¿Qué documentos o formatos usa hoy y me los puede mostrar? |

- **Evitar:** preguntas sobre la solución *("¿quiere una app móvil?")*, inductoras *("¿no le parece que sería mejor…?")* y las que se responden con sí o no sin dar información.

**Guion de entrevista**

| # | Pregunta | Tipo *(contexto / abierta / sondeo / excepción / cuantitativa / datos y control / cierre)* |
| --- | --- | --- |
| P1 | *(completar)* | *(completar)* |
| P2 | *(completar)* | *(completar)* |
| … | | |
| P12 | *(completar)* | *(completar)* |

- **Mínimo:** dos preguntas de **excepción** y dos **cuantitativas**. De ellas salen los flujos alternos y los RNF.

**Roles**

| Rol | Integrante |
| --- | --- |
| Entrevistador | *(completar)* |
| Anotador | *(completar)* |
| Observador | *(completar)* |

> **Equipo de 2:** el anotador asume también la observación. **Equipo de 4:** el cuarto integrante lleva el tiempo y anota las preguntas de sondeo que surjan.

---

## 2. Ronda 1

El **equipo A** entrevista al **equipo B**, que hace de cliente del dominio de A.

- 12 minutos exactos: el docente marca el tiempo.
- El anotador registra las respuestas **textuales**, numeradas con la pregunta que las originó *(P1, P2…)*. Si una respuesta abre un tema nuevo, la pregunta de sondeo se anota como *P4a, P4b*.
- El observador anota contradicciones, jerga del dominio y lo que el cliente evita responder.

---

## 3. Ronda 2

Se invierten los papeles: el **equipo B** entrevista al **equipo A**. Mismas reglas.

///ENTREVISTA DEL OTRO EQUIPO PARA NOSOTROS
 ¿Conoce que es el dropshipping?  Tengo un conocimiento básico de lo que es el dropshipping.
¿Qué procesos crees que se hacen en el dropshipping? venta de productos de manera digital.
 ¿Cómo crees que se hacen los procesos del dropshipping hoy en día sin algún programa?  Yendo de manera física o manual. 
 ¿Crees que este programa puede ayudar a optimizar los procesos del dropshipping?  Sí, facilitará los procesos. 
 Sabiendo que el dropshipping, ¿cuáles crees que son los procesos más importantes que debe realizar el programa?  Son procesos de compra y venta y los pagos.
(0:35) ¿Qué errores suceden normalmente cuando se hace sin un programa?  Error capa 8.
 ¿Qué tarea te gustaría que se hiciera automáticamente? Los descuentos y el rastreo de envíos. ¿Cuánto tiempo crees que se utiliza normalmente en estas tareas cuando se hace manualmente? Normalmente demoraría horas.
 ¿Qué información crees que debería tener el usuario al momento de usar el programa? Información de ofimática básica.
 En base a estas preguntas, ¿crees que el proyecto Nexus puede resolver este tipo de problemas? Sí, resuelve el problema principal.

---

## 4. Análisis

Convertir las notas propias en requisitos candidatos. Todavía no es el catálogo final: es lo que se va a confirmar con el cliente del proyecto.

**Requisitos funcionales candidatos** *(mínimo 8)*:

| ID | Descripción | Prioridad *(MoSCoW)* | Fuente |
| --- | --- | --- | --- |
| RF-01 | El sistema debe permitir a los vendedores optimizar y agilizar sus tareas diarias | | P2 |
| RF-02 | El sistema debe permitir el acceso tanto a usuarios como a administradores/dueños |  | P7 |
| RF-03 | El sistema debe almacenar la información en la nube | | P8 |

**Requisitos no funcionales candidatos** *(mínimo 3, con métrica)*:

| ID | Característica *(ISO/IEC 25010)* | Descripción medible | Fuente |
| --- | --- | --- | --- |
| RNF-01 | Portabilidad | El sistema debe funcionar en dispositivos móviles y en computador (mixto) | P6 |
| RNF-02 | Usabilidad | El sistema debe poder ser usado sin necesidad de conocimientos previos de informática, tanto por el usuario como por el dueño | P9 |
| RNF-03 | Mantenibilidad | El desarrollo sigue metodología en cascada con requerimientos definidos desde el inicio, implementado en Python | P1, P4 |

**Ambigüedades y conflictos detectados** *(lo que hay que aclarar con el cliente del proyecto)*:

- *(completar)*

> Todo requisito lleva **fuente**. Un requisito sin pregunta que lo respalde es un requisito inventado por el equipo.

---

## 5. Validación cruzada

El equipo cliente lee la lista del punto 4 y marca cada requisito:

| Marca | Significado |
| --- | --- |
| ✅ | Lo dije y está bien entendido |
| ✏️ | Lo dije, pero no así *(se anota la corrección)* |
| ❌ | No lo dije: el equipo lo supuso |

**Resultado de la validación:**

| Requisito | Marca | Corrección del cliente |
|---|---|---|
| *(completar)* | *(✅ / ✏️ / ❌)* | *(completar)* |

- Los ❌ no se borran: pasan a **preguntas para el cliente del proyecto**. Pueden ser requisitos válidos que el cliente no mencionó, o suposiciones del equipo.

---

## 6. Plan con el cliente del proyecto

La entrevista de hoy es un ensayo. La elicitación que cuenta para la Nota 1 es con el **cliente del proyecto**, siempre **externo al equipo**. Se usa el primer nivel posible:

1. **Usuario real** del dominio. Si un integrante trabaja en el lugar, su papel es conseguir la cita con quien vive el proceso *(jefe, almacenista, cliente)*, no ser el entrevistado.
2. **Usuario sustituto**: alguien que hace esa actividad en otro lugar, aunque no vaya a usar el sistema.
3. **Equipo cliente**: el equipo que hizo de cliente hoy. En este caso la técnica complementaria es obligatoria: **análisis de documentos o de sistemas similares** *(formatos, planillas, aplicaciones parecidas)*, para que los requisitos no dependan solo de lo que el otro equipo imagine.

| Campo | Respuesta |
| --- | --- |
| Cliente del proyecto *(nivel 1, 2 o 3 y rol, no nombre)* | *(nivel 3)* |
| Técnica principal y técnica complementaria | *(entrevista + análisis de documentos)* |
| Fecha y lugar | *(entre el 21/09 y el 24/09: el Sprint 1, lugar: uniremington )* |
| Responsables | *(Harrison Ospina Salazar, Juan David Bedoya, )* |
| Evidencia que se va a recoger | *(guion y notas / fotos / grabación con consentimiento / documentos)* |
| Preguntas que se añaden al guion tras el taller | *()* |

- Añadir la tarjeta de la entrevista real al tablero, dentro del **Sprint 1**, con responsable y fecha.

---

## Ejemplo diligenciado

Referencia de nivel de detalle. Mismo dominio de los Talleres 1 y 2: **no se puede usar.**

**1. Guion** *(barbería de barrio; extracto)*

| # | Pregunta | Tipo |
| --- | --- | --- |
| P1 | ¿Cómo se agenda hoy un turno, desde que el cliente llama hasta que se sienta en la silla? | Contexto |
| P3 | ¿Qué es lo que más le complica del día a día con los turnos? | Abierta |
| P4 | ¿Por qué? ¿Me cuenta la última vez que pasó? | Sondeo |
| P6 | ¿Qué pasa cuando un cliente no llega? | Excepción |
| P7 | ¿Y cuando un barbero falta sin avisar? | Excepción |
| P9 | ¿Cuántos turnos atienden en un sábado? ¿Cuántos clientes llaman al tiempo? | Cuantitativa |
| P10 | ¿Cuánto tiempo está dispuesto a dedicarle al sistema al día? | Cuantitativa |
| P12 | ¿Hay algo que no le pregunté y debería saber? | Cierre |

**2. Notas** *(extracto)*

- **P3:** "Los sábados el teléfono no para y mientras contesto no corto."
- **P6:** "Unos dos o tres por semana no llegan y ese turno se pierde."
- **P9:** "Unos 40 turnos el sábado, entre los tres."
- **Observador:** el "cliente" dice *"agenda"* para el cuaderno y *"turno"* para cada cita; usar esos términos en el catálogo.

**4. Requisitos candidatos** *(extracto)*

| ID | Descripción | Prioridad | Fuente |
| --- | --- | --- | --- |
| RF-01 | El sistema debe permitir al cliente reservar un turno eligiendo barbero, fecha y franja libre | Must | P1, P3 |
| RF-02 | El sistema debe permitir al barbero marcar un turno como no asistido | Should | P6 |
| RF-03 | El sistema debe reasignar los turnos de un barbero ausente o notificar a sus clientes | Should | P7 |
| RNF-01 | *(Eficiencia de desempeño)* El sistema soporta 40 reservas en un día y 10 consultas simultáneas, respondiendo en menos de 2 s | Must | P9 |
| RNF-02 | *(Usabilidad)* El dueño registra un turno telefónico en menos de 30 s | Should | P3, P10 |

**Ambigüedad:** ¿el cliente reserva con un barbero concreto o con el primero libre? Se pregunta al dueño real.

**5. Validación:** RF-01 ✅, RF-02 ✅, RF-03 ✏️ *("no reasigno, los llamo yo")* → pasa a "notificar a los clientes"; RNF-02 ❌ *("no dije tiempo")* → pregunta para el cliente del proyecto.

**6. Plan:** entrevista al dueño el lunes a las 8:00 en la barbería, antes de abrir, + fotos de dos páginas del cuaderno de turnos *(análisis de documentos)*. Responsables: entrevistador y anotador del taller. Tarjeta creada en el tablero.