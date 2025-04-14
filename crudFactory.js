const bcrypt=require("bcryptjs")
const Project = require("../Model/project_Model");
const getAllFactory = (ElementModel) => {
    return async (req, res) => {
        try {
            const elements = await ElementModel.find();
            res.status(200).json({ status: "success", data: elements });
        } catch (err) {
            res.status(500).json({ status: "failure", message: err.message });
        }
    };
};

const createFactory = (ElementModel) => {
    return async (req, res) => {
        try {
            let requestData = { ...req.body };

            // Check if password exists in request body and hash it
            if (requestData.password) {
                requestData.password = await bcrypt.hash(requestData.password, 10);
            } 
            if(requestData.projectId){
                const projectExists = await Project.findById(requestData.projectId);
                if (!projectExists) {
                    return res.status(400).json({ error: "Invalid Project ID: Project does not exist" });
                }
        
            }
            const newElement = await ElementModel.create(requestData);
            res.status(201).json({ status: "success", message: "Created successfully", data: newElement });
        } catch (err) {
            res.status(500).json({ status: "failure", message: err.message });
        }
    };
};

const updateFactory = (ElementModel) => {
    return async (req, res) => {
        try {
            const updatedElement = await ElementModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!updatedElement) {
                return res.status(404).json({ status: "failure", message: "Not found" });
            }
            res.status(200).json({ status: "success", message: "Updated successfully", data: updatedElement });
        } catch (err) {
            res.status(500).json({ status: "failure", message: err.message });
        }
    };
};

const deleteFactory = (ElementModel) => {
    return async (req, res) => {
        try {
            const deletedElement = await ElementModel.findByIdAndDelete(req.params.id);
            if (!deletedElement) {
                return res.status(404).json({ status: "failure", message: "Not found" });
            }
            res.status(200).json({ status: "success", message: "Deleted successfully" });
        } catch (err) {
            res.status(500).json({ status: "failure", message: err.message });
        }
    };
};

module.exports = { getAllFactory, createFactory, updateFactory, deleteFactory };
