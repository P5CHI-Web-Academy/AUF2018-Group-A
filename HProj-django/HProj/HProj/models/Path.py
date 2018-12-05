from HProj.helpers import jsonParser
from HProj.models import Carriage


class CarriageType: 
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

    def get_cost_filtered_by(self, carriage_type, cost_param):
        if carriage_type == CarriageType.auto:
            if self.auto != None:
                return self.auto.get_cost_by_param(cost_param)
        elif carriage_type == CarriageType.train:
            if self.train != None:
                return self.train.get_cost_by_param(cost_param)
        else:
            if self.plane != None:
                return self.plane.get_cost_by_param(cost_param)
