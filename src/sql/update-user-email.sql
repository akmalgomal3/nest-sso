/* @name UpdateUserEmail */
UPDATE usersSSO
SET email = :email
WHERE id = :id
    RETURNING id, name, email, role;
