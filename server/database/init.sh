#!/bin/sh

#This script initialises the postgresql database and populates the the database with small amounts of data

#Make sure that psql is exported to PATH
#on mac it is found at "/Applications/Postgres.app/Contents/Versions/latest/bin" (kevin)
#ALSO the postgres server needs to be running. You can run is by openning the GUI that comes installed with postgres or
#postgres -D <postgres data directory> 2>&1 &
#where <postgres data directory> is where the db are stored
#ie on mac by default it is "/Users/Kevin/Library/Application Support/Postgres/var-12" (kevin)

psql -h localhost -p 5432 -U postgres << EOF 
DROP DATABASE IF EXISTS degree_planner;
CREATE DATABASE degree_planner; 
\c degree_planner;
CREATE TABLE course (
    id SERIAL NOT NULL PRIMARY KEY,
    code VARCHAR(8) NOT NULL,
    name TEXT NOT NULL,
    decription TEXT,
    prerequisites TEXT,
    corequisites TEXT,
    exclusions TEXT,
    gened BOOL NOT NULL,
    outline TEXT,
    uoc INT NOT NULL);
CREATE TABLE relationship (
    id SERIAL NOT NULL PRIMARY KEY,
    source VARCHAR(8) NOT NULL,
    destination VARCHAR(8) NOT NULL,
    type TEXT NOT NULL);

INSERT INTO course( code, name, gened, uoc ) VALUES
( 'COMP1000', 'Introduction to World Wid Web, Spreadsheets and Databases', TRUE, 6 ),
( 'COMP1400', 'Programming for Designers', TRUE, 6 ),
( 'COMP1511', 'Introduction to Programming', TRUE, 6 ),
( 'COMP1521', 'Computer Systems Fundamentals', TRUE, 6 ),
( 'COMP1531', 'Software Engineering Fundamentals', TRUE, 6 ),
( 'COMP1911', 'Computing 1A', TRUE, 6 ),
( 'COMP1927', 'Computing 2', TRUE, 6 ),
( 'COMP2041', 'Software Construction: Techniques and Tools', TRUE, 6 ),
( 'COMP2111', 'System Modelling and Design', TRUE, 6 ),
( 'COMP2121', 'Microprocessors and Interfacing', TRUE, 6 ),
( 'COMP2511', 'Object-Oriented Design & Programming', TRUE, 6 ),
( 'COMP2521', 'Data Structures and Algorithms', TRUE, 6 ),
( 'COMP2911', 'Engineering Design in Computing', TRUE, 6 );

INSERT INTO relationship( source, destination, type ) VALUES
( 'COMP1511', 'COMP1911', 'exclusions' ),
( 'COMP1521', 'COMP1511', 'prerequisites' ),
( 'COMP1531', 'COMP1511', 'prerequisites' ),
( 'COMP1911', 'COMP1511', 'exclusions' ),
( 'COMP1927', 'COMP1511', 'prerequisites' ),
( 'COMP1927', 'COMP2521', 'exclusions' ),
( 'COMP2041', 'COMP1511', 'prerequisites' ),
( 'COMP2111', 'COMP1511', 'prerequisites' ),
( 'COMP2121', 'COMP1511', 'prerequisites' ),
( 'COMP2112', 'COMP1521', 'prerequisites' ),
( 'COMP2511', 'COMP1531', 'prerequisites' ),
( 'COMP2511', 'COMP2521', 'prerequisites' ),
( 'COMP2511', 'COMP1927', 'prerequisites' ),
( 'COMP2521', 'COMP1511', 'prerequisites' ),
( 'COMP2521', 'COMP1927', 'exclusions' ),
( 'COMP2911', 'COMP1927', 'prerequisites' ),
( 'COMP2911', 'COMP2521', 'prerequisites' );

EOF

# Setup environment variables 
export PGHOST=localhost 
export PGPORT=5432
export PGDATABASE="degree_planner"
export PGUSER="postgres"
export PGPASSWORD="sroot"

