import csv
from django.http import HttpResponse, JsonResponse
from HProj.dijkstra import dijkstra
from HProj.dijkstra.dijkstra_runner import dijkstra_dict, dijkstra_sample, perform_dijkstra, total_cost, get_vertices_array
from HProj.models.Edge import Edge
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.viewsets import ModelViewSet
from django.core.mail import EmailMessage, send_mail
from io import StringIO
@api_view(['GET'])
def get_vertices(request):
    json_path = request.GET.get('json_path')
    if not json_path:
        data = {'error': 'path param not provided'}
        return JsonResponse(data=data, status=400)

    vertices_array = get_vertices_array(json_path)
    data = {'vertices': vertices_array, 'path': json_path}
    return JsonResponse(data)

@api_view(['GET'])
def get_covered_edges(request):
    json_path = request.GET.get('json_path')
    from_vertice = request.GET.get('from')
    to_vertice = request.GET.get('to')
    carriage_type = request.GET.get('carriage_type')
    cost_function = request.GET.get('cost_function')

    if not json_path or not from_vertice or not to_vertice:
        data = {'error': 'some querry param not provided'}
        return JsonResponse(data=data, status=400)

    covered_edges = perform_dijkstra(json_path, from_vertice, to_vertice, carriage_type, cost_function)
    data = dijkstra_dict(covered_edges, json_path)
    return JsonResponse(data)

@api_view(['GET'])
def sample(request):
    data = dijkstra_sample()
    return JsonResponse(data)

@api_view(['GET'])
def get_csv(request):
    json_path = request.GET.get('json_path')
    from_vertice = request.GET.get('from')
    to_vertice = request.GET.get('to')
    carriage_type = request.GET.get('carriage_type')
    cost_function = request.GET.get('cost_function')

    if not json_path or not from_vertice or not to_vertice:
        data = {'error': 'some querry param not provided'}
        return JsonResponse(data=data, status=400)

    covered_edges = perform_dijkstra(json_path, from_vertice, to_vertice, carriage_type, cost_function)

    csvfile = StringIO()
    writer = csv.writer(csvfile)
    writer.writerow(['Start', 'End', 'Cost'])

    for edge in covered_edges:
        writer.writerow([edge.start, edge.end, edge.cost])
    
    writer.writerow(['', 'Total', total_cost(covered_edges)])

    email = EmailMessage(
    subject='CSV File',
    body='This is the CSV File you requested \n',
    from_email='HProjServer@pentalog.com',
    to=['vciumac@pentalog.com'])
    email.attach('covered_edges.csv', csvfile.getvalue(), 'text/csv')
    mail_status = email.send()

    if mail_status == 1:
        return JsonResponse({'status': 'success'})
    else:
        data = {'error': 'failed to send mail'}
        return JsonResponse(data=data, status=400)
