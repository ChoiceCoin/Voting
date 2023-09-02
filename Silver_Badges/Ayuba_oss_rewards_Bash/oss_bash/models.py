import re
from django.db import models

# Create your models here.

class Developer(models.Model):
    full_name = models.CharField(max_length=200,default='')
    discord_id = models.CharField(max_length=200,default='')
    github_url = models.CharField(max_length=200,default='')
    twitter_handle = models.CharField(max_length=200,default='')
    wallet_address = models.CharField(max_length=200,default='')

    def __str__(self):
        return f"{self.wallet_address}"

class Address(models.Model):
    reward = models.IntegerField()

    def __str__(self):
        return f"{self.addresses},"