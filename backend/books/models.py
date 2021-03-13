from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    number_of_pages = models.IntegerField()
    genre = models.CharField(max_length=50)
    image_name = models.CharField(max_length=50, default='default.jpg')