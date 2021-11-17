const express = require('express');
const { addContent, deleteContent, editContent, getContents } = require('../controllers/content_controllers');
const router = express.Router()

router.post("/add/:user_id", addContent)
router.delete("/delete/:content_id", deleteContent)
router.patch("/edit/:content_id", editContent)
router.get("/get/:user_id", getContents)

module.exports = router