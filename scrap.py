import itertools
import copy
import urllib.request
from bs4 import BeautifulSoup
import re

playerURLs = []
images = []
cards = {}
players = []

url = "http://www.futwiz.com/en/fifa16/players?page="
pages = 10

def downloadimg(imgname, imgURL):
    d = open(imgname, 'wb')
    red = urllib.request.Request(imgURL, headers={'User-Agent': 'Mozilla/5.0'})
    d.write(urllib.request.urlopen(red).read())
    d.close()

for x in range(0, pages):
    sURL = url + str(x)
    req = urllib.request.Request(sURL, headers={'User-Agent' : 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')

    soup = BeautifulSoup(str(html), "html.parser")
    tds = soup.find_all("td", {"class" : "text-left"})
    for td in tds:
        li = td.find('a', href=True)
        PlayerURL = li['href']
        playerURLs.append(PlayerURL)
        
f = open("fifa.txt","w",encoding="utf-8")        
for playerURL in playerURLs:
    #cards.clear()
    url = "http://www.futwiz.com" + playerURL
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')

    soup = BeautifulSoup(str(html),'html.parser')
    pattern = re.compile(u'\u2605')

    de = soup.find("div", {"class" : "headercopy"})
    cards['title'] = de.text
    de = soup.find("h2", {"class" : "subheadercopy"})
    ls = de.find_all("a")
    cards['club'] = ls[0].text
    cards['league'] = ls[1].text
    cards['nation'] = ls[2].text

    img = soup.find("div", {"class" : "card-16-face-inner"})
    imgURL = img.find('img')['src']
    imgURL = imgURL.replace("\\r\\n","")
    x = len(imgURL.split('/'))
    imgname = imgURL.split('/')[x-1]
    imgname = "face/" + imgname
    imgURL = "http://www.futwiz.com" + imgURL
    if not imgname in images:
        images.append(imgname)
        downloadimg(imgname, imgURL)

    cards['faceimg'] = imgname
    cards['cardname'] = soup.find("div", {'class' : 'card-16-name'}).text
    print(cards['cardname'])
    cards['rating'] = soup.find("div", {'class' : 'card-16-rating'}).text
    cards['position'] = soup.find("div", {'class' : 'card-16-position'}).text
    cards['chemstyle'] = soup.find("div", {'class' : 'card-16-chemstyletxt'}).text.replace('\\n','')
    img = soup.find('img', {'id' : 'card-16-chemstyleimg'})['src']
    x = len(img.split('/'))
    imgname = img.split('/')[x-1]
    imgname = "chem/" + imgname
    img = "http://www.futwiz.com" + img
    if not imgname in images:
        images.append(imgname)
        downloadimg(imgname, img)
        
    cards['chemimg'] = imgname
    cards['PAC'] = soup.find("div", {"class" : "card-16-attnum card-16-attnum1"}).text
    cards['DRI'] = soup.find("div", {"class" : "card-16-attnum card-16-attnum4"}).text
    cards['SHO'] = soup.find("div", {"class" : "card-16-attnum card-16-attnum2"}).text
    cards['DEF'] = soup.find("div", {"class" : "card-16-attnum card-16-attnum5"}).text
    cards['PAS'] = soup.find("div", {"class" : "card-16-attnum card-16-attnum3"}).text
    cards['PHY'] = soup.find("div", {"class" : "card-16-attnum card-16-attnum6"}).text
    img = soup.find("div", {"class" : "card-16-badge"})
    imgURL = img.find('img')['src']
    x = len(imgURL.split('/'))
    imgname = imgURL.split('/')[x-1]
    imgname = "badge/" + imgname
    imgURL = "http://www.futwiz.com" + imgURL
    if not imgname in images:
        images.append(imgname)
        downloadimg(imgname, imgURL)
        
    cards['badge'] = imgname
    img = soup.find("div", {"class" : "card-16-flag"})
    imgURL = img.find('img')['src']
    x = len(imgURL.split('/'))
    imgname = imgURL.split('/')[x-1]
    imgname = "flag/" + imgname
    imgURL = "http://www.futwiz.com" + imgURL
    if not imgname in images:
        images.append(imgname)
        downloadimg(imgname, imgURL)
    cards['flag'] = imgname
    rs = soup.find("table", {"class" : "table table-striped mt-20 player-table"})
    tds = rs.find_all("td")
    cards['release'] = tds[1].text
    backdiv = soup.find('div', {'class' : 'card-16'})
    backclass= backdiv['class'][1]
    backclass = backclass.replace("card-16-","")
    cards['backclass'] = backclass
    f.write(str(cards) + '\n')
    #players.append(cards)
f.close()
    
#f = open("fifa.txt","w")
#for player in players:
#    f.write(str(player) + '\n')

