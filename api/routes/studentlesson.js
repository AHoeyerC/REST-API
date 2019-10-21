const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Student lesson fetched'
    });
});

router.post('/', (req, res, next) => {
    const lesson = {
        lessonId: req.body.lessonId,
        topic: req.body.topic
    };
    res.status(201).json({
        message: 'Student lesson created',
        lesson: lesson
    });
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