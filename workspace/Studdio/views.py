from django.http import HttpResponse, Http404
from django.utils import simplejson as json
from django.template.response import TemplateResponse
from django.contrib.auth.models import User
from studdio.models import DataSet, DataTerm, UserProfile

def index(request):
    return TemplateResponse(request, 'index.html')

def user(request, user):
    try:
        user = User.objects.filter(username=user)[0]
        user_profile = UserProfile.objects.get(pk=user.id)
        user_json = json.dumps( user_profile.get_public_fields(), indent=2)
    except UserProfile.DoesNotExist:
        raise Http404
    return HttpResponse(user_json, mimetype="application/json")

def user_datasets(request, user):
    try:
        user = User.objects.filter(username=user)[0]
        user_profile = UserProfile.objects.get(pk=user.id)
        set_json = json.dumps( user_profile.get_public_dataSets(), indent=2)
    except User.DoesNotExist:
        raise Http404
    return HttpResponse(set_json, mimetype="application/json")

def user_datasets_set(request, user, dataset):
    try:
        user = User.objects.filter(username=user)[0]
        #user_profile = UserProfile.objects.get(pk=user.id)
        set_json = DataSet.objects.get(pk=int(dataset))
        set_content_json = json.dumps(set_json.get_public_fields() , indent=2)
    except User.DoesNotExist:
        raise Http404
    return HttpResponse(set_content_json, mimetype="application/json")

def user_datasets_set_terms(request, user, dataset):
    try:
        user = User.objects.filter(username=user)[0]
        #user_profile = UserProfile.objects.get(pk=user.id)
        set_json = DataSet.objects.get(pk=int(dataset))
        set_content_json = json.dumps(set_json.get_public_terms() , indent=2)
    except User.DoesNotExist:
        raise Http404
    return HttpResponse(set_content_json, mimetype="application/json")

def user_datasets_set_term(request, user, dataset, term):
    try:
        user = User.objects.filter(username=user)[0]
        #user_profile = UserProfile.objects.get(pk=user.id)
        term = DataTerm.objects.get(pk=int(term))
        term_json = json.dumps(term.get_public_fields() , indent=2)
    except User.DoesNotExist:
        raise Http404
    return HttpResponse(term_json, mimetype="application/json")