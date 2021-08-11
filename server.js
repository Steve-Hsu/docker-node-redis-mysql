const express = require('express');
const routes = require('./routes/routes');
// const Redis = require('redis');


const app = express();
// Body parser;
app.use(express.json());
const PORT = process.env.PORT || 5000;
// const REDIS_PORT = process.env.REDIS_PORT || 6379;

// const redisClient = Redis.createClient(REDIS_PORT);
// redisClient.on('connect', () => {
//   console.log('connect to redis, at server.js');
// })

app.use('/api/test_docker', routes);
// app.get('/api/test_docker', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// });

app.listen(PORT, () => {
  console.log('server is listenning');
})