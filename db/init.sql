

SELECT 'CREATE DATABASE clean_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'clean_db')\gexec