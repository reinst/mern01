const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { Course } = require('../models/course');


router.get("/", async (req, res, next) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (err) {
        next(err);
    }
});


router.post("/", async (req, res, next) => {
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
        next(err);
    }
});


router.get("/:id", async (req, res, next) => {
    try {
        const course = await Course.findById(
            req.params.id
        );
        if (!course) return res.status(404).send('Course not found');
    } catch (err) {
        next(err);
    }
});


router.put('/:id', auth, async (req, res, next) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            { tags: req.body.tags },
            { new: true },
        );
        if (!course) return res.status(404).send('Course not found');
        res.send(course);
    } catch (err) {
        next(err);
    }
});


router.delete('/:id', auth, async (req, res, next) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).send('Document not found');
        res.send(`Deleted: ${id}`);
    } catch (err){
        next(err);
    }

});


module.exports = router;