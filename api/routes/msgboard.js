const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const MsgBoard = require('../models/msgBoard');

router.get('/', (req, res, next) => {
    MsgBoard.find()
    .select('name messageB _id')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            messageB: docs.map(doc => {
                return {
                    name: doc.name,
                    messageB: doc.messageB,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/msgboard/" + doc._id
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
    const msg = new MsgBoard({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        messageB: req.body.messageB,
    });
    msg
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Message created succesfully',
            createdMessageB: {
                name: result.name,
                messageB: result.messageB,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/msgboard/" + result._id   
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

router.get('/:msgId', (req, res, next) => {
    const id = req.params.msgId;
    MsgBoard.findById(id)
    .select('name messageB _id')
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json({
                messageB: doc,
                request: {
                    type: 'GET',
                    description: 'GET_ALL_MESSAGES',
                    url: "http://localhost:3000/msgboard/"
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
router.patch('/:msgId', (req, res, next) => {
    const id = req.params.msgId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    MsgBoard.update({_id: id}, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Message updated',
            request: {
                type: 'GET',
                url: "http://localhost:3000/msgboard/" + id
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

router.delete('/:msgId', (req, res, next) => {
    const id = req.params.msgId;
    MsgBoard.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Message deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/msgboard',
                data: { name: 'String', messageB: 'String' }
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