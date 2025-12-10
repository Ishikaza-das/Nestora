const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

const createOrGetConversation = async (req, res) => {
  try {
    const { userId, ownerId } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [userId, ownerId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, ownerId],
      });
    }

    return res.json({ success: true, conversation });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await Conversation.find({
      participants: userId,
    })
      .where("participants")
      .size(2) 
      .populate("participants", "name email profilePic");

    return res.json({ success: true, conversations });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversationId }).sort({
      createdAt: 1,
    });

    return res.json({ success: true, messages });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { conversationId, sender, text } = req.body;

    const message = await Message.create({
      conversationId,
      sender,
      text,
    });

    return res.json({ success: true, message });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createOrGetConversation, getUserConversations, getMessages, sendMessage};
