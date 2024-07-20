const Router = require("express").Router;
const router = new Router();
const UserController = require("../controllers/user-controller");
const ChatController = require("../controllers/chat-controller");
const MessageController = require("../controllers/message-controller");
const AuthMiddleware = require("../middlewares/authMiddleware");

router.post("/reg", UserController.createUser);
router.post("/login", UserController.login);
router.post("/create-chat", AuthMiddleware, ChatController.createChat);
router.post("/create-message", AuthMiddleware, MessageController.createMessage);
router.post("/show-dialogue", AuthMiddleware, MessageController.showMessages);
router.post("/refresh", UserController.refresh);
router.get("/allUsers", AuthMiddleware, UserController.getAllUsers);

module.exports = router;
