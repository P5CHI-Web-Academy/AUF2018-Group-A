from HProj.dijkstra.dijkstra import dijkstra
from HProj.helpers.jsonParser import get_data_from_file
from HProj.models.Path import Path, CarriageType
from HProj.models.Carriage import CostFunction, Carriage
from HProj.models.Edge import Edge

def total_cost(edges):
    return sum(edge.cost for edge in edges)

def dijkstra_mock():
    dataArray = get_data_from_file('/Users/vciumac/project/HProj-django/HProj/HProj/mock_data/file.json')

    paths = [Path(data) for data in dataArray]
    edges = Edge.edges_from_paths_by_filtering(paths, CarriageType.auto, CostFunction.time)

    covered_edges = dijkstra(edges, "#1", "#5")
    return covered_edges

def dijkstra_dict():
    covered_edges =  dijkstra_mock()
    edges_dict_list = []
    for edge in covered_edges:
        edges_dict_list.append({'start': edge.start, 'end': edge.end, 'cost': edge.cost})
    
    results_dict = {
        'covered_edges': edges_dict_list,
        'total_cost': total_cost(covered_edges)
    }
    return results_dict

    


    


