# webscraper/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('scrape/<path:url>/', views.scrape_data, name='scrape_data'),
]