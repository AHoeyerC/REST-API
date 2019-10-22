const mongoose = require('mongoose');
const StudentLesson = require('../models/studentLesson');
const Lesson = require('../models/lesson');

exports.studentlesson_get_all = (req, res, next) => {
    StudentLesson
    .find()
    .select('lesson quantity _id')
    .populate('product', 'name')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            studentLesson: docs.map(doc => {
                return {
                    _id: doc._id,
                    lesson: doc.lesson,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/studentlesson/" + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
};

exports.studentLesson_post = (req, res, next) => {
    Lesson.findById(req.body.lessonId)
        .then(lesson => {
            if (!lesson) {
                return res.status(404).json({
                    message: 'Lesson not found'
                });
            }
            const studentLesson = new StudentLesson({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                lesson: req.body.lessonId
            });
            return studentLesson
            .save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Student Lesson Stored',
                createdStudentlesson: {
                    _id: result._id,
                    lesson: result.lesson,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/studentlesson/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

exports.studentLesson_get = (req, res, next) => {
    StudentLesson.findById(req.params.studentlessonId)
    .populate('product')
    .exec()
    .then(studentLesson => {
        if (!studentLesson) {
            return res.status(404).json({
                message: 'Student Lesson not found'
            });
        }
        res.status(200).json({
            studentLesson: studentLesson,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/studentlesson'
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
    
};

exports.studentlesson_patch = (req, res, next) => {
    const id = req.params.studentlessonId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    StudentLesson.update({_id: id}, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Student Lesson updated',
            request: {
                type: 'GET',
                url: "http://localhost:3000/studentlesson/" + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.studentlesson_delete = (req, res, next) => {
    StudentLesson.remove({ _id: req.params.studentlessonId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Student Lesson deleted',
            request: {
                type: "POST",
                url: "http://localhost:3000/studentlesson",
                body: { lessonId: 'ID', quantity: 'Number'}
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};