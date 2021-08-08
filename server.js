const express = require('express');
const routes = require('./routes/routes')


const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/test_docker', routes);

app.listen(PORT, () => {
  console.log('server is listenning');
})