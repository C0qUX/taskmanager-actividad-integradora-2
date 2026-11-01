const formulario = document.querySelector('#formulario');
const titulo = document.querySelector('#titulo');
const prioridad = document.querySelector('#prioridad');
const guardar = document.querySelector('#guardar');
const cancelar = document.querySelector('#cancelar');
const lista = document.querySelector('#lista');
const mensaje = document.querySelector('#mensaje');

let tareas = [];
let idEnEdicion = null;

function mostrarMensaje(texto, esError = false) {
  mensaje.textContent = texto;
  mensaje.classList.toggle('error', esError);
}

function limpiarFormulario() {
  formulario.reset();
  idEnEdicion = null;
  guardar.textContent = 'Agregar tarea';
  cancelar.hidden = true;
  document.querySelector('#titulo-formulario').textContent = 'Nueva tarea';
}

function guardarCambios(nuevasTareas) {
  tareas = nuevasTareas;
  mostrarTareas();
  return true;
}

function editarTarea(tarea) {
  idEnEdicion = tarea.id;
  titulo.value = tarea.titulo;
  prioridad.value = tarea.prioridad;
  guardar.textContent = 'Guardar cambios';
  cancelar.hidden = false;
  document.querySelector('#titulo-formulario').textContent = 'Editar tarea';
  titulo.focus();
}

function eliminarTarea(tarea) {
  const nuevasTareas = tareas.filter((elemento) => elemento.id !== tarea.id);

  if (guardarCambios(nuevasTareas)) {
    if (idEnEdicion === tarea.id) {
      limpiarFormulario();
    }
    mostrarMensaje('Tarea eliminada.');
  }
}

function cambiarEstado(tarea) {
  const nuevasTareas = tareas.map((elemento) => {
    if (elemento.id === tarea.id) {
      return { ...elemento, completada: !elemento.completada };
    }
    return elemento;
  });

  if (guardarCambios(nuevasTareas)) {
    mostrarMensaje('Estado actualizado.');
  }
}

function mostrarTareas() {
  lista.replaceChildren();
  document.querySelector('#vacio').hidden = tareas.length > 0;

  tareas.forEach((tarea) => {
    const elemento = document.createElement('li');
    elemento.className = 'tarea';
    elemento.classList.toggle('terminada', tarea.completada);

    const casilla = document.createElement('input');
    casilla.type = 'checkbox';
    casilla.checked = tarea.completada;
    casilla.setAttribute('aria-label', 'Marcar como completada: ' + tarea.titulo);
    casilla.addEventListener('change', () => cambiarEstado(tarea));

    const detalle = document.createElement('div');
    detalle.className = 'detalle';
    const nombre = document.createElement('p');
    nombre.textContent = tarea.titulo;
    const datos = document.createElement('small');
    const fecha = new Date(tarea.fecha).toLocaleString('es-EC');
    datos.textContent = 'Prioridad: ' + tarea.prioridad + ' · Fecha: ' + fecha;
    detalle.append(nombre, datos);

    const acciones = document.createElement('div');
    acciones.className = 'acciones';
    const editar = document.createElement('button');
    editar.type = 'button';
    editar.className = 'secundario';
    editar.textContent = 'Editar';
    editar.addEventListener('click', () => editarTarea(tarea));
    const eliminar = document.createElement('button');
    eliminar.type = 'button';
    eliminar.className = 'secundario eliminar';
    eliminar.textContent = 'Eliminar';
    eliminar.addEventListener('click', () => eliminarTarea(tarea));
    acciones.append(editar, eliminar);

    elemento.append(casilla, detalle, acciones);
    lista.append(elemento);
  });
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const texto = titulo.value.trim();

  if (texto === '') {
    mostrarMensaje('Escribe un título para la tarea.', true);
    titulo.focus();
    return;
  }

  let nuevasTareas;
  const estabaEditando = idEnEdicion !== null;

  if (estabaEditando) {
    nuevasTareas = tareas.map((tarea) => {
      if (tarea.id === idEnEdicion) {
        return { ...tarea, titulo: texto, prioridad: prioridad.value };
      }
      return tarea;
    });
  } else {
    const nuevaTarea = {
      id: crypto.randomUUID(),
      titulo: texto,
      prioridad: prioridad.value,
      completada: false,
      fecha: new Date().toISOString()
    };
    nuevasTareas = [...tareas, nuevaTarea];
  }

  if (guardarCambios(nuevasTareas)) {
    limpiarFormulario();
    mostrarMensaje(estabaEditando ? 'Tarea actualizada.' : 'Tarea agregada.');
  }
});

cancelar.addEventListener('click', () => {
  limpiarFormulario();
  mostrarMensaje('Edición cancelada.');
});

mostrarTareas();
