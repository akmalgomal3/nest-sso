/* @name CreateUser */
INSERT INTO usersSSO (name, email, password, role)
VALUES (:name, :email, :password, :role)
    RETURNING id, name, email, role;