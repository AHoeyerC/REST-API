const mongoose = require('mongoose');

const msgBoardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    messageB: String,
});

module.exports = mongoose.model('MsgBoard', msgBoardSchema);