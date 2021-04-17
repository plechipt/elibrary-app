from django.db import models


class Book(models.Model):
    # Default language in english
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    genre = models.CharField(max_length=50)

    # Czech language
    title_cz = models.CharField(blank=True, null=True, max_length=100)
    author_cz = models.CharField(blank=True, null=True, max_length=100)
    genre_cz = models.CharField(blank=True, null=True, max_length=50)

    number_of_pages = models.IntegerField()
    image_name = models.CharField(max_length=50, default='default.jpg')

    def __str__(self):
        return self.title