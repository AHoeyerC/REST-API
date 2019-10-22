const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check_auth');
const LessonController = require('../controllers/lesson');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    //reject file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'text/txt' || file.mimetype === 'text/doc'){
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        filesize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// Handling every get request
router.get('/', checkAuth, LessonController.lesson_get_all);
// Handling post/create request
router.post('/', checkAuth, upload.single('lessonInfo'), LessonController.lesson_post);
// Handling single get request
router.get('/:lessonId', checkAuth, LessonController.lesson_get);
// Handling update request
router.patch('/:lessonId', checkAuth, LessonController.lesson_patch);
// Handling delete request
router.delete('/:lessonId', checkAuth, LessonController.lesson_delete);

module.exports = router;