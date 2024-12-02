import express from "express";
import Task from "../../database/models/tasks.js";
const router = express.Router();

// Get all tasks

const task = (app) => {
  app.get("/", async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/", async (req, res) => {
    const task = new Task(req.body);
    try {
      const savedTask = await task.save();
      res.status(201).json(savedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

export default task;
