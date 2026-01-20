const { body, param, validationResult } = require("express-validator");
const mongoose = require("mongoose");

// Validation result handler
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};

// Auth validations
const registerValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),
  body("name")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Name cannot exceed 50 characters"),
  validate,
];

const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  validate,
];

// Todo validations
const createTodoValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),
  body("dueDate").optional().isISO8601().withMessage("Invalid date format"),
  validate,
];

const updateTodoValidation = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid todo ID"),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),
  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("Status must be pending or completed"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),
  body("dueDate").optional().isISO8601().withMessage("Invalid date format"),
  validate,
];

const todoIdValidation = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid todo ID"),
  validate,
];

module.exports = {
  registerValidation,
  loginValidation,
  createTodoValidation,
  updateTodoValidation,
  todoIdValidation,
};
