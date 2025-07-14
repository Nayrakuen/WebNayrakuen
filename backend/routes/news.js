const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.post('/', verifyToken, newsController.createNews);
router.put('/:id', verifyToken, newsController.updateNews);
router.delete('/:id', verifyToken, newsController.deleteNews);

module.exports = router;
