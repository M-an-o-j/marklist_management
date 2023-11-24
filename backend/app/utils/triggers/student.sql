CREATE OR REPLACE FUNCTION on_student_active_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the 'is_active' column is changing to true
    IF NEW.is_active = true AND OLD.is_active = false THEN
        -- Insert a new record into the 'student_signin_logs' table
        INSERT INTO student_signin_logs (student_id, loggedin)
        VALUES (NEW.student_id, NOW());
    -- Check if the 'is_active' column is changing to false
    ELSIF NEW.is_active = false AND OLD.is_active = true THEN
        -- Update the 'logged_out' column in the most recent record for the same student
        UPDATE student_signin_logs
        SET loggedout = NOW()
        FROM (
            SELECT student_id
            FROM student_signin_logs
            WHERE student_id = NEW.student_id
              AND loggedout IS NULL
            ORDER BY loggedin DESC
            LIMIT 1
        ) AS latest_log
        WHERE student_signin_logs.student_id = latest_log.student_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER student_active_change_trigger
AFTER UPDATE ON student
FOR EACH ROW
EXECUTE FUNCTION on_student_active_change();
