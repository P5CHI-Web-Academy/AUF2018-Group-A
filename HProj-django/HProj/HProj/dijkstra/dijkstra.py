from HProj.models.Edge import *

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

def doubled_edges(edges):
    inverted_edges = [] 
    for edge in edges:
        inverted_edges.append(Edge(edge.end, edge.start, edge.cost))
        inverted_edges.append(edge)
    return inverted_edges 

def dijkstra(base_edges, source, dest):
    edges = doubled_edges(base_edges)
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

