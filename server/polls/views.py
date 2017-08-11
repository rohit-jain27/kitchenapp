# -*- coding: utf-8 -*-
import logging
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from polls.models import *

logger = logging.getLogger(__name__)

def index(request):
    return HttpResponse("Kitchenapp v0.0.1")

@api_view(['POST'])
def create_poll(request):

    # request.data['name']
    # request.data['date']

    poll = Poll(
        name='test'
    )

    poll.save()

    return Response({"status":"OK"}, status=status.HTTP_200_OK)