import json
from urllib.request import urlopen

def get_data_from_file(file_path):
    with open(file_path) as file:
        json_data =  json.load(file)
        return json_data
    
def get_data_from_url(url):
    data = urlopen(url)
    return json.loads(data.read())

class Carriage: 
    distance: float
    price: float
    time: float

    def __init__ (self, data):
        if data != None:
            self.distance = data["distance"]
            self.price = data["price"]
            self.time = data["time"]

class Path:
    start: str
    end: str
    auto: Carriage
    train: Carriage
    plane: Carriage

    def __init__ (self, json_data):
        assert [json_data["from"], json_data["to"]], 'Wrong path format'
        self.start = json_data["from"]
        self.end = json_data["to"]
        self.auto = Carriage(json_data["auto"])
        self.train = Carriage(json_data["train"])
        self.plane = Carriage(json_data["plane"])

