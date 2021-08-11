const express = require('express');
const router = express.Router();
const { getData, createDate, getDataById } = require('../controllers/controllers')

// Mount controller
router.route('/').post(createDate);
router.route('/getbyid').post(getDataById);
router.route('/:id').get(getData);
// router.route('/:id').get(getData);


module.exports = router;