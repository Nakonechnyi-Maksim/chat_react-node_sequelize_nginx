const Router = require("express").Router;
const router = new Router();
const UserController = require("../controllers/user-controller");
const ChatController = require("../controllers/chat-controller");
const MessageController = require("../controllers/message-controller");

router.post("/reg", UserController.createUser);
router.get("/allUsers", UserController.getAllUsers);
router.post("/login", UserController.login);
router.post("/create-chat", ChatController.createChat);
router.post("/create-message", MessageController.createMessage);

module.exports = router;
