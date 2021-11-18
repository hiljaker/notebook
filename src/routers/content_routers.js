const express = require('express');
const { addContent, deleteContent, editContent, getContents, moveToTrash, restoreContent, getTrash } = require('../controllers/content_controllers');
const router = express.Router()

router.post("/add/:user_id", addContent)
router.get("/movetotrash/:content_id", moveToTrash)
router.get("/restore/:content_id", restoreContent)
router.get("/delete/:content_id", deleteContent)
router.patch("/edit/:content_id", editContent)
router.get("/get/:user_id", getContents)
router.get("/trash/:user_id", getTrash)

module.exports = router