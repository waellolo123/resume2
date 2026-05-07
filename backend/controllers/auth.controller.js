import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
// import generateToken from "../utils/generateToken.js";
import Resume from "../models/resume.model.js";
import jwt from "jsonwebtoken";


const generateToken = (userId)=>{
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d"});
  return token;
}


// ******************************************************
export const register = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
      return res.status(400).json({message: "all files are required"});
    }
    const user = await User.findOne({email});
    if(user){
      return res.status(400).json({message: "email already taken"});
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      name, email, password: hashedPassword
    });
    const token = generateToken(newUser._id);
    newUser.password = undefined;
    res.status(201).json({message: "user created successfully", token, user: {newUser}});
  } catch (error) {
    console.log("error in register controller", error.message);
    return res.status(500).json({message: "internal server error"});
  }
}


// ******************************************************
export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({message: "all files are required"});
    }
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({message: "user not found"});
    }
    if(!user.comparePassword(password)){
      return res.status(400).json({message: "wrong credentials"});
    }
    const token = generateToken(user._id);
    user.password = undefined;
    res.status(200).json({message: "user logged in", token, user});
  } catch (error) {
    console.log("error in login controller", error.message);
    return res.status(500).json({message: "internal server error"});
  }
}


// ******************************************************
export const logout = async (req, res) => {}


// ******************************************************
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({message: "user not found"});
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.log("error in get user data controller", error.message);
    return res.status(500).json({message: "internal server error"});
  }
}


// ******************************************************
export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId;
    const resumes = await Resume.find({userId});
    if(!resumes){
      return res.status(400).json({message: "No Resumes Found"}); 
    }
    res.status(200).json({resumes});
  } catch (error) {
    console.log("error in get user resumes controller", error.message);
    return res.status(500).json({message: "internal server error"});
  }
}

