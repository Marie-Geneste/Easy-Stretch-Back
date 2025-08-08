
-- CREATE ROLE marie WITH LOGIN PASSWORD 'azerty';

-- CREATE DATABASE easystretch_db OWNER marie;
\c easystretch_db

-- Droits pour le rôle marie (déjà créé par Docker)
GRANT ALL PRIVILEGES ON DATABASE easystretch_db TO marie;

-- Par défaut, marie a besoin de droits sur les tables/sequences qu'on créera ensuite
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO marie;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO marie;