from django.db import models
from django.contrib import auth
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User)

    def get_public_fields(self):
        return {'email':self.user.email, 'username':self.user.username, 'firstname':self.user.first_name, 'lastname':self.user.last_name, 'is_active':self.user.is_active, 'last_login':str(self.user.last_login), 'date_joined':str(self.user.date_joined)}

    def __unicode__(self):
        return self.user.username

    def get_public_dataSets(self):
        return map( lambda set:set.get_public_fields() , self.dataSets.all())

class DataSet(models.Model):
    DataSet = models.AutoField(primary_key=True)
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
    owner = models.ForeignKey(UserProfile, related_name='dataSets')
    public = models.BooleanField(True)
    added_timestamp = models.DateTimeField(auto_now_add=True)
    modified_timestamp = models.DateTimeField(auto_now=True)

    public_data = ['title', 'description', 'owner', 'added_timestamp', 'modified_timestamp']

    def get_public_fields(self):
        return {'id':self.DataSet, 'title':self.title, 'description':self.description, 'owner':str(self.owner), 'added_timestamp':str(self.added_timestamp), 'modified_timestamp':str(self.modified_timestamp)}

    def get_public_terms(self):
        return map( lambda set:set.get_public_fields() , self.terms.all())

    def __unicode__(self):
        return self.title

class DataTerm(models.Model):
    term = models.CharField(max_length=64)
    definition = models.CharField(max_length=256)
    DataSet = models.ForeignKey(DataSet, related_name='terms')
    added_timestamp = models.DateTimeField(auto_now_add=True)
    modified_timestamp = models.DateTimeField(auto_now=True)

    def get_public_fields(self):
        return {'id':self.id, 'term':self.term, 'definition':self.definition, 'added_timestamp':str(self.added_timestamp), 'modified_timestamp':str(self.modified_timestamp)}

    def __unicode__(self):
        return self.term