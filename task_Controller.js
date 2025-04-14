const task_Model=require("../Model/task_Model")
const {getAllFactory, createFactory, updateFactory, deleteFactory }=require("../utility/crudFactory")
const taskPost=createFactory(task_Model)
const Alltasks=getAllFactory(task_Model)
const updatetask = updateFactory(task_Model);
const deletetask = deleteFactory(task_Model);

module.exports = {taskPost, Alltasks, updatetask, deletetask };