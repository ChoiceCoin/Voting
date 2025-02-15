from django.contrib import admin
from .models import Presidential,UserProfile,OtherOffice

# Register your models here.
admin.site.register(Presidential)
admin.site.register(UserProfile)
admin.site.register(OtherOffice)

