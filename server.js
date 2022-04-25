const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localHost',
  user: 'root',
  password: 'password',
  database: 'orgHub_db',
},
console.log('connected to orgHub_db')
)

const addDepartment = () => {
  inquirer.prompt([
    {
      name: `departmentName`,
      message: `Name of new department?`,
      type: `input`,
    }])
    .then(newDepartment => {
      db.query("INSERT INTO departments SET ?", newDepartment, err => {
        if (err) {
          console.log(err)
        }
        console.log("department added")
      })
    })
}