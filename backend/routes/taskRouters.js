import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// POST /api/tasks - Create a new task
router.post('/', async (req, res) => {
    try {
        const { taskTitle, taskDescription, taskDate, asignTo, category } = req.body;

        const newTask = await Task.create({
            taskTitle,
            taskDescription,
            taskDate,
            asignTo,
            category,
        });

        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

export default router;
