const Comic = require('../models/comicModel');

// Create a comic
exports.createComic = async (req, res) => {
  try {
    const comic = new Comic(req.body);
    const savedComic = await comic.save();
    res.status(201).json(savedComic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all comics with pagination, filtering, and sorting
exports.getComics = async (req, res) => {
  const { page = 1, limit = 10, sort = 'name', ...filters } = req.query;
  
  try {
    const comics = await Comic.find(filters)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(comics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comic by ID
exports.getComicById = async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.id);
    if (!comic) return res.status(404).json({ message: 'Comic not found' });
    res.json(comic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a comic
exports.updateComic = async (req, res) => {
  try {
    const updatedComic = await Comic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedComic) return res.status(404).json({ message: 'Comic not found' });
    res.json(updatedComic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a comic
exports.deleteComic = async (req, res) => {
  try {
    const comic = await Comic.findByIdAndDelete(req.params.id);
    if (!comic) return res.status(404).json({ message: 'Comic not found' });
    res.json({ message: 'Comic deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
