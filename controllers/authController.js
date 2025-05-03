import authService from "../services/authService.js";

const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        console.log('email', email, 'password', password);
        
        const token = await authService.login(email, password);
        return res.status(200).json({status: true, message: "Login successful", token});
    } catch (error) {
        return res.status(401).json({status: false, message: error.message});
    }
}

const register = async (req,res) => {
    try {
        const { name, email, password } = req.body;
        console.log('name', name, 'email', email, 'password', password);
        
        const token = await authService.register(name, email, password);
        return res.status(200).json({status: true, message: "Register successful", token});
    } catch (error) {
        return res.status(401).json({status: false, message: error.message});
    }
}

export default {login, register};