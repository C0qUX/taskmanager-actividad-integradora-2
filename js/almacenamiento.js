const clave = 'taskmanager-tareas';

export function leerTareas() {
  const datos = localStorage.getItem(clave);

  if (datos === null) {
    return null;
  }

  const tareas = JSON.parse(datos);
  if (!Array.isArray(tareas) || !tareas.every((tarea) =>
    tarea !== null
    && typeof tarea.id === 'string'
    && typeof tarea.titulo === 'string'
    && typeof tarea.completada === 'boolean'
    && ['Alta', 'Media', 'Baja'].includes(tarea.prioridad)
    && typeof tarea.fecha === 'string'
    && !Number.isNaN(Date.parse(tarea.fecha)))) {
    throw new Error('Los datos guardados no tienen el formato esperado.');
  }

  return tareas;
}

export function guardarTareas(tareas) {
  localStorage.setItem(clave, JSON.stringify(tareas));
}
