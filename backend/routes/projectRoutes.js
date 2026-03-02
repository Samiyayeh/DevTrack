const express = require('express');
const router = express.Router();
const { Project, Task } = require('../model/project'); // Import your Model

// 1. GET: Fetch all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({include: [Task]});
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id, {include: [Task]});
       
        if(!project){
            return res.status(404).json({ error: "Project not found" });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch project" });
    }
});



// 2. POST: Create a new project (Data comes from React form)
router.post('/', async (req, res) => {
  try {
    // req.body contains the JSON sent from your Vite/React frontend
    const newProject = await Project.create({
      name: req.body.name,
      description: req.body.description
    },);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



// 3. DELETE: Remove a project by ID
router.delete('/:id', async (req, res) => {
  try {
    await Project.destroy({ where: { id: req.params.id } });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await Project.update({
            name: req.body.name,
            description: req.body.description
        }, {
            where: { id: req.params.id }
        });
        res.status(201).json({ message: "Project updated successfully" }, updatedProject);
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
})



module.exports = router;