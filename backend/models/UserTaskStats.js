import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
    asignTo: { type: String, required: true, unique: true },
    newTasks: { type: Number, default: 0 },
    activeTasks: { type: Number, default: 0 },
    completedTasks: { type: Number, default: 0 },
    failedTasks: { type: Number, default: 0 }
});

export default mongoose.model("UserTaskStats", statsSchema);
