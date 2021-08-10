const express = require('express');
const router = express.Router();
const { getData, createDate } = require('../controllers/controllers')

// Mount controller
router.route('/').post(createDate);
router.route('/:id').get(getData);
// router.route('/:id').get(getData);
// router.get('/', (req, res) => {
//   res.sendFile(__dirname.slice(0, -6) + 'index.html');
// });


module.exports = router;