import { useState } from "react";
import { ListaTareas } from "./ListaTareas";
import { ToastContainer, toast } from "../toastConfig";

interface Tarea {
  nombre: string;
  prioridad: string;
}

export const TodoApp = () => {
  const [nuevaTarea, setNuevaTarea] = useState<string>("");
  const [prioridadTarea, setPrioridadTarea] = useState<string>(""); // Prioridad por defecto
  const [listaTareas, setListaTareas] = useState<Tarea[]>([]);
  const [taskSeleccionada, setTaskSeleccionada] = useState<Tarea | null>(null);
  const [editando, setEditando] = useState<boolean>(false);

  /**
   * Al especificar React.FormEvent<HTMLFormElement> como el tipo del evento e, estás indicando que e es un evento
   * de formulario y proporciona acceso a las propiedades y métodos asociados con los formularios HTML.
   */
  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nuevaTarea.trim() === "") {
      toast.error("La tarea no puede estar vacía");
      return;
    }

    const nuevaTareaConPrioridad: Tarea = {
      nombre: nuevaTarea,
      prioridad: prioridadTarea,
    };

    setListaTareas((tareasAnteriores) => [
      ...tareasAnteriores,
      nuevaTareaConPrioridad,
    ]);
    toast.success("Tarea agregada correctamente");
    setNuevaTarea("");
    setPrioridadTarea("");
  };

  const handleBorrarTarea = (index: number) => {
    // Asegúrate de que handleBorrarTarea reciba el índice
    setListaTareas((tareas) => tareas.filter((_, i) => i !== index));
    toast.error("Tarea borrada correctamente");
  };

  const handleSeleccionarTarea = (index: number) => {
    setEditando(true);
    const selectedTask = listaTareas[index];
    //console.log(index);
    //console.log(selectedTask);
    //console.log(selectedTask.nombre);
    setNuevaTarea(selectedTask.nombre);
    setPrioridadTarea(selectedTask.prioridad);
    setTaskSeleccionada(selectedTask);
  };

  const handleEditarTarea = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(taskSeleccionada);

    // Crear una nueva tarea con los valores editados
    const updatedTask = {
      ...taskSeleccionada,
      nombre: nuevaTarea,
      prioridad: prioridadTarea,
    };

    // Actualizar la lista de tareas con la tarea editada
    const updatedTasks = listaTareas.map((task) =>
      task === taskSeleccionada ? updatedTask : task
    );

    //console.log(updatedTasks); // Imprime la lista de tareas actualizada
    setListaTareas(updatedTasks);

    setTaskSeleccionada(null);
    setEditando(false);
    setNuevaTarea("");
    setPrioridadTarea("");
    toast.success("Tarea editada correctamente");
  };

  return (
    <div>
      <ToastContainer />
      <div className="row justify-content-center">
        <h1 className="text-center mt-5 titulo">
          Lista de Tareas con Reactjs y Typescript <hr />
        </h1>
        <div
          className="col-md-5"
          style={{
            marginTop: "50px",
            borderRight: "1px solid #666",
          }}>
          <form onSubmit={editando ? handleEditarTarea : handleAddTask}>
            <div className="mb-3">
              <label htmlFor="nuevaTarea" className="form-label">
                Tarea
              </label>
              <input
                className="form-control"
                type="text"
                value={nuevaTarea}
                onChange={(e) => setNuevaTarea(e.target.value)}
                placeholder="Nueva Tarea"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="prioridadTarea" className="form-label">
                Tipo de prioridad
              </label>
              <select
                value={prioridadTarea}
                onChange={(e) => setPrioridadTarea(e.target.value)}
                className="form-control">
                <option value="">Seleccione</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>

            <div className="d-grid gap-2">
              <button className="btn btn-primary" type="submit">
                {editando ? "Editar Tarea" : "Agregar Tarea"}
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-7">
          <ListaTareas
            listaTareas={listaTareas}
            borrarTarea={handleBorrarTarea}
            seleccionarTarea={handleSeleccionarTarea}
          />
        </div>
      </div>
    </div>
  );
};
