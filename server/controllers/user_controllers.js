import User from "../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import pkg from 'bcryptjs';
const { hashSync } = pkg;

export const signup = async (req, res) => {
    const { name, email, password, role, subgroup, group} = req.body;

    if (!name || !email || !password || !role || !subgroup || !group) {
        return res.status(422).json({ error: "empty fields!" });
    }

    try {
        const userExists = await User.findOne({ email : email });
        if (userExists) {
            return res.status(422).json({ error: "User already exists!" });
        }

        const hashedPassword = pkg.hashSync(password);
        const user = new User({ name, email, password: hashedPassword, role, subgroup, group });
        const userRegister = await user.save();

        if (userRegister) {
            res.status(201).json({ message: "user registered successfully!" });
        } else {
            res.status(422).json({ error: "Registration failed" });
        }
    } catch (err) {
        console.log(err);
    }
};

export const login = async (req, res) => {
    try {
        const { email,  password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "fields empty!" });
        }

        const userLogin = await User.findOne({ email : email }) //has entire document

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (isMatch) {

                // console.log(userLogin);

                const token = await userLogin.generateAuthToken();
                // console.log(token);
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });
                //   res.cookie("test", 'val');
                res.status(201).json({ message: "logged in!", role : userLogin.role, token: token,name: userLogin.name, email: userLogin.email, subgroup: userLogin.subgroup, group: userLogin.group});
            }
            else {
                res.status(400).json({ message: "pwd incorrect!" });
            }
        }
        else {
            return res.status(400).json({ message: "user does not exist !" });
        }

    } catch (err) {
        console.log(err);
    }
}

export const userDetails = async (req, res) => {
    res.send(req.rootUser);
}

export const logout = async (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).json({ message: "user logged out" });
}


export const resetPassword = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
        return res.status(400).json({ message: "Please provide all fields." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect." });
        }

        const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error." });
    }
}