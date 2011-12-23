from django.template.response import TemplateResponse
from flashcards.models import DataSet, DataTerm, UserProfile

def index(request):
    return TemplateResponse(request, 'index.html')

def login(request):
    return TemplateResponse(request, 'index.html')







