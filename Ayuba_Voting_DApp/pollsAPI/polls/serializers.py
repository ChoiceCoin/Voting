from rest_framework import serializers
from .models import Poll, TotalVote,UpcommingPoll,IsActive,CompletedPoll



class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = '__all__'

class UpCommingPollSerializer(serializers.ModelSerializer):
    upcomming_poll = PollSerializer(instance=PollSerializer)
    class Meta:
        model = UpcommingPoll
        fields = '__all__'

class CompletedPollSerializer(serializers.ModelSerializer):
    Completed_polls = PollSerializer(instance=PollSerializer)
    class Meta:
        model = CompletedPoll
        fields = '__all__'


class ActivePollSerializer(serializers.ModelSerializer):
    Active_polls = PollSerializer(instance=PollSerializer)
    class Meta:
        model = IsActive
        fields = '__all__'

a = {'no':'yes'}

class TotalAmountSerializer(serializers.ModelSerializer):
    Active_polls = PollSerializer(instance=PollSerializer)
    class Meta:
        model = TotalVote
        fields = '__all__'
