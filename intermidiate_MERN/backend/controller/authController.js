import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import fs from 'fs';

export const registerController = async (req, res) => {
  try {
    const { name, email, password, mobileNumber, gender, course, designation } = req.body;
    const image = req.file;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ success: false, message: 'Already Registered, please login' });
    }

    const hashedPassword = await hashPassword(password);
    const user = new userModel({ name, email, mobileNumber, course, gender, designation, password: hashedPassword });

    if (image) {
      user.image.data = fs.readFileSync(image.path);
      user.image.contentType = image.mimetype;
    }

    await user.save();
    res.status(201).send({
      success: true,
      message: "User Registration Successful",
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error: error.message
    });
  }
};


export const loginController = async (req, res) => {
  try {
    const {email, password} = req.body;
    //validation
    if(!email || !password){
      return res.status(404).send({
        success: false,
        message: "Invalid email and password"
      })
    }
    //check user
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      })
    }
    const match = await comparePassword(password, user.password)
    if(!match){
      return res.status(200).send({
        success: false,
        message: "Invalid password"
      })
    }
    //token
    const token = JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
    res.status(200).send({
      success: true,
      message: 'Login successfully',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        id: user._id
      },
      token
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in login",
      error
    })
  }
};

//getPhoto
export const getPhoto = async (req, res) => {
  try {
    const {pid} = req.params
    const user = await userModel.findById(pid).select('image')
    if(user.image.data){
      res.set('Content-type', user.image.contentType);
      res.status(200).send(user.image.data)
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error while getting image",
      error: error.message
    })
  }
}

//getAllUsers
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({
      role: {$ne: 1}
    }).select('-password').select('-image')
    res.json(users)
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in login",
      error
    })
  }
};

//getSingleUser
export const getSingleUser = async (req, res) => {
  try {
    const users = await userModel.find({_id: req.params.userId}).select('-password').select('-image')
    res.json(users)
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in login",
      error
    })
  }
};

//getDeleteUser
export const getDeleteUser = async (req, res) => {
  try {
    const users = await userModel.findByIdAndDelete({_id: req.params.userId})
    res.send({
      success: true,
      users
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in delete user",
      error
    })
  }
};


