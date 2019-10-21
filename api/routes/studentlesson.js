const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const StudentLesson = require('../models/studentLesson');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Student lesson fetched'
    });
});

router.post('/', (req, res, next) => {
    const studentLesson = new StudentLesson({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        topic: req.body.topic,
        lessonNumber: req.body.lessonNumber
    });
    studentLesson
    .save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Student lesson created',
        createdLesson: lesson
    });
});

router.get('/:studentLessonId', (req, res, next) => {
    const id = req.params.studentLessonId;
    
});

router.get('/:studentlessonId', (req, res, next) => {
    res.status(201).json({
        message: 'Student lesson details',
        studentlessonId: req.params.studentlessonId
    });
});

router.delete('/:studentlessonId', (req, res, next) => {
    res.status(201).json({
        message: 'Student lesson deleted',
        studentlessonId: req.params.studentlessonId
    });
});

module.exports = router;