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
      name: `name`,
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

const addRole = () => {
  inquirer.prompt([
    {
      name: `title`,
      message: `Name of new role?`,
      type: `input`,
    },
    {
      name: 'salary',
      message: `Salary of new role?`,
      type: `input`,
    },
    {
      name: 'department_id',
      message: `ID of new role?`,
      type: `input`,
    }
  ])
  .then(role => {
    db.query("INSERT INTO roles SET ?", role, err => {
      if (err) {
        console.log(err)
      }
      console.log("New role added");
    });
  });
};