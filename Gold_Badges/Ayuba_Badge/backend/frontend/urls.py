from django.urls import path
from .views import Confirm_vote, index

urlpatterns = [
    path('vote/',index,name='index'),
    path('confirm/',Confirm_vote,name='confirm')
]
