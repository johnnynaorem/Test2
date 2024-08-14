import express from "express";
import { body } from 'express-validator';
import formidable from 'express-formidable';
import { check, validationResult } from 'express-validator';
import { getAllUsers, getDeleteUser, getPhoto, loginController, registerController } from "../controller/authController.js";

import multer from 'multer';
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register route with validation rules
const upload = multer({ dest: 'uploads/' });


router.post('/register', [
  upload.single('image'),
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Invalid email format'),
  check('password').notEmpty().withMessage('Password is required'),
  check('mobileNumber')
    .isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits long')
    .isNumeric().withMessage('Mobile number must be numeric'),
  check('gender').notEmpty().withMessage('Gender is required'),
  check('designation').notEmpty().withMessage('Designation is required')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, registerController);
router.post('/login', [
  check('email').isEmail().withMessage('Invalid email format'),
  check('password').notEmpty().withMessage('Password is required'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, loginController);

//getAll User 
router.get('/getAll', getAllUsers)

//get user image route
router.get('/user-image/:pid', getPhoto);

//delete single user 
router.delete('/delete-user/:userId', getDeleteUser)



export default router;