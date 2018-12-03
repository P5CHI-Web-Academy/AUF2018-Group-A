import sys
sys.path.insert(0, './dijkstra')

from Path import *
from Edge import *
from dijkstra import *

dataArray = get_data_from_file('file.json')

paths = [Path(data) for data in dataArray]

edges = Edge.edges_from_paths_by_filtering(paths, CarriageType.train, CostFunction.time)

for edge in edges:
    print("\n", edge.start, edge.end, edge.cost)

covered_edges = dijkstra(edges, "#1", "#4")

print("covered_edges:")
for edge in covered_edges:
    print(edge.start, edge.end, edge.cost)

print ("total_cost =", total_cost(covered_edges))