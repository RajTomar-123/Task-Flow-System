import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    taskTitle: { type: String, required: true },
    taskDescription: { type: String, required: true },
    taskDate: { type: Date, required: true },
    asignTo: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, default: "new" }
});

export default mongoose.model('Task', TaskSchema);

