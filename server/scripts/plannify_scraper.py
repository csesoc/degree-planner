#!/usr/bin/python3

import re, requests, time
from bs4 import BeautifulSoup

handbook_base_url = "https://www.handbook.unsw.edu.au/"

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

# Faculty scraping

def get_faculty_name(soup):
    return soup.find("h2", attrs={"class": "a-browse-heading"})

def get_schools_from_faculty(soup):
    l = soup.find_all("div", attrs={"class": "m-single-course-wrapper-browse"})
    return [(elem.a.attrs["href"].replace("\n", ""), elem.p.text) for elem in l]

# Program scraping


# Course scraping

if __name__ == "__main__":
    page = requests.get(fac_eng_url)
    soup = BeautifulSoup(page.text, "html.parser")
    get_schools_from_faculty(soup)
