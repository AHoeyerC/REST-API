const mongoose = require('mongoose');
const Lesson = require('../models/lesson');

exports.lesson_get_all =(req, res, next) => {
    Lesson.find()
    .select('name topic lessonNumber lessonDescrib _id lessonInfo')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            lessonDescrib: docs.map(doc => {
                return {
                    name: doc.name,
                    topic: doc.topic,
                    lessonNumber: doc.lessonNumber,
                    lessonDescrib: doc.lessonDescrib,
                    lessonInfo: doc.lessonInfo,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/lesson/" + doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.lesson_post = (req, res, next) => {
    console.log(req.file);
    const lesson = new Lesson({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        topic: req.body.topic,
        lessonNumber: req.body.lessonNumber,
        lessonDescrib: req.body.lessonDescrib,
        lessonInfo: req.file.path
    });
    lesson
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Lesson created succesfully',
            createdLesson: {
                name: result.name,
                topic: result.topic,
                lessonNumber: result.lessonNumber,
                lessonDescrib: result.lessonDescrib,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/lesson/" + result._id   
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err    
        })
    });
};

exports.lesson_get = (req, res, next) => {
    const id = req.params.lessonId;
    Lesson.findById(id)
    .select('name topic lessonNumber lessonDescrib _id lessonInfo')
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json({
                topic: doc,
                request: {
                    type: 'GET',
                    description: 'GET_ALL_TOPICS',
                    url: "http://localhost:3000/lesson/"
                }
            });
        } else {
            res.status(404).json({message: "No valid entry found for provided ID"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.lesson_patch = (req, res, next) => {
    const id = req.params.lessonId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Lesson.update({_id: id}, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Lesson updated',
            request: {
                type: 'GET',
                url: "http://localhost:3000/lesson/" + id
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

exports.lesson_delete = (req, res, next) => {
    const id = req.params.lessonId;
    Lesson.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Lesson deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/lesson',
                body: { name: 'String', topic: 'String', lessonNumber: 'Number', lessonDescrib: 'String' }
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