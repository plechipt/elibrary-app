# Generated by Django 3.1.7 on 2021-04-20 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_auto_20210417_1248'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='image',
            field=models.ImageField(default='default_image.jpg', upload_to='public/static/images'),
        ),
    ]
