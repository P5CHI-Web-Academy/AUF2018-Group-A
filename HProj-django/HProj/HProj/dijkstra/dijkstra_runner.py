from HProj.dijkstra.dijkstra import dijkstra
from HProj.helpers.paths_filter import get_edges_from_url


def total_cost(edges):
    return sum(edge.cost for edge in edges)

def dijkstra_mock():
    edges = get_edges_from_url('https://raw.githubusercontent.com/P5CHI-Web-Academy/AUF2018-Group-A/master/stand-alone-project/parsing_filters/file.json')

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

    


    


