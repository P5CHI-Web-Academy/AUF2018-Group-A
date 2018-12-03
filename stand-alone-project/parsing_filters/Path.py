from JsonParser import *
from Carriage import *

class CarriageType(Enum): 
    auto = 1
    train = 2
    plane = 3

class Path:
    start: str
    end: str
    auto: Carriage = None
    train: Carriage = None
    plane: Carriage = None

    def __init__ (self, json_data):
        assert [json_data["from"], json_data["to"]], 'Wrong path format'
        self.start = json_data["from"]
        self.end = json_data["to"]
        if json_data["auto"]:
            self.auto = Carriage(json_data["auto"])
        if json_data["train"]:
            self.train = Carriage(json_data["train"])
        if json_data["plane"]:
            self.plane = Carriage(json_data["plane"])

    def get_cost_filtered_by(self, carriange_type, cost_param):
        if carriange_type == CarriageType.auto:
            if self.auto != None:
                return self.auto.get_cost_by_param(cost_param)
        elif carriange_type == CarriageType.train:
            if self.train != None:
                return self.train.get_cost_by_param(cost_param)
        else:
            if self.plane != None:
                return self.plane.get_cost_by_param(cost_param)
