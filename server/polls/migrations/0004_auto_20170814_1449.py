# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0003_poll_expiry'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pollmetric',
            name='multi_select',
        ),
        migrations.RemoveField(
            model_name='pollmetric',
            name='rank',
        ),
        migrations.AddField(
            model_name='poll',
            name='type',
            field=models.TextField(default=b'single'),
        ),
        migrations.AddField(
            model_name='pollvote',
            name='rank',
            field=models.IntegerField(null=True, blank=True),
        ),
    ]
