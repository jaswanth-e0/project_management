const user_Model=require("../Model/user_Model")
const {getAllFactory, createFactory, updateFactory, deleteFactory }=require("../utility/crudFactory")
const userPost=createFactory(user_Model)
const Allusers=getAllFactory(user_Model)
const updateuser = updateFactory(user_Model);
const deleteuser = deleteFactory(user_Model);

module.exports = { userPost, Allusers, updateuser, deleteuser };