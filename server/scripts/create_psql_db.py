#!/usr/bin/python3

import pg8000, sys, os
from dotenv import load_dotenv
from pathlib import Path

# Load .env file
env_path = Path('..') / '.env'
load_dotenv(dotenv_path=env_path)

# Database Configuration
DEGREE_PLANNER_DATABASE_NAME = "degree_planner"
PGPORT = int(os.getenv('PGPORT'))
PGHOST = os.getenv('PGHOST')
PGUSER = os.getenv('PGUSER')
PGPASSWORD = os.getenv('PGPASSWORD')

# SENG Sample Data
faculty = "Faculty of Engineering"
#school = "School of Computer Science and Engineering"
program = "Bachelor of Engineering (Honours)"
major = "Software Engineering"
courses = [
  "COMP1511","COMP1521","COMP1531","ENGG1000",
  "MATH1081","MATH1131|MATH1141","MATH1231|MATH1241","COMP2041",
  "COMP2111","COMP2511","COMP2521","MATH2400",
  "MATH2859","SENG2011","SENG2021","COMP3141",
  "COMP3311","COMP3331","SENG3011","SENG4920",
  "COMP4951","COMP4952","COMP4953",
  "FREE","COMP3+","COMP3+",
  "COMP3+","COMP3+","COMP3+",
  "COMP3+","COMP4+","COMP4+"
]

# Create Database
conn = pg8000.connect(port=int(PGPORT), host=PGHOST, user=PGUSER, password=PGPASSWORD)
cur = conn.cursor()
conn.autocommit = True
cur.execute("DROP DATABASE IF EXISTS " + DEGREE_PLANNER_DATABASE_NAME);
cur.execute("CREATE DATABASE " + DEGREE_PLANNER_DATABASE_NAME)
conn.autocommit = False
cur.close()

# Create tables
conn = pg8000.connect(database=DEGREE_PLANNER_DATABASE_NAME, port=int(PGPORT), host=PGHOST, user=PGUSER, password=PGPASSWORD)
cur = conn.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS faculties (name text primary key, programs text)")
cur.execute("CREATE TABLE IF NOT EXISTS programs (programid integer primary key, name text, link text, majors text, minors text)")
cur.execute("CREATE TABLE IF NOT EXISTS majors (majorid text primary key, name text, courses text)")
cur.execute("CREATE TABLE IF NOT EXISTS minors (minorid text primary key, name text, courses text)")
cur.execute("CREATE TABLE IF NOT EXISTS courses (code text, name text, description text, offering text, faculty text, school text, study_level text, gened integer, outline text, uoc integer)")
conn.commit()


# Insert Dummy Data for Bachelor of Software Engineering
# Faculty
query, args = pg8000.core.convert_paramstyle("qmark", "INSERT INTO faculties (name, programs) VALUES (?, ?) ON CONFLICT DO NOTHING")
cur.execute(query, args((faculty, school)))
# Program
query, args = pg8000.core.convert_paramstyle("qmark", "INSERT INTO programs (programid, name, link, major, minor) VALUES (?, ?, ?, ?, ?) ON CONFLICT DO NOTHING")
cur.execute(query, args((3707, "Bachelor of Engineering (Honours)", "Software Engineering", "")))
# Major
query, args = pg8000.core.convert_paramstyle("qmark", "INSERT INTO majors (majorid, name, courses) VALUES (?, ?, ?) ON CONFLICT DO NOTHING")
cur.execute(query, args(("SENGAH", "Software Engineering", ", ".join(courses)))) 
# Courses
query, args = pg8000.core.convert_paramstyle("qmark", "INSERT INTO courses (code, name, description, offering, faculty, school, study_level, gened, outline, uoc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
for i, course in enumerate(courses):
    cur.execute(query, args((course, "course full name here", "course desc here", "T" + str(i % 3 + 1), faculty, school, "UG", "1" if course == "FREE" else "0", "http://handbook.unsw.edu.au/", 6)))

conn.commit()
