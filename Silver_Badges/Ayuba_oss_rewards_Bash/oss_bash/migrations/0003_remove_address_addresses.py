# Generated by Django 4.0.2 on 2022-02-04 12:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('oss_bash', '0002_address'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='address',
            name='addresses',
        ),
    ]
