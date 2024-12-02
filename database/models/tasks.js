import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, default: 'General' },
    priority: { type: String, default: 'Low' },
    status: { type: String, default: 'Pending' },
    deadline: { type: Date },
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
