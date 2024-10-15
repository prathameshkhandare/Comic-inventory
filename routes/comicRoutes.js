const express = require('express');
const router = express.Router();
const {
  createComic,
  getComics,
  getComicById,
  updateComic,
  deleteComic,
} = require('../controllers/comicController');

router.post('/comics', createComic);


router.get('/comics', getComics);


router.get('/comics/:id', getComicById);

router.put('/comics/:id', updateComic);


router.delete('/comics/:id', deleteComic);

module.exports = router;
