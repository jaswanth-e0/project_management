const User = require("./Model/user_Model");
const validateUsers = async (req, res, next) => {
    try {
        const { assignedUsers } = req.body;
        
        // Check if assignedUsers array is provided
        if (!assignedUsers || assignedUsers.length === 0) {
            return res.status(400).json({
                status: "failure",
                message: "At least one assigned user is required."
            });
        }

        // Find users in the database
        const users = await User.find({ _id: { $in: assignedUsers } });

        // Check if all provided users exist
        if (users.length !== assignedUsers.length) {
            return res.status(400).json({
                status: "failure",
                message: "One or more assigned users do not exist in the database."
            });
        }

        next(); // Proceed to the next middleware or controller
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: error.message
        });
    }
};

module.exports = validateUsers;