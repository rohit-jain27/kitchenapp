# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0002_poll_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='poll',
            name='expiry',
            field=models.DateTimeField(null=True, blank=True),
        ),
    ]
