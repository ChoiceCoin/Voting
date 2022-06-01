from django.contrib import admin
from django.urls import path,include
from frontend.apiviews import PresidentialViewSet, UserViewSet,ProfileViewSet,OtherOfficeViewSet
from rest_framework import routers
from frontend.views import LoginView,LogoutView

router = routers.DefaultRouter()
router.register(r'users',UserViewSet)
router.register(r'profile',ProfileViewSet)
router.register(r'contestants',PresidentialViewSet)
router.register(r'office',OtherOfficeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("frontend.urls")),
    path('api/', include(router.urls)),
    path('api-auth/', include("rest_framework.urls",namespace='rest_framework')),
    path('', LoginView.as_view(),name='login'),
    path('logout/',LogoutView.as_view(),name='logout')
    
]
