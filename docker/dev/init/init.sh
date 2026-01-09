#!/bin/bash
set -e

# Create the test database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE test_db;
EOSQL
