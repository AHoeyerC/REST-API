const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const MsgBoard = require('../models/msgBoard');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling get'
    });
});

router.post('/', (req, res, next) => {
    const msg = new MsgBoard({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        message: req.body.message,
    });
    msg
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling post',
            createdMessage: result
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
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});
router.patch('/:msgId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated message'
    });
});

router.delete('/:msgId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted message'
    });
});

module.exports = router;