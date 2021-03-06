const mysql = require('mysql');
// const Redis = require('redis');
const DATABASE = "test_db_1";
const TABLE = "test_table";

// const redisClient = Redis.createClient();

// redisClient.on('connect', () => {
//   console.log('connect to redis');
// })

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "steve",
  password: process.env.MYSQL_ROOT_PASSWORD || "12345",
  database: process.env.MYSQL_DATABASE || DATABASE,
  port: "3306",
});
db.connect();

const readData = (id) => {
  const CLI = `SELECT * FROM ${TABLE} WHERE id=${id}`;
  return new Promise((resolve, reject) => {
    // Get data from redis, if has one.
    // redisClient.get(id, async (err, redisData) => {
    //   console.log(`data in redis: ${redisData}, type of the data ${typeof redisData}`);
    //   if (err) return reject(err);
    //   if (redisData != null) return resolve(redisData);
    // })

    // Get data from MySQL;
    db.query(CLI, (err, data) => {
      if (err) return reject(err);
      if (data.length != 0) {
        const id = data[0].id
        const name = data[0].name
        const age = data[0].age
        // redisClient.setex(id, 60, `name: ${name}, age: ${age}`, async (err, data) => {
        //   console.log(`Redis data is updated the : ${data}`)
        // })
        const mySQLresult = `name: ${name}, age: ${age}`
        // Simulation fetching from remote database;s
        setTimeout(() => {
          return resolve(mySQLresult);
        }, 3000);
      } else {
        return resolve(null);
      }
    })
  })
};

const addData = async (name, age) => {
  const inserData = (resolve) => {
    // redisClient.set(name, age);
    const sql = `insert into test_table(name, age) values("${name}", "${age}")`
    db.query(sql, (err, result) => {
      console.log('the create result', result.insertId)
      if (err) return reject(err);
      return resolve(result.insertId);
    });
  }

  return new Promise((resolve, reject) => {
    db.query('select database()', (err, currentDatabase) => {
      if (err) return reject(err);
      if (currentDatabase[0]["database()"] === DATABASE) {
        db.query(`show tables like "${TABLE}"`, (err, tables) => {
          if (err) return reject(err);
          if (!tables.length) {
            const createUserSQL = `create table test_table (
              id INT AUTO_INCREMENT,
              name VARCHAR(25),
              age VARCHAR(25),
              PRIMARY KEY(id)
            )`
            db.query(createUserSQL, (err, result) => {
              if (err) return reject(err);
              inserData(resolve);
            })
          } else {
            inserData(resolve);
          }
        })
      } else {
        return resolve(`No database ${DATABASE} at MySQL, create the database first`);
      }
    })
  })
};

//@desc   Get data
exports.getData = async (req, res, next) => {
  const id = req.params.id ? req.params.id : null;

  try {
    const data = await readData(id);
    const result = data ? data :
      `No data matched with id : ${id}`;

    res.status(200).json({ success: true, data: `${result}` });
  } catch (err) {
    res.status(400).json({ success: false, Error: `${err}` });
  }
}

exports.getDataById = async (req, res, next) => {
  try {
    console.log('the body', req.body)
    console.log('the index', req.body.index)
    const id = req.body.index || 0
    const data = await readData(id);
    const result = data ? data :
      `No data matched with id : ${id}`;

    res.status(200).json({ success: true, data: `${result}` });
  } catch (err) {
    res.status(400).json({ success: false, Error: `${err}` });
  }
}

//@desc   Create data
exports.createDate = async (req, res, next) => {
  try {
    console.log('the router age', req.body.age);
    console.log('the body', req.body)
    let result = await addData(req.body.name, req.body.age);
    console.log('new data created', result)
    res.status(200).json({ success: true, data: `Data created, Your Id is : ${result}` });
  } catch (err) {
    res.status(400).json({ success: false, Error: `${err}` });
  }
}