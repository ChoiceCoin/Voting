from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE

# Create your models here.

class Address(models.Model):
    user =  user =  models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=200)

    
    def __str__(self):
        return str(self.user)


class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True)
    reference = models.CharField(max_length=300, blank=True,null=True)
    GithubUsername = models.CharField(max_length=200, null=True, blank=True)
    status = models.BooleanField(default=False)
    history = models.BooleanField(default=False)

    def __str__(self):
        return str(self.address)


