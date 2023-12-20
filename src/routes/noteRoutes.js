const express = require('express');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authentication middleware to protect notes routes
router.use(authMiddleware);

// Route to create a new note for a specific user
router.post('/', noteController.createNoteForUser);

// Route to get all notes for a specific user
router.get('/', noteController.getAllNotesByUserId);

// Route to get a specific note by ID for a specific user
router.get('/:noteId', noteController.getNoteByIdAndUserId);

// Route to update a note by ID for a specific user
router.put('/:noteId', noteController.updateNoteByIdAndUserId);

// Route to delete a note by ID for a specific user
router.delete('/:noteId', noteController.deleteNoteByIdAndUserId);

module.exports = router;
