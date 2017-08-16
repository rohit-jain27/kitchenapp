# -*- coding: utf-8 -*-
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^getPolls/$', views.get_polls, name='get_polls'),
    url(r'^getPolls/<poll_status>/$', views.get_polls, name='get_polls'),
    url(r'^createPoll/$', views.create_poll, name='create_poll'),
]
