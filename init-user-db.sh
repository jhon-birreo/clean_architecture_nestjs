#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER develop;
    SELECT 'CREATE DATABASE clean_db'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'clean_db');
    GRANT ALL PRIVILEGES ON DATABASE clean_db TO develop;
EOSQL