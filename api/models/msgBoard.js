const mongoose = require('mongoose');

const msgBoardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    message: String,
});

module.exports = mongoose.model('MsgBoard', msgBoardSchema);