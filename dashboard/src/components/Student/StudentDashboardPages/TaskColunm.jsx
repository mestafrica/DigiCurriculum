import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const TaskColumn = ({ title, tasks, onDelete }) => {
  return (
    <div className="md:w-1/4 bg-card p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold text-primary">
        {title} <span className="text-muted">({tasks.length})</span>
      </h2>

      <div className="space-y-2 mt-2">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex flex-col gap-3 bg-white p-4 rounded-lg shadow"
          >
            <h3 className="font-[600] text-blue-800">{task.title}</h3>

            <div className="flex flex-col gap-2">
              <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded font-[900]">
                {task.subjectTag}
              </span>
              <span className="bg-blue-50 text-black-800 px-2 py-1 rounded">
                {task.description}
              </span>
            </div>

            <div className="flex items-center justify-between mt-2">
              <MdDelete
                onClick={() => onDelete(task._id)}
                className="text-red-500 cursor-pointer bg-blue-100 rounded"
                size={24}
              />

              <Link to={`/tasks/${task._id}/edit`}>
                <MdEdit
                  className="text-green-500 cursor-pointer bg-blue-100 rounded"
                  size={24}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;


