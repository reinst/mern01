const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Course = require('../models/course');


router.get("/", async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: "An error occured", error: err.message });
    }
});


router.post("/", auth, async (req, res) => {
    try {
        const newCourse = await Course.create({
            name: req.body.name,
            author: req.body.author,
            tags: req.body.tags,
            isPublished: req.body.isPublished,
        });
        console.log("Course created:", newCourse);
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).json({ message: "An error occured", error: err.message });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findById(
            req.params.id
        );
        if (!course) return res.status(404).send('Course not found');
    } catch (err) {
        res.status(400).send('Invalid ID');
    }
});


router.put('/:id', auth, async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            { tags: req.body.tags },
            { new: true },
        );
        if (!course) return res.status(404).send('Course not found');
        res.send(course);
    } catch (err) {
        res.status(400).send('Invalid ID or bad request');
    }
});


router.delete('/:id', auth, async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).send('Document not found');
        res.send('Deleted: ');
    } catch {
        res.status(400).send('Invalid ID or bad request');
    }

});


module.exports = router;