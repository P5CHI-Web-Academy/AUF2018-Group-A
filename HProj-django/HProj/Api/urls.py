from django.urls import path
from . import views


urlpatterns = [
    path('sample', views.sample, name='sample'),
    path('vertices', views.get_vertices, name='get_vertices'),
    path('dijkstra', views.get_covered_edges, name='get_covered_edges'),
    path('csv', views.get_csv, name='get_csv' )
] 
