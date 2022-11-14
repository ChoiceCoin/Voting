from dataclasses import fields
from .models import UserProfile,Presidential,OtherOffice,CommitVote
from rest_framework import permissions
from django.contrib.auth.models import User
from rest_framework import serializers, viewsets

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

class UsersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username','first_name','last_name', 'email', 'groups']
        

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsersSerializer
    permission_classes = [permissions.IsAuthenticated]

class PresidentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Presidential
        fields = '__all__'

class PresidentialViewSet(viewsets.ModelViewSet):
    queryset = Presidential.objects.all()
    serializer_class = PresidentialSerializer
    permission_classes = [permissions.IsAuthenticated]

class OtherOfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OtherOffice
        fields = '__all__'

class OtherOfficeViewSet(viewsets.ModelViewSet):
    queryset = OtherOffice.objects.all()
    serializer_class = OtherOfficeSerializer
    permission_classes = [permissions.IsAuthenticated]

class CommitVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommitVote
        fields = '__all__'

# class CommitVoteViewSet(viewsets.ModelViewSet):
#     queryset = CommitVote.objects.all()