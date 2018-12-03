from Path import *
from Edge import Edge

dataArray = get_data_from_file('file.json')

paths = [Path(data) for data in dataArray]

edges = Edge.edges_from_paths_by_filtering(paths, CarriageType.auto, CostFunction.time)

print(len(edges))