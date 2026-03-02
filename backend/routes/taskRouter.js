const express = require('express');
const router = express.Router();
const { Task } = require('../model/project'); // Import your Model


router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if(!task){
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch task" });
    }
})


router.get('/getallTasks/:id', async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { projectId: req.params.id } });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
})




router.post('/:id', async (req, res) => {
    try {
        const newTask = await Task.create({
            name: req.body.name,
            description: req.body.description,
            projectId: req.params.id
        });
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.update({
            name: req.body.name,
            description: req.body.description
        }, {
            where: { id: req.params.id }
        });
        res.status(201).json({ message: "Task updated successfully" }, updatedTask);
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
})


router.put('/status/:id', async (req, res) => {
    try {
        const updatedTask = await Task.update({
            status: req.body.status
        }, {
            where: { id: req.params.id }
        });
        res.status(201).json({ message: "Task updated successfully" }, updatedTask);
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
})


router.delete('/:id', async (req, res) => {
    try {
        await Task.destroy({ where: { id: req.params.id } });
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
})




module.exports = router;