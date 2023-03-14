from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('books/<str:id>/', views.getBook, name="book"),
    path('books/', views.getBooks, name="books"),
    path('notes/', views.getNotes, name="notes"),
    path('notes/<str:pk>/', views.getNote, name="note")
]