/* @name FindUserByEmail */
SELECT id, name, email, password, role
FROM usersSSO
WHERE email = :email;