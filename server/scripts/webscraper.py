import re
import requests
import urllib.request
import time
# from test_data import *
from bs4 import BeautifulSoup

# Started by Jeremy Lim on 20/07/2019

# COURSES

# To print the info of each course
def printInfo(code, link, name, cred):
    print("CODE: " + code) # prints the code of the course
    print("LINK: " + link) # prints the link of the course
    print("NAME: " + name) # prints the name of the course
    print("CREDITS: " + cred) # prints the credits of the course

# To go through each letter's links for courses
alphabet = ['A','B','C','D','E','F','G','H','I','L','M','N','O','P','R','S','T','V','Y','Z']

for letter in alphabet[0:5]:
    url = 'http://legacy.handbook.unsw.edu.au/vbook2018/brCoursesByAtoZ.jsp?StudyLevel=Undergraduate&descr=' + letter
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    # soup = BeautifulSoup(p_instance_url, "html.parser")

    tr = soup.find_all('tr') # this finds the first instance

    for i in range(1,4):
        td = tr[i].find_all('td') # this finds each of the td in tr
        # print(td)
        code = td[0].contents[0]
        link = td[1].find_all('a')[0]['href'] # searches for the link
        name = td[1].find_all('a')[0].contents[0] # searches for the a tags
        cred = td[2].contents[0] # gets the credits

        # DEBUGGING FOR MAIN INFO
        printInfo(code, link, name, cred)

        # DEBUGGING FOR LINK INFO
        linkyboi = requests.get(link)
        linkysoup = BeautifulSoup(linkyboi.text, "html.parser")

        p_data = linkysoup.find_all('p')
        for p_instance in p_data:
            search = p_instance.findChildren()
            if (search[0].contents[0] == 'Faculty:'):
                if (len(search) > 1):
                    print("FACULTY: " + search[1].contents[0])
                else:
                    print("FACULTY: " + p_instance.contents[1].strip())

            if (search[0].contents[0] == 'School:'):
                if (len(search) > 1):
                    print("SCHOOL: " + search[1].contents[0])
                else:
                    print("SCHOOL: " + p_instance.contents[1].strip())

            # doesn't work yet
            if (search[0].contents[0] == 'Career:'):
                if (len(search) > 1):
                    print("CAREER: " + search[1].contents[0])
                else:
                    print("CAREER: " + p_instance.contents[1].strip())
                print("")
                break

            # doesn't work yet

            # print(search)
            # prereq = p_instance.find(text=re.compile('Prerequisite: '))
            # if (prereq):
            #     # print(faculty)
            #     # print(school)
            #     # print(career)
            #     # the above ones doesn't work yet
            #     print(prereq)
            #     print("")
            #     break

# test stuff
# for i in range(0,len(soup.find_all('tr'))): # 'a' tags are for links
#     print("entering loop")
#     one_a_tag = soup.find_all('tr')[i] # is an array and iterates through each object
#     print(one_a_tag['href']) # prints the href link
#     print(one_a_tag.contents[0]) # prints the body content
