const express = require('express');
const routes = require('./routes/routes')


const app = express();
// Body parser;
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use('/api/test_docker', routes);

app.listen(PORT, () => {
  console.log('server is listenning');
})