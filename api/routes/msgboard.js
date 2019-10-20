const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling get'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling post'
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