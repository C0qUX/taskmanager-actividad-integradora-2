# TaskManager

En este proyecto organizo tareas con JavaScript sin librerías. Puedo agregar una tarea, cambiar su título y prioridad, marcarla como completada o eliminarla. También puedo buscar por título, filtrar por estado y ordenar por fecha o prioridad.

- Repositorio: https://github.com/C0qUX/taskmanager-actividad-integradora-2
- Aplicación: https://c0qux.github.io/taskmanager-actividad-integradora-2/

## Cómo abrirlo

Desde la carpeta del proyecto ejecuto:

```bash
python3 -m http.server 8000
```

Después abro `http://localhost:8000`. En Windows puedo usar `py -m http.server 8000`. También puedo abrir la carpeta con Visual Studio Code y usar Live Server. No abro `index.html` con doble clic porque los módulos necesitan un servidor.

## Cómo guardo las tareas

Al abrir la aplicación, primero reviso la clave `taskmanager-tareas` en `localStorage`. Si no existe, consulto `https://jsonplaceholder.typicode.com/todos` y guardo las tareas recibidas. Si ya existe, recupero la lista guardada. Una lista vacía también cuenta como guardada: si elimino todas las tareas, no vuelvo a importar las de ejemplo.

La API no incluye prioridad ni fecha de creación. Por eso, al importar sus tareas asigno prioridad media y uso la fecha de importación. En las tareas que agrego desde el formulario guardo la fecha real de creación. Al editarlas conservo esa fecha.

Los cambios quedan en este navegador; no modifico los datos de la API. Si borro los datos del sitio o cambio de navegador, no recupero la misma lista. Las tareas tampoco se comparten entre la dirección local y la publicada.

## Cómo uso la aplicación sin internet

Primero abro la página con conexión y espero a que termine la carga. El archivo `sw.js` guarda los archivos necesarios para abrirla de nuevo sin internet. Las tareas quedan guardadas por separado en `localStorage`.

Después puedo agregar, editar, completar y eliminar tareas sin conexión, y recuperarlas al recargar. Para preparar este funcionamiento uso `localhost` o una dirección HTTPS. Una primera visita sin conexión no puede descargar la aplicación ni consultar la API.

Si falla la API, veo un aviso y puedo agregar mis propias tareas. Si el navegador no permite guardar un cambio, veo un aviso y la lista conserva su estado anterior.

## Opción A: módulos de JavaScript

Separé el código en tres archivos:

- `js/app.js`: manejo el formulario, los botones, los filtros, el orden y los contadores.
- `js/api.js`: consulto las tareas de ejemplo con `fetch()` y `async/await`.
- `js/almacenamiento.js`: leo y guardo las tareas con `JSON.parse()` y `JSON.stringify()`.

Con `export` comparto las funciones de consulta y guardado. Con `import` las uso en `app.js`. Así puedo encontrar cada parte sin reunir todo en un solo archivo. En `index.html` uso `type="module"` para cargar el código.

El archivo `sw.js` solo permite recuperar los archivos de la página sin internet. No reemplaza el guardado de tareas ni añade otra función al gestor.

## Cómo compruebo el guardado

1. Agrego una tarea con un título que pueda reconocer.
2. Abro las herramientas del navegador con F12.
3. Entro en **Application > Local Storage** y selecciono la dirección de la aplicación.
4. Selecciono `taskmanager-tareas` y reviso el título, la prioridad y el estado.
5. Recargo la página y compruebo que la tarea continúa en la lista.
6. Desconecto internet después de la primera carga y repito la prueba.

## Referencias consultadas

- [Módulos de JavaScript en MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- [Uso de service workers en MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)

La ayuda de IA utilizada queda registrada en `AI_DECLARATION.md`.
