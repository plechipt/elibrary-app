from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from PIL import Image


class Book(models.Model):
    # Default language in english
    title = models.CharField(blank=True, max_length=100)
    author = models.CharField(blank=True, max_length=100)
    genre = models.CharField(blank=True, max_length=50)

    # Czech language
    title_cz = models.CharField(blank=True, null=True, max_length=100)
    author_cz = models.CharField(blank=True, null=True, max_length=100)
    genre_cz = models.CharField(blank=True, null=True, max_length=50)

    number_of_pages = models.IntegerField()
    borrowed = models.BooleanField(default=False)
    image = models.ImageField(default='default.jpg')
    image_name = models.CharField(max_length=50, default='default.jpg')
    
    def all_objects_count(self):
        return Book.objects.all().count()
    
    def __str__(self):
        return self.title

    '''
    def save(self, *args, **kwargs):
        super().save()
        img = Image.open(self.image)

        if img.height > 300 or img.height > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.name)
    '''


@receiver(post_save, sender=Book)
def after_book_create(sender, instance, created, **kwargs):
    obj = instance

    # If image was updated
    if obj.image != obj.image_name:
        obj.image_name = obj.image.name
        obj.save()
    
    # Save the attributes to czech language after create
    if created:
        obj.title_cz = obj.title
        obj.author_cz = obj.author
        obj.genre_cz = obj.genre
        obj.save()
    