#!/usr/bin/python3

import re
import requests
import urllib.request
import time
from bs4 import BeautifulSoup

# Started by Jeremy Lim on 20/07/2019

# TO-DO LIST
# - Get timetable done
# - Get GenEd done
# - Majors
# - Degrees
# - Add to database

# Stripped down alphabet
course_alphabet = ['A','B','C','D','E','F','G','H','I','L','M','N','O','P','R','S','T','V','Y','Z']
spec_alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','R','S','T','V','W']
course_url = 'http://legacy.handbook.unsw.edu.au/vbook2018/brCoursesByAtoZ.jsp?StudyLevel=Undergraduate&descr='
spec_url = 'http://legacy.handbook.unsw.edu.au/vbook2018/brSpecialisationsByAtoZ.jsp?StudyLevel=Undergraduate&descr='

##### COURSES #####

# To print the info of each course
def print_course(code, link, name, cred):
    print("CODE: " + code) # prints the code of the course
    print("LINK: " + link) # prints the link of the course
    print("NAME: " + name) # prints the name of the course
    print("CREDITS: " + cred) # prints the credits of the course

# To go through each letter's links for courses
def run_course():

    # for letter in course_alphabet:
    for letter in course_alphabet[0:2]:
        # runs the url for the letter search
        response = requests.get(course_url + letter)
        course_soup = BeautifulSoup(response.text, "html.parser")

        for i in range(1,len(tr)):
            counter = 0
            td = tr[i].find_all('td')
            code = td[0].text
            link = td[1].find_all('a')[0]['href']
            name = td[1].find_all('a')[0].text
            cred = td[2].text

            print_course(code, link, name, cred)

            # Go to course link and scrape the data
            link_url = requests.get(link)
            link_soup = BeautifulSoup(link_url.text, "html.parser")

            p_data = link_soup.find_all('p')
            h_data = link_soup.find_all('h2')
            for p_instance in p_data:
                search = p_instance.findChildren()
                if (len(search) > 0 and len(search[0].contents) > 0):
                    if (search[0].text == 'Faculty:'):
                        if (len(search) > 1):
                            print("FACULTY: " + search[1].text)
                        else:
                            print("FACULTY: " + p_instance.contents[1].strip())

                    if (search[0].text == 'School:'):
                        if (len(search) > 1):
                            print("SCHOOL: " + search[1].text)
                        else:
                            print("SCHOOL: " + p_instance.contents[1].strip())

                    if (search[0].text == 'Career:'):
                        if (len(search) > 1):
                            print("CAREER: " + search[1].text)
                        else:
                            print("CAREER: " + p_instance.contents[1].strip())

                    # GenEd not working yet

                    if (search[0].text == "Available for General Education:"):
                        if (len(search) > 1):
                            counter += 1
                        break

            for h_instance in h_data:
                if (h_instance.text == "Description"):
                    desc_tags = str(h_instance.find_next_siblings()[0])
                    desc = str(re.sub("<.*?>", "", desc_tags))
                    print("DESCRIPTION: " + desc)

            # checks for General Education existence in course link
            if (counter == 0):
                print("GENED: False\n")
            else:
                print("GENED: True\n")

##### SPECIALISATIONS (WIP) #####

def run_spec():
    for letter in spec_alphabet[0:2]:
        response = requests.get(spec_url + letter)
        spec_soup = BeautifulSoup(response.text, "html.parser")

        spec_tr = spec_soup.find_all('tr') # this finds the first instance
        for i in range(1,3):
            counter = 0
            spec_td = spec_tr[i].find_all('td') # this finds each of the td in tr
            spec_name = spec_td[0].text
            spec_link = spec_td[0].find_all('a')[0]['href']
            print(spec_name)
            print(spec_link)
            print("")

if __name__ == "__main__":
    run_course()
