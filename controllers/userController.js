import userService from "../services/userService.js";
const getUsers = async (req,res) => {
    try {
        const users = await userService.list();
        res.status(200).json({status: true,message:"users found",users});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {getUsers};