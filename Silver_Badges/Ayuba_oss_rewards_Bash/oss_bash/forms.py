from django import forms
from .models import Developer,Address


class DeveloperForm(forms.ModelForm):
    class Meta:
        model = Developer
        fields = '__all__'

class RewardForm(forms.ModelForm):
    class Meta:
        model = Address
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(RewardForm, self).__init__(*args, **kwargs)
        self.fields['reward'].widget = forms.TextInput(attrs={
            'name': 'reward',
            'placeholder': 'Enter Amount'})
