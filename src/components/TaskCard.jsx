const TaskCard = ({ task, onToggle, onDelete, onEdit }) => {
  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className="bg-white shadow-md p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      {/* Informações da tarefa */}
      <div className="flex-1">
        <h3
          className={`text-lg font-semibold break-words ${
            task.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {task.title}
        </h3>
        <p className="text-sm text-gray-600">Categoria: {task.category}</p>
        <p className="text-sm text-gray-600">Prioridade: {task.priority}</p>
        {task.dueDate && (
          <p
            className={`text-sm ${
              isOverdue ? "text-red-500 font-medium" : "text-gray-600"
            }`}
          >
            Prazo: {task.dueDate}
          </p>
        )}
      </div>

      {/* Botões de ação */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onToggle(task.id)}
          className={`px-3 py-1 rounded-lg text-sm font-medium shadow transition ${
            task.completed
              ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {task.completed ? "Desfazer" : "Concluir"}
        </button>

        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 rounded-lg text-sm font-medium shadow bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 rounded-lg text-sm font-medium shadow bg-red-500 text-white hover:bg-red-600 transition"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};
export default TaskCard;
