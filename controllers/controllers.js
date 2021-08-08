const mysql = require('mysql');
const DATABASE = "test_db_1";
const TABLE = "test_table";

const db = mysql.createConnection({
  host: "localhost",
  user: "steve",
  password: "12345",
  database: DATABASE
});
db.connect();

const readData = (CLI) => {
  return new Promise((resolve, reject) => {
    db.query(CLI, (err, data) => {
      if (err) return reject(err);
      if (data) {
        return resolve(data);
      } else {
        return resolve('Empty');
      }
    })
  })
};

const addData = async (name, age) => {
  const inserData = (resolve) => {
    const sql = `insert into test_table(name, age) values("${name}", "${age}")`
    db.query(sql, (err, result) => {
      if (err) return reject(err);
      return resolve(JSON.stringify(result));
    })
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
  try {
    const result = await readData(`select * from ${TABLE}`);
    console.log('the result', result)
    console.log('the result', typeof result);
    console.log('test ', result[2].name)

    res.status(200).json({ success: true, data: `you get data : ${result}` });
  } catch (err) {
    res.status(400).json({ success: false, Error: `${err}` });
  }
}

//@desc   Create data
exports.createDate = async (req, res, next) => {
  try {
    let result = await addData(req.body.name, req.body.age);
    console.log('new data created', result)
    res.status(200).json({ success: true, data: `you create data : ${result}` });
  } catch (err) {
    res.status(400).json({ success: false, Error: `${err}` });
  }
}