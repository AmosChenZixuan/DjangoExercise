from django.urls import path
from .views import *

app_name = 'poll'
urlpatterns = [
    path('', index, name='index'),
    path('<int:qid>/', detail, name='detail'),
    path('<int:qid>/results', results, name='results'),
    path('<int:qid>/vote', vote, name='vote'),
]