const bcrypt = require("bcrypt")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const engineer = "Engineer"
const manager = "Manager"

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields Required"
            })
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User exists, Please login"
            })
        }


        let newUser = await User.create({
            name,
            email,
            password
        })

        const tokenPayload = {
            _id: newUser._id,
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "24h" })


        const user = {
            name,
            email,
            profileImage: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
        }

        res.status(201).json({
            success: true,
            message: 'Signup Successfull',
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to SignUp"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email & Password Required"
            });
        }

        const registeredUser = await User.findOne({ email }).select("+password")
            .populate("eventsJoined")
            .populate("eventsCreated")

        if (!registeredUser) {
            return res.status(401).json({
                success: false,
                message: "User Not Registered, Please Signup"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, registeredUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const tokenPayload = {
            _id: registeredUser._id,
        };
        const expiresIn = "24h"; // 24 hours in seconds
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn });



        const user = registeredUser.toObject();
        delete user.password

        user.profileImage = `https://api.dicebear.com/5.x/initials/svg?seed=${registeredUser?.name}`

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Login Successful",
            user,
            token
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Login Failed, Please Try Again"
        });
    }
};