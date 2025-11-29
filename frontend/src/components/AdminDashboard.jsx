import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [userList, setUserList] = useState([]);
    const [stats, setStats] = useState([]);

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [asignTo, setAsignTo] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const today = new Date().toISOString().split("T")[0];

    // Fetch task stats
    useEffect(() => {
        // axios.get("http://localhost:3000/api/task-stats")
        axios.get("https://task-flow-system-lmnw.vercel.app/api/task-stats")

            .then(res => setStats(res.data))
            .catch(err => console.error(err));
    }, []);

    // Fetch tasks + users
    useEffect(() => {
        // axios.get("http://localhost:3000/api/tasks")
        axios.get("https://task-flow-system-lmnw.vercel.app/api/tasks")

            .then((res) => setTasks(res.data))
            .catch((err) => console.error("Error fetching tasks:", err));

        // axios.get("http://localhost:3000/user/all")
        axios.get("https://task-flow-system-lmnw.vercel.app/user/all")

            .then((res) => setUserList(res.data))
            .catch((err) => console.error("Error fetching users:", err));
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);

        const Task = {
            taskTitle,
            taskDescription,
            taskDate,
            asignTo,
            category,
        };

        // axios.post('http://localhost:3000/users/task', Task)
        axios.post("https://task-flow-system-lmnw.vercel.app/users/task", Task)
            .then((res) => {
                setLoading(false);
                toast("Task Created Successfully");
                console.log("Task created", res);
            })
            .catch((err) => {
                toast("Task Creation Failed");
                console.log("Error while task create", err);
                setLoading(false);
            });

        setTaskTitle('');
        setTaskDescription('');
        setTaskDate('');
        setAsignTo('');
        setCategory('');
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <>
            {/* NAV */}
            <nav className="bg-black text-white p-4 shadow-md border-b border-[#222]">
                <div className="container mx-auto flex justify-between items-center">
                    <span className="font-bold text-lg">Hello Admin</span>

                    <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            </nav>

            {/* FORM */}
            <div className="p-5 bg-black mt-5 rounded">
                <form onSubmit={submitHandler} className="flex flex-col md:flex-row w-full justify-between gap-6">
                    {/* LEFT */}
                    <div className="w-full md:w-1/2 text-white">

                        <div>
                            <h3 className="text-sm text-gray-200 mb-1">Task Title</h3>
                            <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}
                                className="text-sm text-white py-2 px-3 w-full rounded outline-none bg-black border border-[#333] mb-4"
                                type="text" placeholder="task title"
                            />
                        </div>

                        <div>
                            <h3 className="text-sm text-gray-200 mb-1">Date</h3>
                            <input value={taskDate} min={today}
                                onChange={(e) => setTaskDate(e.target.value)}
                                className="text-sm text-white py-2 px-3 w-full rounded outline-none bg-black border border-[#333] mb-4"
                                type="date"
                            />
                        </div>

                        <div>
                            <h3 className="text-sm text-gray-200 mb-1">Assign To</h3>
                            <select value={asignTo} onChange={(e) => setAsignTo(e.target.value)}
                                className="text-sm text-white py-2 px-3 w-full rounded outline-none bg-black border border-[#333] mb-4"
                                required>
                                <option value="">Select Employee</option>
                                {userList.map((user) => (
                                    <option key={user._id} value={user.name}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <h3 className="text-sm text-gray-200 mb-1">Category</h3>
                            <input value={category} onChange={(e) => setCategory(e.target.value)}
                                className="text-sm text-white py-2 px-3 w-full rounded outline-none bg-black border border-[#333] mb-4"
                                type="text" placeholder="design, dev, etc"
                            />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="w-full md:w-2/5 flex flex-col text-white">
                        <h3 className="text-sm text-gray-200 mb-1">Description</h3>
                        <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}
                            className="text-white w-full h-44 text-sm py-2 px-4 rounded outline-none bg-black border border-[#333]"
                        />

                        <button disabled={loading} type="submit" className="bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full">
                            {loading ? "Submitting..." : "Create Task"}
                        </button>
                    </div>
                </form>
            </div>

            {/* STATS TABLE */}
            <div className="bg-black border border-[#222] p-5 rounded mt-5 text-white">

                {/* DESKTOP HEADER */}
                <div className="hidden md:flex bg-red-500 border border-[#222] mb-2 py-2 px-4 rounded font-medium">
                    <div className="w-1/5">Employee</div>
                    <div className="w-1/5 text-center">New</div>
                    <div className="w-1/5 text-center">Active</div>
                    <div className="w-1/5 text-center">Completed</div>
                    <div className="w-1/5 text-center">Failed</div>
                </div>

                {/* DESKTOP ROWS */}
                <div className="hidden md:block">
                    {[...new Map(tasks.map((task) => [task.asignTo, task])).values()]
                        .map((task) => (
                            <div key={task._id} className="border border-emerald-600 py-2 px-4 mb-2 rounded flex justify-between">
                                <div className="w-1/5">{task.asignTo}</div>

                                <div className="w-1/5 text-blue-400 text-center">
                                    {stats.find((s) => s.asignTo === task.asignTo)?.newTasks || 0}
                                </div>

                                <div className="w-1/5 text-yellow-400 text-center">
                                    {stats.find((s) => s.asignTo === task.asignTo)?.activeTasks || 0}
                                </div>

                                <div className="w-1/5 text-green-400 text-center">
                                    {stats.find((s) => s.asignTo === task.asignTo)?.completedTasks || 0}
                                </div>

                                <div className="w-1/5 text-red-500 text-center">
                                    {stats.find((s) => s.asignTo === task.asignTo)?.failedTasks || 0}
                                </div>
                            </div>
                        ))}
                </div>

                {/* MOBILE CARDS */}
                <div className="md:hidden flex flex-col gap-4">
                    {[...new Map(tasks.map((task) => [task.asignTo, task])).values()]
                        .map((task) => (
                            <div key={task._id} className="border border-emerald-600 p-4 rounded">
                                <h3 className="text-lg font-semibold mb-2">{task.asignTo}</h3>

                                <div className="flex justify-between">
                                    <span className="text-gray-300">New:</span>
                                    <span className="text-blue-400">
                                        {stats.find((s) => s.asignTo === task.asignTo)?.newTasks || 0}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-300">Active:</span>
                                    <span className="text-yellow-400">
                                        {stats.find((s) => s.asignTo === task.asignTo)?.activeTasks || 0}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-300">Completed:</span>
                                    <span className="text-green-400">
                                        {stats.find((s) => s.asignTo === task.asignTo)?.completedTasks || 0}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-300">Failed:</span>
                                    <span className="text-red-500">
                                        {stats.find((s) => s.asignTo === task.asignTo)?.failedTasks || 0}
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
