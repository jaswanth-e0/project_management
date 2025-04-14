const project_Model=require("../Model/project_Model")
const {getAllFactory, createFactory, updateFactory, deleteFactory }=require("../utility/crudFactory")
const projectPost=createFactory(project_Model)
const Allprojects=getAllFactory(project_Model)
const updateProject = updateFactory(project_Model);
const deleteProject = deleteFactory(project_Model);

module.exports = { projectPost, Allprojects, updateProject, deleteProject };