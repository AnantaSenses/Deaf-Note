const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

const handlePrismaError = (error) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle Prisma known errors
    console.error('Prisma Client Known Request Error:', error.message);
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    // Handle Prisma unknown errors
    console.error('Prisma Client Unknown Request Error:', error.message);
  } else {
    // Handle other errors
    console.error('Unexpected Error:', error);
  }
  throw new Error('Internal Server Error');
};

const getAllNotesByUserId = async (userId) => {
  try {
    const result = await prisma.note.findMany({
      where: {
        user_id: userId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const getNoteByIdAndUserId = async (noteId, userId) => {
  try {
    // Convert noteId to integer if needed
    const noteIdInt = parseInt(noteId, 10);
    const result = await prisma.note.findUnique({
      where: {
        note_id: noteIdInt,
        user_id: userId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const createNoteForUser = async (userId, content) => {
  try {
    const result = await prisma.note.create({
      data: {
        user_id: userId,
        content,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const updateNoteByIdAndUserId = async (noteId, userId, content) => {
  try {
    const noteIdInt = parseInt(noteId, 10);

    // Check if the note belongs to the specified user
    const existingNote = await prisma.note.findUnique({
      where: {
        note_id: noteIdInt,
      },
    });

    if (!existingNote || existingNote.user_id !== userId) {
      return null; // Returning null to indicate unauthorized
    }

    // Update the note
    const result = await prisma.note.update({
      where: {
        note_id: noteIdInt,
      },
      data: {
        content,
      },
    });

    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const deleteNoteByIdAndUserId = async (noteId, userId) => {
  try {
    // Convert noteId to integer if needed
    const noteIdInt = parseInt(noteId, 10);

    // Check if the note belongs to the specified user
    const existingNote = await prisma.note.findUnique({
      where: {
        note_id: noteIdInt,
      },
    });

    if (!existingNote || existingNote.user_id !== userId) {
      return null; // Returning null to indicate unauthorized
    }

    // Delete the note
    const result = await prisma.note.delete({
      where: {
        note_id: noteIdInt,
        user_id: userId,
      },
    });

    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

// Disconnect Prisma client when done
const disconnect = async () => {
  await prisma.$disconnect();
};

module.exports = {
  getAllNotesByUserId,
  getNoteByIdAndUserId,
  createNoteForUser,
  updateNoteByIdAndUserId,
  deleteNoteByIdAndUserId,
  disconnect,
};
