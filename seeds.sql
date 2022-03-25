INSERT INTO departments (name)
VALUES ("Financials"),
  ("Human Resources"),
  ("Sales"),
  ("Management");

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 10000, 1),
  ("Labor Relations Associate", 6000, 2),
  ("Sales Associate", 2000, 3),
  ("Shift Lead", 3000, 3),
  ("Manager", 25000, 4),
  ("Regional Manager", 50000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ava", "Riz", 1),
  ("Levi", "Thanh", 2),
  ("Minh", "Yun Jr", 3, ),
  ("Minh", "Yun Sr", 4),
  ("Belle", "Pheggor", 5)
  ("Lucy", "Fir", 6);