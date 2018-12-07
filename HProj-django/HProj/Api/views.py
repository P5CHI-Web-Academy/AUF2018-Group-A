from django.http import HttpResponse, JsonResponse
from HProj.dijkstra import dijkstra
from rest_framework import status
from rest_framework.decorators import api_view
from HProj.dijkstra.dijkstra_runner import dijkstra_mock, dijkstra_dict, total_cost
from HProj.models.Edge import Edge
import csv

@api_view(['GET', 'POST'])
def sample(request):
    if request.method == 'GET':
        data = dijkstra_dict()
        print(data)
    elif request.method == 'POST':
        data = {'code': 201}
    return JsonResponse(data)


def get_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="covered_edges.csv"'
    
    writer = csv.writer(response)
    writer.writerow(['Start', 'End', 'Cost'])
    covered_edges = dijkstra_mock()
    for edge in covered_edges:
        writer.writerow([edge.start, edge.end, edge.cost])
    
    writer.writerow(['', 'Total', total_cost(covered_edges)])
    return response
