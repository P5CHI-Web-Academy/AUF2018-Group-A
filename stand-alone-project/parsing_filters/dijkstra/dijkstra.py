import os,sys,inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir)

from Edge import *

inf = float('inf')

#helper functions
def all_vertices(edges):
    return set(
        sum(
            ([edge.start, edge.end] for edge in edges), []
        )
    )

def neighbours(edges):
    neighbours = {vertex: set() for vertex in all_vertices(edges)}
    for edge in edges:
        neighbours[edge.start].add((edge.end, edge.cost))
    return neighbours

def dijkstra(edges, source, dest):
    assert source in all_vertices(edges), 'Such source node doesn\'t exist'

    distances = {vertex: inf for vertex in all_vertices(edges)}
    previous_vertices = {vertex: None for vertex in all_vertices(edges)}
    distances[source] = 0
    vertices1 = all_vertices(edges).copy()

    while vertices1:
        current_vertex = min(vertices1, key = lambda vertex: distances[vertex])
        vertices1.remove(current_vertex)
        if distances[current_vertex] == inf:
            break
        
        for neighbour, cost in neighbours(edges)[current_vertex]:
            alternative_route = distances[current_vertex] + cost
            if alternative_route < distances[neighbour]:
                distances[neighbour] = alternative_route
                previous_vertices[neighbour] = current_vertex
    
    covered_vertices, current_vertex = list(), dest
    while previous_vertices[current_vertex] is not None:
        covered_vertices.insert(0, current_vertex)
        current_vertex = previous_vertices[current_vertex]
    if covered_vertices:
        covered_vertices.insert(0, current_vertex)
    
    path = []
    for vertice in covered_vertices:
        index = covered_vertices.index(vertice)
        if index != 0:
            for edge in edges:
                if edge.end == vertice and edge.start == covered_vertices[index - 1]:
                    path.append(edge)
    return path

def total_cost(edges):
    return sum(edge.cost for edge in edges)
