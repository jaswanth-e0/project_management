const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectTitle: { type: String, required:[ true,"title is required"] },
    projectDescription: { type: String, required: [true,"project description is required"] },
    projectStatus: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    startDate: { type: Date },
    endDate: { type: Date },
    isDelete: { type: Boolean, default: false },
    assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user_Model",required:[true,"assigned users required"] }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user_Model" ,required:[true,"created by id required"]}
});

module.exports = mongoose.model("project_Model", projectSchema);
