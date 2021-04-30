const { createUser, getUserByUserId, getUsers ,updateUsers, deleteUser, login } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require ("../../auth/token_validation");

router.post("/register", createUser);
router.get("/", getUsers);
router.get("/:id", getUserByUserId);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);
router.post("/login", login)

module.exports = router;
