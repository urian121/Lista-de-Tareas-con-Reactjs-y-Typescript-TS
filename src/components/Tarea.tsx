interface TareaProps {
  tarea: string;
  prioridad: string;
  borrarTarea: () => void;
  seleccionarTarea: () => void;
}

export const Tarea = ({
  tarea,
  prioridad,
  borrarTarea,
  seleccionarTarea,
}: TareaProps) => {
  const coloresPrioridad: { [key: string]: string } = {
    alta: "#ff8b8b",
    media: "yellow",
    baja: "#0ce20c",
  };

  const color = coloresPrioridad[prioridad] || "black";

  return (
    <div className="task" style={{ backgroundColor: color }}>
      <span> {tarea}</span>
      &nbsp; &nbsp; - &nbsp; &nbsp;
      <span>{prioridad}</span>
      <button
        type="button"
        onClick={borrarTarea}
        className="btn btn-danger btn-sm float-end">
        <i className="bi bi-trash"></i>
      </button>
      <button
        type="button"
        onClick={seleccionarTarea}
        className="btn btn-success btn-sm float-end mx-2">
        <i className="bi bi-arrow-clockwise"></i>
      </button>
    </div>
  );
};
