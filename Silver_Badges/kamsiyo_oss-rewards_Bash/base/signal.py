from django.db.models.signals import pre_save
from django.contrib.auth.models import  User

def updateUser(sender, instance, **kwargs):
    user = instance
    if user.GithubUsername != "":
        user.username = user.GithubUsername
pre_save.connect(updateUser, sender=User)