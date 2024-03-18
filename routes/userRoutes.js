const express = require("express");
const router = express.Router(); 
const { getAllUsers  ,getUserById, createUsers, deleteUser, updateUser } = require("../controllers/userControllers"); 

router.post("/add", createUsers);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.delete("/:userId",deleteUser);
router.put(":userId",updateUser);


module.exports = router;



