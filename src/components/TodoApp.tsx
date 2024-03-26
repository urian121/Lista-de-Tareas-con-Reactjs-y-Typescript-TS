import { useState } from "react";
import { ListaTareas } from "./ListaTareas";
import { ToastContainer, toast } from "../toastConfig";

interface Tarea {
  nombre: string;
  prioridad: string;
}

export const TodoApp = () => {
  const [nuevaTarea, setNuevaTarea] = useState<string>("");
  const [prioridadTarea, setPrioridadTarea] = useState<string>("alta"); // Prioridad por defecto
  const [listaTareas, setListaTareas] = useState<Tarea[]>([]);

  const handleAddTask = () => {
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
  };

  const handleBorrarTarea = (index: number) => {
    // Asegúrate de que handleBorrarTarea reciba el índice
    setListaTareas((tareas) => tareas.filter((_, i) => i !== index));
    toast.error("Tarea borrada correctamente");
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
            <button className="btn btn-primary" onClick={handleAddTask}>
              Agregar Tarea
            </button>
          </div>
        </div>

        <div className="col-md-7">
          <ListaTareas
            listaTareas={listaTareas}
            borrarTarea={handleBorrarTarea}
          />
        </div>
      </div>
    </div>
  );
};
