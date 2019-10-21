const mongoose = require('mongoose');

const msgBoardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    messageB: { type: String, required: true },
});

module.exports = mongoose.model('MsgBoard', msgBoardSchema);