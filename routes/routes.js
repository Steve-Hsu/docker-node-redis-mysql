const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('get is triggered');
})

router.post('/', (req, res) => {
  console.log('post is triggered');
})

module.exports = router;