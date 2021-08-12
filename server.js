const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser')
// const Redis = require('redis');


const app = express();
// Body parser;
app.use(express.json());
const PORT = process.env.PORT || 3000;
// const REDIS_PORT = process.env.REDIS_PORT || 6379;

// const redisClient = Redis.createClient(REDIS_PORT);
// redisClient.on('connect', () => {
//   console.log('connect to redis, at server.js');
// })
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/test_docker', routes);

// Home pages
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.listen(PORT, () => {
  console.log('server is listenning');
})