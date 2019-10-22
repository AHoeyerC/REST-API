const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');

const StudentlessonController = require('../controllers/studentlesson');

// Handling every get request
router.get('/', checkAuth, StudentlessonController.studentlesson_get_all);
// Handling post/create request
router.post('/', checkAuth, StudentlessonController.studentLesson_post);
// Handling single get request
router.get('/:studentLessonId', checkAuth, StudentlessonController.studentLesson_get);
// Handling update request
router.patch('/:studentlessonId', checkAuth, StudentlessonController.studentlesson_patch);
// Handling delete request
router.delete('/:studentlessonId', checkAuth, StudentlessonController.studentlesson_delete);

module.exports = router;