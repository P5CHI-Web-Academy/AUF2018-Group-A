import json
from urllib.request import urlopen

def get_data_from_file(file_path):
    with open(file_path) as file:
        json_data = json.load(file)
        return json_data
    
def get_data_from_url(url):
    data = urlopen(url)
    return json.loads(data.read())
