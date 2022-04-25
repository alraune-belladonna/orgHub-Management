const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localHost',
  user: 'root',
  password: 'password',
  database: 'orgHub_db',
},
console.log('connected to orgHub_db')
)

const showDepartments = () => {
  db.query('Select * FROM departments', (err, departments) => {
    if (err) {
      console.log(err)
    }
    console.table(departments)
  })

}

const showRoles = () => {
  db.query('Select * FROM roles', (err, roles) => {
    if (err) {
      console.log(err)
    }
    console.table(roles)
  })

}

const showEmployees = () => {
  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) {
      console.log(err)
    }
    console.table(employees)
  })

}

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
    db.query('INSERT INTO roles SET ?', role, err => {
      if (err) {
        console.log(err)
      }
      console.log(`new role added`);
    });
  });
};

const addEmployee = () => {
  inquirer.prompt([
    {
      name: `first_name`,
      message: `First name of new employee?`,
      type: `input`,
    },
    {
      name: `last_name`,
      message: `Last name of new employee?`,
      type: `input`,
    },
    {
      name: `role_id`,
      message: `Role ID of new employee?`,
      type: `input`,
    },
    {
      message: `Is new employee a manager?`,
      type: `list`,
      options: [`yes`, `no`],
      name: `managerState`

    }
  ])
    .then(employee => {
      if (employee.managerState === 'yes') {
        delete employee.managerState
        db.query('INSERT INTO employees SET ?', employee, err => {
          if (err) {
            console.log(err)
          }
        })
        console.log('new employee added');

      } else if (employee.managerState === 'no') {
        inquirer.prompt([
          {
            message: 'What is the id of the manager of the employee?',
            name: 'manager_id',
            type: 'input'
          }
        ])
          .then(junior => {
            delete employee.managerState

            let newEmployee = {
              ...employee,
              ...junior
            }
            db.query('INSERT INTO employees SET ?', newEmployee, err => {
              if (err) {
                console.log(err)
              }
            })
            console.log('new employee added');

          })
      }

    })
}

const updateRole = () => {
  inquirer.prompt([{
    message: 'ID of employee to update?',
    type: 'input',
    name: 'id'
  },
  {
    message: 'ID of the new role?',
    type: 'input',
    name: 'role_id'
  }])
    .then(employee => {
      let newRole = {
        role_id: employee.role_id
      }
      db.query(`UPDATE employees SET ? WHERE id = ${employee.id}`, newRole, err => {
        if (err) {
          console.log(err)
        }
      })
      console.log('employee role updated.');
    })
}

const menu = () => {
  inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'options',
      options: [
        'View all departments',
        'View all roles',
        'View all Employees',
        'Add Employee',
        'Add Department',
        'Add Role',
        'Update Role',
        'Quit',
      ]
    }
  ])
    .then((response) => {
      const { options } = response;

      if (options === 'View departments') {
        showDepartments();
      }

      if (options === 'View roles') {
        showRoles();
      }

      if (options === 'View Employees') {
        showEmployees();
      }

      if (options === 'Add Department') {
        addDepartment();
      }

      if (options === 'Add Role') {
        addRole();
      }

      if (options === 'Add Employee') {
        addEmployee();
      }

      if (options === 'Update Role') {
        updateRole();
      }

      if (options === 'Quit') {
        console.log('Good bye')
      };
    });
};

menu();