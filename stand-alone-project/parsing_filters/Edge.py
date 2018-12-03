from Path import *

class Edge:
    start: str
    end: str
    cost: float

    def __init__(self, start, end, cost):
        self.start = start
        self.end = end
        self.cost = cost

    def edges_from_paths_by_filtering(paths, carriage_type, cost_param):
        unfiltered_edges = [] #may have cost "None"
        for path in paths:
            unfiltered_edges.append(Edge(path.start, path.end, path.get_cost_filtered_by(carriage_type, cost_param)))
        
        #may not have cost "None"
        filtered_edges = [edge for edge in unfiltered_edges if edge.cost != None]
        return filtered_edges