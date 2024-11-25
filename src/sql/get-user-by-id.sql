/* @name GetUserById */
SELECT id, name, email, role
FROM usersSSO
WHERE id = :id;