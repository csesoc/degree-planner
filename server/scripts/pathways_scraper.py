import requests
from bs4 import BeautifulSoup 

class course:
    def __init__(self, course_type, ):
        # Post, Under, Research
        self.type = course_type




# A bit roundabout, but we grab the handbook page from the timetable listing since its nice and static and not react...

base_url =  "http://timetable.unsw.edu.au/2021/"

# Similar to the 2018 handbook AtoZ listing
listing_by_category_url = base_url + "subjectSearch.html"

# Grab the top level listing of all the subjects 
top_level_listing = requests.get(listing_by_category_url) 
soup = BeautifulSoup(top_level_listing.text, "html.parser")


# Grab all the rows with links to the subject pages
rows = soup.find_all("tr", {"class": ["rowLowlight","rowHighlight"]})

# Grab links to the subject pages 
subject_links = [row.find("a").get("href") for row in rows]

# ['ACCTKENS.html', 'ACTLKENS.html', 'AEROKENS.html', 'ANATKENS.html', 'ARCHKENS.html', 'ARTSKENS.html', 'ASIAKENS.html', 'ATSIKENS.html', 'AUSTKENS.html', 'AVENKENS.html', 'AVIAKENS.html', 'AVIFKENS.html', 'AVIGKENS.html', 'BABSKENS.html', 'BEESKENS.html', 'BEILKENS.html', 'BENVKENS.html', 'BINFKENS.html', 'BIOCKENS.html', 'BIOMKENS.html', 'BIOSKENS.html', 'BIOTKENS.html', 'BLDGKENS.html', 'CDEVKENS.html', 'CEICKENS.html', 'CHEMKENS.html', 'CHENKENS.html', 'CLIMKENS.html', 'CODEKENS.html', 'COMDKENS.html', 'COMMKENS.html', 'COMPKENS.html', 'CONSKENS.html', 'CRIMKENS.html', 'CRTVKENS.html', 'CVENKENS.html', 'DATAKENS.html', 'DESNKENS.html', 'DPBSKENS.html', 'DPGEKENS.html', 'DPSTKENS.html', 'ECONKENS.html', 'EDSTKENS.html', 'ELECKENS.html', 'ENGGKENS.html', 'ENGLKENS.html', 'ENVSKENS.html', 'EXCHKENS.html', 'FINSKENS.html', 'FOODKENS.html', 'GENCKENS.html', 'GENEKENS.html', 'GENLKENS.html', 'GENMKENS.html', 'GENSKENS.html', 'GENYKENS.html', 'GEOLKENS.html', 'GEOSKENS.html', 'GMATKENS.html', 'GSBEKENS.html', 'GSOEKENS.html', 'HDATKENS.html', 'HESCKENS.html', 'HISTKENS.html', 'HUMLKENS.html', 'HUMSKENS.html', 'IDESKENS.html', 'IESTKENS.html', 'INFSKENS.html', 'INSTKENS.html', 'INTAKENS.html', 'INTDKENS.html', 'JURDKENS.html', 'LANDKENS.html', 'LAWSKENS.html', 'LINGKENS.html', 'MANFKENS.html', 'MARKKENS.html', 'MATHKENS.html', 'MATSKENS.html', 'MBAXKENS.html', 'MDCNKENS.html', 'MDIAKENS.html', 'MECHKENS.html', 'MEREKENS.html', 'MFACKENS.html', 'MFINKENS.html', 'MGMTKENS.html', 'MICRKENS.html', 'MINEKENS.html', 'MMANKENS.html', 'MNGTKENS.html', 'MODLKENS.html', 'MSCIKENS.html', 'MTRNKENS.html', 'MUSCKENS.html', 'NANOKENS.html', 'NCHRKENS.html', 'NEURKENS.html', 'OBSTKENS.html', 'OPTMKENS.html', 'PATHKENS.html', 'PHARKENS.html', 'PHCMKENS.html', 'PHILKENS.html', 'PHOPKENS.html', 'PHSLKENS.html', 'PHTNKENS.html', 'PHYSKENS.html', 'PLANKENS.html', 'PLTXKENS.html', 'POLSKENS.html', 'POLYKENS.html', 'PPECKENS.html', 'PSCYKENS.html', 'PSYCKENS.html', 'PTRLKENS.html', 'REGZKENS.html', 'RESTKENS.html', 'RISKKENS.html', 'SCIFKENS.html', 'SENGKENS.html', 'SLSPKENS.html', 'SOCAKENS.html', 'SOCFKENS.html', 'SOCWKENS.html', 'SOLAKENS.html', 'SOMSKENS.html', 'SOSSKENS.html', 'SPRCKENS.html', 'SRAPKENS.html', 'STAMKENS.html', 'SURGKENS.html', 'SUSDKENS.html', 'SWCHKENS.html', 'TABLKENS.html', 'TELEKENS.html', 'UDESKENS.html', 'VISNKENS.html', 'WOMSKENS.html', 'YENGKENS.html', 'YMEDKENS.html', 'ZZBUKENS.html', 'ZZENKENS.html', 'ZZSCKENS.html', 'ADADCOFA.html', 'DARTCOFA.html', 'DDESCOFA.html', 'SAHTCOFA.html', 'SARTCOFA.html', 'SDESCOFA.html', 'SOMACOFA.html', 'YCANADFA.html', 'ZBUSADFA.html', 'ZEITADFA.html', 'ZGENADFA.html', 'ZHSSADFA.html', 'ZINTADFA.html', 'ZPEMADFA.html', 'ZZCAADFA.html']

# Grab courses from each subject 
course_links = [] 
for subject in subject_links: 
    print(subject)
    subject_page = requests.get(base_url+subject)
    subject_soup = BeautifulSoup(subject_page.text)
    course_rows = subject_soup.find_all("tr", {"class": ["rowLowlight", "rowHighlight"]})
    course_links += [row.find("a").get("href") for row in course_rows]
    print(course_links)

# For each course, scrape the handbook listing
