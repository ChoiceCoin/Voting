from django.contrib import admin
from .models import Poll,UpcommingPoll,CompletedPoll,IsActive,TotalVote

polls = [Poll,UpcommingPoll,CompletedPoll,IsActive,TotalVote]
admin.site.register(polls)