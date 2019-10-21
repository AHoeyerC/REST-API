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
    const msg = {
        name: req.body.name,
        message: req.body.message
    };
    res.status(201).json({
        message: 'Handling post',
        createdMessage: msg
    });
});

router.get('/:msgId', (req, res, next) => {
    const id = req.params.msgId;
    if (id === 'special') {
        res.status(200).json({
            message: 'special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
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