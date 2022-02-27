from django.urls import path,include
from rest_framework import routers
from .views import PollViewSet, TotalAmountViewset,UpcommingPollViewSet,ActivePollViewSet,CompletedPollViewSet

router = routers.DefaultRouter()
router.register(r'poll',PollViewSet)
router.register(r'active_poll',ActivePollViewSet)
router.register(r'upcoming_poll',UpcommingPollViewSet)
router.register(r'completed_poll',CompletedPollViewSet)
router.register(r'total_amount',TotalAmountViewset)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include("rest_framework.urls",namespace='rest_framework')),
]
