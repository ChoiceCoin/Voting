from dataclasses import fields
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import CommitVote


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ["first_name","last_name","email","password1","password2"]

    password1 = forms.Field(widget=forms.PasswordInput(attrs={
        "label":"NIN", "placeholder":"NIN"
    }))
    
    password2 = forms.Field(widget=forms.PasswordInput(attrs={
        "label":"Voter ID","placeholder":"Voter ID"
    }))

class CommitVoteForm(forms.ModelForm):
    class Meta:
        model = CommitVote
        fields = '__all__'