from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'flashcards.views.index'),
    # url(r'^workspace/', include('workspace.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^api/json/(?P<user>\w+)/sets/(?P<dataset>\w+)/terms/', 'api.views.user_datasets_set_terms'),
    url(r'^api/json/(?P<user>\w+)/sets/(?P<dataset>\w+)/', 'api.views.user_datasets_set'),
    url(r'^api/json/(?P<user>\w+)/sets/', 'api.views.user_datasets'),
    url(r'^api/json/(?P<user>\w+)/', 'api.views.user'),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
