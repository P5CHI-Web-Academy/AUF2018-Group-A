from HProj.dijkstra.dijkstra import dijkstra, all_vertices
from HProj.helpers.paths_filter import get_edges_from_url
from base64 import urlsafe_b64decode, urlsafe_b64encode


def total_cost(edges):
    return sum(edge.cost for edge in edges)

def get_edges(encoded_path, carriage_type, cost_function):
    url = urlsafe_b64decode(encoded_path)
    return get_edges_from_url(url.decode('ASCII'), carriage_type, cost_function)

def get_vertices_array(encoded_path):
    url = urlsafe_b64decode(encoded_path)
    return list(all_vertices(get_edges(encoded_path)))

def perform_dijkstra(encoded_path, from_vertice, to_vertice, carriage_type, cost_function):
    edges = get_edges(encoded_path, carriage_type, cost_function)
    return dijkstra(edges, from_vertice, to_vertice)
    
def dijkstra_sample():
    edges = get_edges_from_url('https://raw.githubusercontent.com/P5CHI-Web-Academy/AUF2018-Group-A/master/stand-alone-project/parsing_filters/file.json')

    covered_edges = dijkstra(edges, "#1", "#5")
    return dijkstra_dict(covered_edges)

def dijkstra_dict(covered_edges):
    edges_dict_list = []
    for edge in covered_edges:
        edges_dict_list.append({'start': edge.start, 'end': edge.end, 'cost': edge.cost})
    
    results_dict = {
        'covered_edges': edges_dict_list,
        'total_cost': total_cost(covered_edges)
    }

    return results_dict




    


