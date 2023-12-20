const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

const handlePrismaError = (error) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error('Prisma Client Known Request Error:', error.message);
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    console.error('Prisma Client Unknown Request Error:', error.message);
  } else {
    console.error('Unexpected Error:', error);
  }
  throw new Error('Internal Server Error');
};

const getUserById = async (userId) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const getUserByEmail = async (email) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const createUser = async ({ name, email, password }) => {
  try {
    const result = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const updateUser = async (userId, { name, email, password }) => {
  try {
    const result = await prisma.user.update({
      where: {
        user_id: userId,
      },
      data: {
        name,
        email,
        password,
      },
    });
    return result;
  } catch (error) {
    return handlePrismaError(error);
  }
};

const deleteUser = async (userId) => {
  try {
    const result = await prisma.user.delete({
      where: {
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
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  disconnect,
};
