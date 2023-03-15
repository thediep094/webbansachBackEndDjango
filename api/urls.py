from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('books/<str:id>/', views.getBook, name="book"),
    path('books/', views.getBooks, name="books"),
    path('notes/<str:pk>/', views.getNote, name="note"),
    path('notes/', views.getNotes, name="notes"),
    path('accounts/login', views.loginAccount, name="loginAccount"),
    path('accounts/create', views.createAccount, name="createAccount"),
    path('accounts/<str:id>', views.getAccount, name="account"),
    path('accounts/', views.getAccounts, name="accounts"),
    path('order/create', views.createOrder, name="createOrder"),
    path('order/<str:id>', views.retrieveOrder, name="getAllOrder"),
]