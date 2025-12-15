import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const TaskColumn = ({ title, tasks, onDelete }) => {
  const statusStyles = {
    upcomingTasks:
      "bg-blue-50 border-blue-300 shadow-blue-50 hover:shadow-blue-100",
    toDo: "bg-yellow-50 border-yellow-300 shadow-yellow-50 hover:shadow-yellow-100",
    inProgress:
      "bg-purple-50 border-purple-300 shadow-purple-50 hover:shadow-purple-100",
    done: "bg-green-50 border-green-300 shadow-green-50 hover:shadow-green-100",
  };

  return (
    <div className="md:w-1/4 bg-card p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold text-primary">
        {title} <span className="text-orange-500">({tasks.length})</span>
      </h2>

      <div className="space-y-2 mt-8 ">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`
      flex flex-col gap-3 p-4 rounded-xl mb-4 bg-blue-150
      border-l-4
      shadow-lg
      transition-all duration-300 ease-in-out
      hover:-translate-y-1 hover:scale-[1.01]
      hover:shadow-2xl
      ${statusStyles[task.status] || "bg-gray-50 border-gray-300"}
    `}
          >
            <h3 className="font-semibold text-blue-800">{task.title}</h3>

            <div className="flex flex-col gap-2">
              <span className="bg-white/70 text-gray-800 px-2 py-1 rounded font-bold w-fit">
                {task.subjectTag}
              </span>

              <span className="bg-white/60 px-2 py-1 rounded">
                {task.description}
              </span>
            </div>

            <div className="flex items-center justify-between mt-2">
              <MdDelete
                onClick={() => onDelete(task._id)}
                className="text-red-500 cursor-pointer bg-white p-1 rounded hover:scale-110 transition"
                size={24}
              />

              <Link to={`/tasks/${task._id}/edit`}>
                <MdEdit
                  className="text-green-500 cursor-pointer bg-white p-1 rounded hover:scale-110 transition"
                  size={24}
                />
              </Link>
            </div>
          </div>
        ))}

        {/* {tasks.map((task) => (
          <div
            key={task._id}
            className="flex flex-col gap-3 bg-orange-100 p-4 rounded-lg shadow mb-4"
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
        ))} */}
      </div>
    </div>
  );
};

export default TaskColumn;
