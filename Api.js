const express = require("express");
const mongoose = require("mongoose");
const validateUsers=require("./validateUsers")
const project_Model=require("./Model/project_Model")
const user_Model=require("./Model/user_Model")
const task_Model=require("./Model/task_Model")
const {userPost, Allusers, updateuser, deleteuser}=require("./controller/user_ModelController")
const {taskPost, Alltasks, updatetask, deletetask}=require("./controller/task_Controller")
const {projectPost, Allprojects, updateProject, deleteProject}=require("./controller/project_Controller")
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(express.json());
app.use(cors());
const Middleware=require("./authMiddleware")
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

const username = encodeURIComponent("AkshayKumar");
const password = encodeURIComponent("AkshayKumar@143");

// Replace "myDatabase" with your actual database name
const uri = `mongodb+srv://${username}:${password}@cluster0.85x1g.mongodb.net/`;
mongoose.connect(uri)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.log("MongoDB Connection Error:", err.message));
const PORT=3000


// Middleware to validate assigned users before creating a project or task

app.post("/api/auth", async (req, res) => {
  const { fullName, email } = req.body;
  console.log("Received:", fullName, email); 

  try {
    const user = await user_Model.findOne({ fullName, email });
    console.log("User found:", user); 

    if (!user || user.role .toLowerCase()!== "admin") {
      return res.status(401).json({ message: "Access denied. Not an admin." });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "your_secret_key", 
      { expiresIn: "90d" }
    );
    res.status(200).json({ message: "Login successful", userId: user._id ,token});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
/*************  user related API's*********/
app.get("/Api/users",Middleware,Allusers)
app.post("/Api/users",Middleware,userPost)
app.put("/Api/users/:id",Middleware,updateuser)
app.delete("/Api/users/:id",deleteuser)
/**************** project related API's***********************/
app.get("/Api/projects",Allprojects)
app.post("/Api/projects",validateUsers,projectPost)
app.put("/Api/projects/:id",updateProject)
app.delete("/Api/projects/:id", deleteProject)

/**************** task related *****************************/
app.get("/Api/tasks",Alltasks)
app.post("/Api/tasks",validateUsers,taskPost)
app.put("/Api/tasks/:id",updatetask)
app.delete("/Api/tasks/:id", deletetask)


app.listen(PORT,function(){
    console.log(`server running at port ${PORT}`)
})
