from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


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
    image = models.ImageField(default='default.jpg')
    image_name = models.CharField(max_length=50, default='default.jpg')

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.title


@receiver(post_save, sender=Book)
def after_book_create(sender, instance, created, **kwargs):
    if created:
        obj = instance
        obj.image_name = obj.image.name
        obj.save()