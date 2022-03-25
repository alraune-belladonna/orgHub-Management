SELECT departments.name AS department,
departments.id
FROM departments
LEFT JOIN roles
ON departments.id = department.id
ORDER BY department_id;

SELECT roles.title
FROM roles
LEFT JOIN employees
ON roles.id = employees.role_id
ORDER BY employees.last_name;