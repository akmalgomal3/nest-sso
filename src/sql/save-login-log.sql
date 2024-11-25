/* @name SaveLoginLogUser */
INSERT INTO login_logsSSO (user_id, ip_address, latitude, longitude)
VALUES (:userId, :ipAddress, :latitude, :longitude)
RETURNING *;
