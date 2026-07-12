 import Task from "../models/Task.js";
 
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Task Created Successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Task Updated Successfully",
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

 
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};