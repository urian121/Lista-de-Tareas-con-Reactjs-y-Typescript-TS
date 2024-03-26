import { Tarea } from "./Tarea";

export interface Tarea {
  nombre: string;
  prioridad: string;
}

interface ListaTareasProps {
  listaTareas: Tarea[];
  borrarTarea: (index: number) => void;
}

export const ListaTareas = ({ listaTareas, borrarTarea }: ListaTareasProps) => {
  return (
    <div className="taskList">
      {listaTareas.map((tarea, index) => (
        <Tarea
          key={index}
          tarea={tarea.nombre}
          prioridad={tarea.prioridad}
          borrarTarea={() => borrarTarea(index)}
        />
      ))}
    </div>
  );
};
