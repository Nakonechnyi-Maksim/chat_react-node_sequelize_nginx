const Router = require("express").Router;
const router = new Router();
const UserController = require("../controllers/user-controller");
const ChatController = require("../controllers/chat-controller");

router.post("/reg", UserController.createUser);
router.get("/allUsers", UserController.getAllUsers);
router.post("/login", UserController.login);
router.post("/create-chat", ChatController.createChat);

module.exports = router;
