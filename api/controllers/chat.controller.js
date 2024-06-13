import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
const getUserByUsername = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User not found with ID ${userId}`);
  }
  return user;
};

export const create = async (req, res, next) => {
  const { text } = req.body;
  if (!text || !req.user.id) {
    return next(errorHandler(400, "Message not found"));
  }

  try {
    const user = await getUserByUsername(req.user.id);
    const newMessage = new Message({
      text,
      username: user.username,
      userId: user.id,
      date: new Date()
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    next(error);
  }
};

export const deleteMessages = async (req, res, next) => {
  try {
    await Message.deleteMany({});
    await Message.deleteMany({ date: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } });
    res.send({ message: 'Messages deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    await Message.deleteMany({ date: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } });
    const messages = await Message.find({});
    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
};