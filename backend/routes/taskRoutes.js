import express from "express";
import Task from "../models/Task.js";
import UserTaskStats from "../models/UserTaskStats.js";

const router = express.Router();

// CREATE TASK
router.post("/task", async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();

        let stats = await UserTaskStats.findOne({ asignTo: req.body.asignTo });

        if (!stats) {
            stats = new UserTaskStats({ asignTo: req.body.asignTo });
        }

        stats.newTasks += 1; // increment new tasks
        await stats.save();

        res.status(201).json({
            message: "Task created successfully",
            task: newTask,
            stats
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET ALL TASKS
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

// GET ALL TASK STATS
router.get("/task-stats", async (req, res) => {
    try {
        const stats = await UserTaskStats.find();
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE TASK STATUS
router.put("/task/update-status", async (req, res) => {
    try {
        const { asignTo, taskTitle, taskDate, action } = req.body;

        const statusMap = {
            accept: "active",
            completed: "completed",
            failed: "failed"
        };

        const newStatus = statusMap[action];

        const task = await Task.findOne({
            asignTo,
            taskTitle,
            taskDate: new Date(taskDate)
        });

        if (!task) return res.status(404).json({ message: "Task not found" });

        const oldStatus = task.status;

        task.status = newStatus;
        await task.save();

        let stats = await UserTaskStats.findOne({ asignTo });

        if (!stats) {
            stats = new UserTaskStats({ asignTo });
        }

        if (oldStatus === "new") stats.newTasks--;
        if (oldStatus === "active") stats.activeTasks--;
        if (oldStatus === "completed") stats.completedTasks--;
        if (oldStatus === "failed") stats.failedTasks--;

        if (newStatus === "active") stats.activeTasks++;
        if (newStatus === "completed") stats.completedTasks++;
        if (newStatus === "failed") stats.failedTasks++;

        await stats.save();

        res.json({
            message: "Task status updated",
            task,
            stats
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
