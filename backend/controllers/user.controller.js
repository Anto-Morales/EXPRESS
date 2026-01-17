import {User} from "../models/user.models.js";

//crear o registrar usuario
const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        //basic validation
        if(!username || !email || !password){
            return res.status(400)
            .json({message: "All fields are important"});
        }
        //check if user already exists
        const existing = await User.findOne({email: email.toLowerCase()});
        if(existing){
            return res.status(400).json({message: "Username already exists"});
        }
        //create new user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });
        
        res.status(201).json({
            message: "User registered",
            user: {id: user._id,email: user.email, username: user.username, }
        });
    } catch (error) {
        
        console.log("REGISTER ERROR 👉", error); // 👈 CLAVE
        res.status(500).json({
        message: "Internal Server Error",
        error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        //checkin if the user already exist
        const {email, password} = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) return res.status(400).json({
            message: "User not found"
        });

        //compare passwords
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id, 
                email: user.email, 
                username: user.username
            }
        })

        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", 
        });
    }
}

const logoutUser = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({
            email
        });
        if(!user) return res.status(404).json({
            message: "User not found"
        });
        res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        });
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
};
