export async function consultarTareas() {
  const respuesta = await fetch('https://jsonplaceholder.typicode.com/todos');

  if (!respuesta.ok) {
    throw new Error('No se pudieron consultar las tareas.');
  }

  const datos = await respuesta.json();
  if (!Array.isArray(datos) || !datos.every((tarea) =>
    tarea !== null
    && typeof tarea.id === 'number'
    && typeof tarea.title === 'string'
    && typeof tarea.completed === 'boolean')) {
    throw new Error('La respuesta no contiene una lista de tareas válida.');
  }

  const fecha = new Date().toISOString();
  const sinDuplicados = datos.filter((tarea, indice, todas) =>
    todas.findIndex((elemento) => elemento.id === tarea.id) === indice);

  return sinDuplicados.map((tarea) => ({
    id: 'api-' + tarea.id,
    titulo: tarea.title,
    prioridad: 'Media',
    completada: tarea.completed,
    fecha: fecha
  }));
}
