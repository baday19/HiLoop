const sqlite = require('sqlite3')
const path = require('path')

const db = new sqlite.Database(path.join(__dirname, '../sqlite3.db'))

const initDb = () => {
  const createEssaySql = `
    CREATE TABLE essay (
      id INTEGER PRIMARY KEY,
      content VARCHAR (10485760) NOT NULL,
      time VARCHAR (30) NOT NULL,
      status INTEGER NOT NULL
    )
  `
  const createTodoSql = `
    CREATE TABLE todo (
      id INTEGER PRIMARY KEY,
      content VARCHAR (1024) NOT NULL,
      end_time VARCHAR (30) NOT NULL,
      notice_time VARCHAR (30) NOT NULL,
      remark VARCHAR (128),
      tag VARCHAR (30) NOT NULL,
      status INTEGER NOT NULL
    )
  `
  db.run(createEssaySql, (err) => {
    if (err) {
      console.log(err)
    }
    console.log('essay table')
  })
  db.run(createTodoSql, (err) => {
    if (err) {
      console.log(err)
    }
    console.log('todo table')
  })
}

const getAllEssay = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM essay ORDER BY time DESC LIMIT 20", (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const addEssay = (content, time) => {
  // const add = db.prepare('insert into essay (content, time, status) values (?,?,?)')
  // console.log(add.run(content, time, 0))
  const idSql = 'select last_insert_rowid() from essay limit 1'
  const addSql = `insert into essay (content, time, status) values ('${content}','${time}',${0})`
  return new Promise((resolve, reject) => {
    db.run(addSql, (err) => {
      if (err) {
        reject(err)
      }
      db.all(idSql, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  })
}

const changeEssayStatus = (id, status) => {
  const change = db.prepare('update essay set status=? where id=?')
  change.run(status, id)
  change.finalize()
}

const getAllTodo = (status) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM todo WHERE status=${status} ORDER BY end_time ASC LIMIT 100`, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const addTodo = (content, end_time) => {
  // const add = db.prepare('insert into essay (content, time, status) values (?,?,?)')
  // console.log(add.run(content, time, 0))
  const idSql = 'select last_insert_rowid() from todo limit 1'
  const addSql = `insert into todo (content, end_time, notice_time, remark, tag, status) values ('${content}','${end_time}',${end_time},'备注',0,0)`
  return new Promise((resolve, reject) => {
    db.run(addSql, (err) => {
      if (err) {
        reject(err)
      }
      db.all(idSql, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  })
}

const changeTodoStatus = (id, status) => {
  const change = db.prepare('update todo set status=? where id=?')
  change.run(status, id)
  change.finalize()
}
// status 0正在进行 1完成 2删除
// tag 0默认 。。。

const getBallData = () => {

  return new Promise((resolve, reject) => {
    db.all('SELECT end_time FROM todo WHERE status=0', (err, data) => {
      if (err) {
        reject(err)
      } else {
        const now = new Date().getTime()
        let count = 0
        data.forEach(item => {
          if (parseInt(now) < parseInt(item.end_time)) {
            count ++
          }
        })
        resolve([count, data.length - count])
      }
    })
  })
}

module.exports = {
  initDb,
  getAllEssay,
  addEssay,
  changeEssayStatus,
  getAllTodo,
  addTodo,
  changeTodoStatus,
  getBallData,
}