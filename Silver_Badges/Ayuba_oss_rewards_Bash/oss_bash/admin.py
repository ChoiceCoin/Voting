from django.contrib import admin

from oss_bash.models import Address, Developer

# Register your models here.

admin.site.register(Developer)
admin.site.register(Address)
