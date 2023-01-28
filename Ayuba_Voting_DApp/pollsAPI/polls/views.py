from .models import Poll, TotalVote,UpcommingPoll,IsActive,CompletedPoll
from django.shortcuts import render
from .serializers import PollSerializer, TotalAmountSerializer,UpCommingPollSerializer,CompletedPollSerializer,ActivePollSerializer
from rest_framework import viewsets,permissions



class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    #permission_classes = [permissions.IsAuthenticated]

class UpcommingPollViewSet(viewsets.ModelViewSet):
    queryset = UpcommingPoll.objects.all()
    serializer_class = UpCommingPollSerializer
    #permission_classes = [permissions.IsAuthenticated]

class ActivePollViewSet(viewsets.ModelViewSet):
    queryset = IsActive.objects.all()
    serializer_class = ActivePollSerializer
    #permission_classes = [permissions.IsAuthenticated]

class CompletedPollViewSet(viewsets.ModelViewSet):
    queryset = CompletedPoll.objects.all()
    serializer_class = CompletedPollSerializer
    #permission_classes = [permissions.IsAuthenticated]

class TotalAmountViewset(viewsets.ModelViewSet):
    queryset = TotalVote.objects.all()
    serializer_class = TotalAmountSerializer