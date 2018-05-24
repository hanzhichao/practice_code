import urllib.request
import urllib.request

with open('jslist.txt') as f:
    urls = f.read().strip().replace("':","',").replace("'","").split(",")
# print(len(urls))
for url in urls:
    if 'http' in url:
        try:
            urllib.request.urlretrieve(url,url.split('/')[-1])
        except Exception as e:
            print(url, e)