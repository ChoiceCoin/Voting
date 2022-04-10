from pyexpat import model
from django.db import models
from django.contrib.auth.models import User

positions = (
    ("Governor","Governor"),
    ("Senator","Senator"),
    ("House of Reprentatives","House of Representatives"),
    ("House of Assembly","House of Assembly"),
    ("Local Government Chairman","Local Government Chairman"),
    ("Councelor","Councelor")
    )

class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    wallet_address = models.CharField(max_length=100)
    ward = models.CharField(max_length=100)
    voter_ID = models.CharField(max_length=20)
    NIN = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.voter_ID}'

class Presidential(models.Model):
    title = models.CharField(max_length=20,default="")
    full_name = models.CharField(max_length=40, default="")
    state = models.CharField(max_length=20, default="")
    office = models.CharField(max_length=100,default="")

    def __str__(self):
        return f'{self.full_name}'

class OtherOffice(models.Model):
    title = models.CharField(max_length=20,default="")
    full_name = models.CharField(max_length=40, default="")
    contestant = models.ForeignKey(UserProfile,on_delete=models.CASCADE)
    state = models.CharField(max_length=20, default="")
    ward = models.CharField(max_length=100,default="")
    office = models.CharField(choices=positions,max_length=100)

class CommitVote(models.Model):
    amount = models.IntegerField()

    def __str__(self):
        return f'{self.amount}'