
class CostFunction:
    price = 1
    time = 2
    distance = 3

class Carriage: 
    distance: float = None
    price: float = None
    time: float = None

    def __init__ (self, data):
        self.distance = data["distance"]
        self.price = data["price"]
        self.time = data["time"]

    def get_cost_by_param(self, cost_param):
        if cost_param == CostFunction.price:
            return self.price
        elif cost_param == CostFunction.time:
            return self.time
        else:
            return self.distance
            