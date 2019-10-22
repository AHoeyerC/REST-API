const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    topic: { type: String, required: true },
    lessonNumber: { type: Number, required: true},
    lessonDescrib: { type: String, required: true },
    lessonInfo: { type: String, required: false}
});

module.exports = mongoose.model('Lesson', lessonSchema);