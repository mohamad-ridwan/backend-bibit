const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/category')

router.post('/post', useControllers.post)
router.post('/post/data/:_id', useControllers.postData)
router.put('/put/data/:_id/:id', useControllers.putData)
router.get('/get', useControllers.getAll)

module.exports = router