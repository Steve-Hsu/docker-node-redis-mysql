const express = require('express');
const router = express.Router();
const { getData, createDate } = require('../controllers/controllers')

// Mount controller
router.route('/').get(getData).post(createDate);


module.exports = router;