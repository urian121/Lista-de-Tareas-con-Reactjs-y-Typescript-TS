interface TareaProps {
  tarea: string;
  prioridad: string;
  borrarTarea: () => void;
}

export const Tarea = ({ tarea, prioridad, borrarTarea }: TareaProps) => {
  const coloresPrioridad: { [key: string]: string } = {
    alta: "red",
    media: "yellow",
    baja: "green",
  };

  const color = coloresPrioridad[prioridad] || "black";

  return (
    <div className="task" style={{ backgroundColor: color }}>
      <span> {tarea}</span>
      <span>{prioridad}</span>

      <button
        type="button"
        onClick={borrarTarea}
        className="btn btn-danger btn-sm float-end">
        <i className="bi bi-trash"></i>
        Borrar
      </button>
    </div>
  );
};
