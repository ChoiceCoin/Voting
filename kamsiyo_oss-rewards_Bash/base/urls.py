from django.urls import  path
from .views import *



urlpatterns = [
    path('user/login/',MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path("user/register/", registerUser, name="registerUser") ,
    path("user/create/address/", createUserAddress, name="createaddress") ,
    path("user/profile", getUserProfile, name="createaddress") ,
    path("user/myaddress", getMyAddress, name="myAddress") 


]

