/* @name GetUserByName */
SELECT id, name, email, role
FROM usersSSO
WHERE (name ILIKE '%' || :name || '%');