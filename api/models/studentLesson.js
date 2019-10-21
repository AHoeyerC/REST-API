const mongoose = require('mongoose');

const studentLessonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('StudentLesson', studentLessonSchema);