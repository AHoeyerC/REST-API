const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const MsgBoard = require('../models/msgBoard');

router.get('/', (req, res, next) => {
    MsgBoard.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
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
            message: 'Message created',
            createdMessageB: msg
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
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
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
        console.log(result),
        res.status(200).json(result);
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
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;