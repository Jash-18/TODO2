const express = require("express");
const Todo = require("../models/Todo");
const { ensureAuthenticated } = require("../middleware/auth");
const {
  createTodoValidation,
  updateTodoValidation,
  todoIdValidation,
} = require("../validations");

const router = express.Router();

// All routes require authentication
router.use(ensureAuthenticated);

// @route   GET /api/todos
// @desc    Get all todos for logged-in user
// @access  Private
router.get("/", async (req, res) => {
  try {
    const { status, sort = "newest" } = req.query;

    const query = { userId: req.user._id };
    if (status && ["pending", "completed"].includes(status)) {
      query.status = status;
    }

    let sortOption = { createdAt: -1 };
    switch (sort) {
      case "oldest":
        sortOption = { createdAt: 1 };
        break;
      case "priority":
        sortOption = { priority: -1, createdAt: -1 };
        break;
      case "dueDate":
        sortOption = { dueDate: 1, createdAt: -1 };
        break;
    }

    const todos = await Todo.find(query).sort(sortOption);
    res.json({ todos });
  } catch (error) {
    console.error("Get todos error:", error);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});

// @route   POST /api/todos
// @desc    Create new todo
// @access  Private
router.post("/", createTodoValidation, async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const todo = await Todo.create({
      title,
      description,
      priority,
      dueDate,
      userId: req.user._id,
    });

    res.status(201).json({
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    console.error("Create todo error:", error);
    res.status(500).json({ message: "Failed to create todo" });
  }
});

// @route   PUT /api/todos/:id
// @desc    Update todo
// @access  Private
router.put("/:id", updateTodoValidation, async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Update fields
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (status !== undefined) todo.status = status;
    if (priority !== undefined) todo.priority = priority;
    if (dueDate !== undefined) todo.dueDate = dueDate;

    await todo.save();

    res.json({
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    console.error("Update todo error:", error);
    res.status(500).json({ message: "Failed to update todo" });
  }
});

// @route   DELETE /api/todos/:id
// @desc    Delete todo
// @access  Private
router.delete("/:id", todoIdValidation, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Delete todo error:", error);
    res.status(500).json({ message: "Failed to delete todo" });
  }
});

// @route   PATCH /api/todos/:id/toggle
// @desc    Toggle todo status
// @access  Private
router.patch("/:id/toggle", todoIdValidation, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.status = todo.status === "completed" ? "pending" : "completed";
    await todo.save();

    res.json({
      message: "Todo status toggled",
      todo,
    });
  } catch (error) {
    console.error("Toggle todo error:", error);
    res.status(500).json({ message: "Failed to toggle todo status" });
  }
});

module.exports = router;
