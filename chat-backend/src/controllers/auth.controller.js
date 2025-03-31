import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
    console.log(req.body);
    const { fullName, email, password } = req.body;

    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            // generate jwt token here
            const token = generateToken(newUser._id, res);

            await newUser.save();
      
            res.status(201).json({
              _id: newUser._id,
              fullName: newUser.fullName,
              email: newUser.email,
              profilePic: newUser.profilePic,
            });
          }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong. We are fixing it." });
    }
};

export const login = (req, res) => {
    res.send("login");
};

export const logout = (req, res) => {
    res.send("logout");
};
