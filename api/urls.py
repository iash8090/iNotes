from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name= "get-routes"),
    path('notes/', views.Notes, name="notes"),
    path('notes/<str:nid>/', views.modifyNote, name="note"),

]