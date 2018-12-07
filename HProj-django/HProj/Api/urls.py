from django.urls import path
from . import views


urlpatterns = [
    path('sample', views.sample, name='sample'),
    path('csv', views.get_csv, name='get_csv' )
] 
