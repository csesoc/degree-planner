#!/usr/bin/python3

import re, requests, time
from bs4 import BeautifulSoup

handbook_base_url = "https://www.handbook.unsw.edu.au"

dvc_aca_bos_url = "https://www.handbook.unsw.edu.au/DvcacademicBoardOfStudies/browse?id=5fa56ceb4f0093004aa6eb4f0310c7b3"
fac_art_des_url = "https://www.handbook.unsw.edu.au/FacultyOfArtDesign/browse?id=57a56ceb4f0093004aa6eb4f0310c7af"
fac_art_socsci_url = "https://www.handbook.unsw.edu.au/FacultyOfArtsAndSocialSciences/browse?id=d7a56ceb4f0093004aa6eb4f0310c7ac"
fac_bui_env_url = "https://www.handbook.unsw.edu.au/FacultyOfBuiltEnvironment/browse?id=5fa56ceb4f0093004aa6eb4f0310c7ae"
fac_eng_url = "https://www.handbook.unsw.edu.au/FacultyOfEngineering/browse?id=5fa56ceb4f0093004aa6eb4f0310c7af"
fac_law_url = "https://www.handbook.unsw.edu.au/FacultyOfLaw/browse?id=57a56ceb4f0093004aa6eb4f0310c7b0"
fac_med_url = "https://www.handbook.unsw.edu.au/FacultyOfMedicine/browse?id=5fa56ceb4f0093004aa6eb4f0310c7b0"
fac_sci_url = "https://www.handbook.unsw.edu.au/FacultyOfScience/browse?id=57a56ceb4f0093004aa6eb4f0310c7ae"
bus_sch_url = "https://www.handbook.unsw.edu.au/UnswBusinessSchool/browse?id=5a3a1d4f4f4d97404aa6eb4f0310c77a"
can_adfa_url = "https://www.handbook.unsw.edu.au/UnswCanberraAtAdfa/browse?id=5fa56ceb4f0093004aa6eb4f0310c7ad"
glob_url = "https://www.handbook.unsw.edu.au/UnswGlobal/browse?id=a9321f614ffd57009106fd501310c7eb"

faculty_urls = [dvc_aca_bos_url, fac_art_des_url, fac_art_socsci_url, fac_bui_env_url, fac_eng_url, fac_law_url, fac_med_url, fac_sci_url, bus_sch_url, can_adfa_url, glob_url]

# Faculty scraping
## Given the soup for the faculty page, return the name of the faculty
def get_faculty_name(soup):
    return soup.find("h2", attrs={"class": "a-browse-heading"})

## Given the soup for the faculty page, return course tuple (link, name, course code, uoc) for courses on the page
## TODO
def get_faculty_courses(soup):
    pass

## Given the soup for the faculty page, returns program tuple (link, name, program code, uoc) for programs on the page
## TODO: Support double degrees
def get_faculty_programs(soup):
    l = soup.find_all("div", attrs={"class": "m-single-course-wrapper-browse"})
    return [(handbook_base_url + elem.a.attrs["href"].replace("\n", ""), elem.p.text, elem.find("span", attrs={"class": "align-left"}).text, elem.find("span", attrs={"class": None}).text) for elem in l]

# Program scraping

## Given the soup for the program page, return the program tuple (name, code, uoc, faculty, ##TODO figure out rest from page info...##)
def get_program_info(soup):
    pass

## Given the soup for the program page, return the major tuple (link, name, major code, uoc, courses/requirement dict) for majors on the page
## TODO
def get_program_majors(soup):
    pass

## Given the soup for the program page, return the minor tuple (link, name, major code, uoc, course/requirement dict) for minors on the page
## TODO
def get_program_minors(soup):
    pass

# Course scraping
## Given the soup for the course page, return the course tuple (name, code, uoc, overview, [equivalent course codes], [exclusion course codes], outline link, offering, study level, school, faculty)
## TODO
def get_course(soup):
    pass

# Scrape scope
## Scrape all of UNSW Handbook
def scrape_all():
    for faculty_url in faculty_urls:
        scrape_faculty(faculty_url)

## Scrape all programs in a faculty and the faculty data itself.
def scrape_faculty(faculty_url):
    page = requests.get(faculty_url)
    soup = BeautifulSoup(page.text, "html.parser")
    name = get_faculty_name(soup)
    raw_courses = get_faculty_courses(soup)
    courses = [scrape_course(i[0]) for i in raw_courses]
    raw_programs = get_faculty_programs(soup)
    programs = [scrape_program(i[0]) for i in raw_programs]

def scrape_program(program_url):
    page = requests.get(program_url)
    soup = BeautifulSoup(page.text, "html.parser")
    majors = get_program_majors(soup)
    minors = get_program_minors(soup)
    return (majors, minors)

def scrape_course(course_url):
    page = requests.get(course_url)
    soup = BeautifulSoup(page.text, "html.parser")
    return get_course(soup)

if __name__ == "__main__":
    scrape_faculty(fac_eng_url)
