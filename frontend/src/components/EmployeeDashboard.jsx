import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const EmployeeDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser(jwtDecode(token));
        }
    }, []);

    useEffect(() => {
        // axios.get("http://localhost:3000/api/tasks")
        axios.get("https://task-flow-system-lmnw.vercel.app/api/tasks")

            .then(res => setTasks(res.data))
            .catch(err => console.error(err));
    }, []);

    const updateTaskStatus = async (task, action) => {
        try {
            // const res = await axios.put("http://localhost:3000/api/task/update-status", {
            const res = await axios.put("https://task-flow-system-lmnw.vercel.app/api/task/update-status", {
                asignTo: task.asignTo,
                taskTitle: task.taskTitle,
                taskDate: task.taskDate,
                action
            });

            const updatedTask = res.data.task;

            setTasks(prev =>
                prev.map(t => t._id === updatedTask._id ? updatedTask : t)
            );

        } catch (err) {
            console.log("Update error:", err);
        }
    };

    const statusOrder = {
        new: 1,
        active: 2,
        completed: 3,
        failed: 4
    };

    const userTasks = tasks
        .filter(t => t.asignTo === user?.name)
        .sort((a, b) => {
            if (statusOrder[a.status] !== statusOrder[b.status]) {
                return statusOrder[a.status] - statusOrder[b.status];
            }
            return new Date(b.taskDate) - new Date(a.taskDate);
        });

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // ⭐ Dynamic background colors
    const getStatusColor = (status) => {
        switch (status) {
            case "new":
                return "bg-blue-400";
            case "active":
                return "bg-yellow-400";
            case "completed":
                return "bg-green-400";
            case "failed":
                return "bg-red-400";
            default:
                return "bg-gray-300";
        }
    };

    return (
        <>
            <nav className="bg-black text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h3 className="font-bold">Hello! {user?.name}</h3>

                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
                        Log Out
                    </button>
                </div>
            </nav>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-5 mt-10">
                <div className="rounded-xl py-6 px-9 bg-blue-400">
                    <h2 className='text-3xl font-bold'>{userTasks.length}</h2>
                    <h3 className='text-xl mt-0.5 font-medium'>Total Tasks</h3>
                </div>

                <div className="rounded-xl py-6 px-9 bg-green-400">
                    <h2 className='text-3xl font-bold'>
                        {userTasks.filter(t => t.status === 'completed').length}
                    </h2>
                    <h3 className='text-xl mt-0.5 font-medium'>Completed</h3>
                </div>

                <div className="rounded-xl py-6 px-9 bg-yellow-400 text-black">
                    <h2 className='text-3xl font-bold'>
                        {userTasks.filter(t => t.status === 'active').length}
                    </h2>
                    <h3 className='text-xl mt-0.5 font-medium'>Accepted</h3>
                </div>

                <div className="rounded-xl py-6 px-9 bg-red-400">
                    <h2 className='text-3xl font-bold'>
                        {userTasks.filter(t => t.status === 'failed').length}
                    </h2>
                    <h3 className='text-xl mt-0.5 font-medium'>Failed</h3>
                </div>
            </div>

            <div className="flex overflow-x-auto gap-5 px-4 py-5">
                {userTasks.map(task => (
                    <div
                        key={task._id}
                        className={`flex-shrink-0 w-[280px] md:w-[320px] rounded-xl p-5 text-black ${getStatusColor(task.status)}`}
                        style={{ minHeight: "330px" }}
                    >
                        <div className="flex justify-between items-center text-sm">
                            <span className="bg-gray-800 text-white px-3 py-1 rounded">
                                Category: {task.category}
                            </span>

                            <span>
                                {new Date(task.taskDate).toLocaleString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </span>
                        </div>

                        <h2 className="mt-5 text-xl font-semibold">Title: {task.taskTitle}</h2>

                        <p className="text-sm mt-2">Description: {task.taskDescription}</p>

                        <div className="mt-5 pt-3 flex justify-between items-center" style={{ minHeight: "40px" }}>
                            {task.status === "new" && (
                                <button onClick={() => updateTaskStatus(task, "accept")} className="bg-yellow-600 px-3 py-1 text-xs rounded text-white">
                                    Accept
                                </button>
                            )}

                            {task.status === "active" && (
                                <>
                                    <button onClick={() => updateTaskStatus(task, "completed")} className="bg-green-600 px-3 py-1 text-xs rounded text-white">
                                        Completed
                                    </button>

                                    <button onClick={() => updateTaskStatus(task, "failed")} className="bg-red-600 px-3 py-1 text-xs rounded text-white">
                                        Failed
                                    </button>
                                </>
                            )}

                            {task.status !== "new" && (
                                <span className="text-sm font-semibold capitalize">
                                    {task.status}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default EmployeeDashboard;
