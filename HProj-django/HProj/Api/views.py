from django.http import HttpResponse, JsonResponse
from HProj.dijkstra import dijkstra


def sample(request):
    data = {
        'start': 'Raghav',
        'end': 'India',
        'cost': 28
    }
    return JsonResponse(data)

