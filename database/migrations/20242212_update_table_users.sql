ALTER TABLE users 
ADD COLUMN avatar_url VARCHAR(255);

------ ############------
ALTER TABLE users 
ALTER COLUMN username DROP NOT NULL;