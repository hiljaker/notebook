const express = require('express');
const { activateUser, deactivateUser, getUsers } = require('../controllers/admin_controllers');
const router = express.Router()

router.get("/activate/:user_id", activateUser)
router.get("/deactivate/:user_id", deactivateUser)
router.get("/get", getUsers)

module.exports = router