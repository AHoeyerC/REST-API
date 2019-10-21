const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Lesson = require('../models/lesson');

router.get('/', (req, res, next) => {
    Lesson.find()
    .select('name topic lessonNumber lessonDescrib _id')
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
});

router.post('/', (req, res, next) => {
    const lesson = new Lesson({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        topic: req.body.topic,
        lessonNumber: req.body.lessonNumber,
        lessonDescrib: req.body.lessonDescrib,
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
});

router.get('/:lessonId', (req, res, next) => {
    const id = req.params.lessonId;
    Lesson.findById(id)
    .select('name topic lessonNumber lessonDescrib _id')
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
});
router.patch('/:lessonId', (req, res, next) => {
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
});

router.delete('/:lessonId', (req, res, next) => {
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
});

module.exports = router;