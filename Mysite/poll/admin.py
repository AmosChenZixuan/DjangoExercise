from django.contrib import admin
from .models import Question, Choice
# Register your models here.
admin.site.site_header = 'Poll Administration'
admin.site.site_title  = 'Amos'

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 0


class QuestionAdmin(admin.ModelAdmin):
    search_fields = ['question_text']
    list_display = ('question_text', 'pub_date', 'recent')
    list_filter = ['pub_date']
    fieldsets = [
        ("Data",             {'fields': ['question_text']}),
        ('Date information', {'fields': ['pub_date']}),
    ]
    inlines = [ChoiceInline]

class ChoiceAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Parent",           {'fields': ['question']}),
        ("Data",             {'fields': ['choice_text']}),
        ('Date information', {'fields': ['votes']}),
    ]

admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice, ChoiceAdmin)
