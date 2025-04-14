const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskTitle: { type: String, required: [true," task title is required"] },
    taskDescription: { type: String, required: [true,"task description is required "] },
    taskStatus: { type: String, enum: ["To Do", "In Progress", "Done"], default: "To Do" },
    startDate: { type: Date },
    endDate: { type: Date },
    isDelete: { type: Boolean, default: false },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "project_Model", required: [true,"project Id  is required "]},
    assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user_Model", }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user_Model", required: [true,"object id  is required "] }
});

module.exports = mongoose.model("task_Model", taskSchema);
