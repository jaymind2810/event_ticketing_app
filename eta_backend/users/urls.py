from django.urls import path
from .views import (
    RegisterView, CustomLoginView, getAllData
)

urlpatterns = [
    path('register', RegisterView.as_view(), name='register'),
    path('login', CustomLoginView.as_view(), name='login'),
    # path('auth/logout/', LogoutView.as_view(), name='logout'),
    
    path('getuseralldata/<int:pk>/', getAllData, name='getAllData'),
]