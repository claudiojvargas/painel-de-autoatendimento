const TaskCard = ({ task, onToggle, onDelete, onEdit }) => {
  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className="bg-white shadow rounded-lg p-4 w-56 h-56 flex flex-col justify-between">
      <div>
        <h3
          className={`text-lg font-semibold break-words ${
            task.completed ? "line-through text-gray-400" : "text-gray-900"
          }`}
        >
          {task.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">Categoria: {task.category}</p>
        <p className="text-sm text-gray-600">Prioridade: {task.priority}</p>
        {task.dueDate && (
          <p
            className={`text-sm mt-1 ${
              isOverdue ? "text-red-600 font-medium" : "text-gray-600"
            }`}
          >
            Prazo: {task.dueDate}
          </p>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`px-3 py-1 text-sm font-medium rounded-md transition ${
            task.completed
              ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          {task.completed ? "Desfazer" : "Concluir"}
        </button>

        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 text-sm font-medium rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 text-sm font-medium rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
