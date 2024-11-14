CREATE DATABASE keycloak;

CREATE USER keycloak WITH PASSWORD 'admin';

GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;

\c keycloak

GRANT USAGE ON SCHEMA public TO keycloak;
GRANT CREATE ON SCHEMA public TO keycloak;

CREATE DATABASE devicemanagement;
CREATE USER devicemgtuser WITH PASSWORD 'devicemgt123';
GRANT ALL PRIVILEGES ON DATABASE devicemanagement TO devicemgtuser;

\c devicemanagement

GRANT USAGE ON SCHEMA public TO devicemgtuser;
GRANT CREATE ON SCHEMA public TO devicemgtuser;
