const noteService = require('../services/noteService');

// Controller function to get all notes for a specific user
const getAllNotesByUserId = async (req, res) => {
  const { userId } = req.user;

  try {
    const notes = await noteService.getAllNotesByUserId(userId);
    res.json({ notes });
  } catch (error) {
    console.error('Error getting all notes for user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get a specific note by ID for a specific user
const getNoteByIdAndUserId = async (req, res) => {
  const { noteId } = req.params;
  const { userId } = req.user;

  try {
    const note = await noteService.getNoteByIdAndUserId(noteId, userId);
    if (!note) {
      // Note not found
      return res.status(404).json({ error: 'Note not found' });
    }

    return res.json({ note });
  } catch (error) {
    console.error('Error getting note by ID for user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to create a new note for a specific user
const createNoteForUser = async (req, res) => {
  const { userId } = req.user;
  const { content } = req.body;

  // Ensure content is present in the request body
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const newNote = await noteService.createNoteForUser(userId, content);
    return res.json({ message: 'Note created successfully', note: newNote });
  } catch (error) {
    console.error('Error creating note for user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to update a note by ID for a specific user
const updateNoteByIdAndUserId = async (req, res) => {
  const { userId } = req.user;
  const { noteId } = req.params;
  const { content } = req.body;

  // Ensure content is present in the request body
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const updatedNote = await noteService.updateNoteByIdAndUserId(noteId, userId, content);

    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    return res.json({ message: 'Note updated successfully', note: updatedNote });
  } catch (error) {
    console.error('Error updating note by ID for user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to delete a note by ID for a specific user
const deleteNoteByIdAndUserId = async (req, res) => {
  const { noteId } = req.params;
  const { userId } = req.user; // Extracted from decoded token

  try {
    const deletedNote = await noteService.deleteNoteByIdAndUserId(noteId, userId);

    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    return res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note for user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllNotesByUserId,
  getNoteByIdAndUserId,
  createNoteForUser,
  updateNoteByIdAndUserId,
  deleteNoteByIdAndUserId,
};
