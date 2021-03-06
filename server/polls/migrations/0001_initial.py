# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-11 15:11
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('poll_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('activity_date', models.DateTimeField(blank=True, null=True)),
            ],
            options={
                'db_table': 'poll',
            },
        ),
        migrations.CreateModel(
            name='PollMetric',
            fields=[
                ('poll_metric_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('description', models.TextField(blank=True, null=True)),
                ('image_url', models.TextField(blank=True, null=True)),
                ('multi_select', models.BooleanField(default=False)),
                ('rank', models.IntegerField(blank=True, null=True)),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.Poll')),
            ],
            options={
                'db_table': 'poll_metric',
            },
        ),
        migrations.CreateModel(
            name='PollVote',
            fields=[
                ('poll_vote_id', models.AutoField(primary_key=True, serialize=False)),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.Poll')),
                ('poll_metric', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.PollMetric')),
            ],
            options={
                'db_table': 'poll_vote',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('email', models.EmailField(max_length=254)),
            ],
            options={
                'db_table': 'user',
            },
        ),
        migrations.AddField(
            model_name='pollvote',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.User'),
        ),
    ]
