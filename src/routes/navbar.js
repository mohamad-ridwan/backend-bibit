const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/navbar')

router.post('/post/logo-web', useControllers.postLogoWeb)
router.post('/post/menu-page', useControllers.postMenuPage)
router.post('/post/menu-page/menu-collapse/:_id', useControllers.postMenuCollapse)
router.put('/put/logo-web/:_id', useControllers.putLogoWeb)
router.get('/get', useControllers.getAll)

module.exports = router