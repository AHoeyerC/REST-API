const mongoose = require('mongoose');

const studentLessonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    topic: String,
    lessonNumber: Number
});

module.exports = mongoose.model('StudentLesson', studentLessonSchema);