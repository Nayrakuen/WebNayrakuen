const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { verifyToken } = require('../middleware/authMiddleware');
const cloudinary = require('../utils/cloudinary');

const multer = require('multer');
const streamifier = require('streamifier');
const upload = multer();

router.post('/upload', verifyToken, upload.single('image'), (req, res) => {
  const uniqueName = `news_${Date.now()}`;

  const stream = cloudinary.uploader.upload_stream(
    {
      folder: 'news',
      public_id: uniqueName,
      resource_type: 'image',
    },
    (error, result) => {
      if (error) return res.status(500).json({ error });

      res.json({
        imageUrl: result.secure_url,
        publicId: result.public_id,
      });
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
});

router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.post('/', verifyToken, newsController.createNews);
router.put('/:id', verifyToken, newsController.updateNews);
router.delete('/:id', verifyToken, newsController.deleteNews);

module.exports = router;
