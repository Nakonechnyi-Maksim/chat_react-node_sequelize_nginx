const Router = require("express").Router;
const router = new Router();
const UserController = require("../controllers/user-controller");

router.post("/reg", UserController.createUser);
router.get("/allUsers", UserController.getAllUsers);
router.post("/login", UserController.login);

module.exports = router;
