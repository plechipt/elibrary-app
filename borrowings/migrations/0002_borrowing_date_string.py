# Generated by Django 3.1.7 on 2021-04-19 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('borrowings', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='borrowing',
            name='date_string',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
