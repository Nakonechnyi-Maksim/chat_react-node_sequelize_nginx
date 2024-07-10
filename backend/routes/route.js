const Router = require("express").Router;
const router = new Router();
const UserController = require("../controllers/user-controller");

router.post("/login", UserController.createUser);
router.get("/allUsers", UserController.getAllUsers);

module.exports = router;
