# -*- coding: utf-8 -*-
import logging
from datetime import datetime
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from polls.models import *

logger = logging.getLogger(__name__)

def index(request):
    return HttpResponse("Kitchenapp v0.1.0")

@api_view(['GET'])
def get_polls(request, poll_status=None):
    """ Get polls for the given status """

    if poll_status:
        polls = list(Poll.objects.filter(status=poll_status).values())
    else:
        polls = list(Poll.objects.values())

    response_json = {
        'status': 'OK',
        'polls': polls
    }

    return Response(response_json, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_poll(request):
    """ Create poll and poll metrics """

    try:
        poll_name, activity_date, poll_metrics = get_poll_details(request)
    except Exception as error:
        msg = "Item missing from json data. Error: {}".format(error)
        logger.error(msg)
        return Response({'status': 'ERROR', 'error': msg})

    poll = Poll(
        name=poll_name,
        activity_date=activity_date
    )

    poll.save()

    for metric in poll_metrics:
        try:
            save_poll_metric(metric)
        except Exception as error:
            msg = "Error saving metric for poll. Error: {}".format(error)
            logger.error(msg)
            return Response({'status': 'ERROR', 'error': msg})

    return Response({"status":"OK"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def update_poll(request):
    """ Update existing poll and poll metrics """

    try:
        poll_id = request.data['poll_id']
        poll_name, activity_date, poll_metrics = get_poll_details(request)
    except Exception as error:
        msg = "Item missing from json data. Error: {}".format(error)
        logger.error(msg)
        return Response({'status': 'ERROR', 'error': msg})

    poll = Poll.objects.get(
        pk=poll_id
    )

    poll.name = poll_name
    poll.save()

    PollMetric.objects.filter(
        poll__pk=poll_id
    ).delete()

    for metric in poll_metrics:
        try:
            save_poll_metric(metric)
        except Exception as error:
            msg = "Error saving metric for poll. Error: {}".format(error)
            logger.error(msg)
            return Response({'status': 'ERROR', 'error': msg})

    return Response({"status":"OK"}, status=status.HTTP_200_OK)


def save_poll_metric(metric):
    """ Save a poll metric """

    metric_name = metric['name']
    metric_description = metric.get('description', None)

    metric = PollMetric(
        name=metric_name,
        description=metric_description
    )

    metric.save()


def get_poll_details(request):
    """ Get name, metrics and activity date from request """

    poll_name = request.data['name']
    poll_metrics = request.data['metrics']
    activity_date = request.data.get('activity_date', None)
    if activity_date:
        activity_date = datetime.strptime(activity_date, '%Y-%m-%d')

    if not isinstance(poll_metrics, list) or len(poll_metrics) < 2:
        raise Exception('Missing poll metrics from request')

    return poll_name, activity_date, poll_metrics
