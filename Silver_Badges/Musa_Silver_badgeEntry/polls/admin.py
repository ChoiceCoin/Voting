from django.contrib import admin
# Register your models here.
from .models import Question, Choice
 
# admin.site.register(Question)
# admin.site.register(Choice)
 
admin.site.site_header = "Pollster Admin"
admin.site.site_title = "Pollster Admin Area"
admin.site.index_title = "Welcome to the Pollster Admin Area"
 
 
class ChoiceInLine(admin.TabularInline):
    model = Choice
    extra = 3
 
 
class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [(None, {'fields': ['question_text']}), ('Date Information', {
        'fields': ['pub_date'], 'classes': ['collapse']}), ]
    inlines = [ChoiceInLine]
 
 
admin.site.register(Question, QuestionAdmin)