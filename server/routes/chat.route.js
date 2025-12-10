const express = require("express");
const router = express.Router();
const {
  createOrGetConversation,
  getUserConversations,
  getMessages,
  sendMessage,
} = require("../controller/chat.controller");

router.post("/conversation", createOrGetConversation);
router.get("/conversations/:userId", getUserConversations);
router.get("/messages/:conversationId", getMessages);
router.post("/message", sendMessage);

module.exports = router;
