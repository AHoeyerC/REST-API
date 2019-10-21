const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const StudentLesson = require('../models/studentLesson');

router.get('/', (req, res, next) => {
    StudentLesson
    .find()
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
    
});

router.post('/', (req, res, next) => {
    const studentLesson = new StudentLesson({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        lesson: req.body.lessonId
    });
    studentLesson
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
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