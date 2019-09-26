#!/usr/bin/python3

import pg8000

# Create tables
conn = pg8000.connect(database="degree_planner", port=5432, host="localhost", user="postgres", password="sroot")
cur = conn.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS schools (name text primary key, faculties text)")
cur.execute("CREATE TABLE IF NOT EXISTS faculties (name text primary key, programs text)")
cur.execute("CREATE TABLE IF NOT EXISTS programs (programid integer primary key, name text, major text, minor text)")
cur.execute("CREATE TABLE IF NOT EXISTS majors (majorid integer primary key, name text, courses text)")
cur.execute("CREATE TABLE IF NOT EXISTS minors (minorid integer primary key, name text, courses text)")
cur.execute("CREATE TABLE IF NOT EXISTS courses (code text primary key, name text, description text, offering text, faculty text, school text, study_level text, campus text, gened integer, outline text, uoc integer)")
conn.commit()
