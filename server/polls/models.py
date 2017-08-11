from django.db import models
import uuid


class Poll(models.Model):
    poll_id = models.AutoField(primary_key=True)
    name = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    activity_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'poll'

class PollMetric(models.Model):

    poll_metric_id = models.AutoField(primary_key=True)
    poll = models.ForeignKey(Poll)
    name = models.TextField()
    description = models.TextField(blank=True, null=True)
    image_url = models.TextField(blank=True, null=True)
    multi_select = models.BooleanField(default=False)
    rank = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'poll_metric'

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.TextField()
    email = models.EmailField()

    class Meta:
        db_table = 'user'

class PollVote(models.Model):
    poll_vote_id = models.AutoField(primary_key=True)
    poll = models.ForeignKey(Poll)
    poll_metric = models.ForeignKey(PollMetric)
    user = models.ForeignKey(User)

    class Meta:
        db_table = 'poll_vote'
