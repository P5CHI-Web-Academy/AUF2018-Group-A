#Dijkstra Algorithm
def extract(Q, w):
    m = 0
    min = w[0]
    for i in range(len(w)):
        if w[i] < min:
           min = w[i]
           m = i
    return m, Q[m]

G = {A: {B = 10, E = 5}, B: {C = 5, E = 20}, C: {D = 5, E = 5}, D: {E = 2 , F = 6}, E: { F = 50}, F: {H = 10}, H: {A = 10} }

def dijkstra(G , s ):
    Q = [s]
    p = {s: None}
    w = [0]
    d = {}
        for i in G:
            d[i] = float('inf')
            Q.append(i)
            w.append(d[i])
        d[s] = 0
        S = []
        n = len(Q)
        while Q:
            u = extract(Q,w)
            S.append(u)
            Q = remove(u)
            for v in G[u]:
                if d[v] >= d[u] + G[u][v]:
                    d[v] = d[u] + G[u][v]
                    p[v] = u
        return d, p

A='A'
B='B'
C='C'
D='D'
E='E'
F='F'
H='H'
#G={A:{B:10, E:5}, B:{C=5, E=20}, C:{D=5, E=5}, D:{E=2, F=6}, E:{F=50}, F:{H=10}, H:{A=10}}
print "Assuming the strats vertex to be A:"
print "Shortest distances", dijkstra(G, A)
print "Parents", dijkstra(G, A)
